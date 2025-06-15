
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Settings, Plus, Edit, Trash2, Save } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

interface PricingRule {
  id: string;
  name: string;
  description: string;
  conditions: {
    carTypes?: string[];
    locations?: string[];
    dateRange?: { start: string; end: string };
    minDays?: number;
    maxDays?: number;
  };
  actions: {
    multiplier?: number;
    fixedAmount?: number;
    percentage?: number;
  };
  enabled: boolean;
  priority: number;
}

const PricingRules: React.FC = () => {
  const { data: cmsData, updateData } = useCMS();
  const [rules, setRules] = useState<PricingRule[]>([
    {
      id: 'peak-season',
      name: 'موسم الذروة',
      description: 'زيادة أسعار موسم الذروة (يوليو - أغسطس)',
      conditions: {
        dateRange: { start: '2024-07-01', end: '2024-08-31' }
      },
      actions: {
        multiplier: 1.3
      },
      enabled: true,
      priority: 1
    },
    {
      id: 'long-term-discount',
      name: 'خصم الحجز الطويل',
      description: 'خصم للحجوزات أكثر من 7 أيام',
      conditions: {
        minDays: 7
      },
      actions: {
        percentage: -10
      },
      enabled: true,
      priority: 2
    },
    {
      id: 'luxury-car-premium',
      name: 'إضافة السيارات الفاخرة',
      description: 'زيادة سعر للسيارات الفاخرة في المطارات',
      conditions: {
        carTypes: ['luxury-sedan', 'luxury-suv']
      },
      actions: {
        fixedAmount: 50
      },
      enabled: true,
      priority: 3
    }
  ]);

  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const carTypes = cmsData.booking?.carTypes || [];
  const cities = cmsData.booking?.cities || [];
  const airports = cmsData.booking?.airports || [];
  const allLocations = [...cities, ...airports];

  const handleSaveRule = (rule: PricingRule) => {
    if (editingRule) {
      setRules(prev => prev.map(r => r.id === rule.id ? rule : r));
    } else {
      setRules(prev => [...prev, { ...rule, id: `rule-${Date.now()}` }]);
    }
    setEditingRule(null);
    setShowAddForm(false);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(r => r.id !== ruleId));
  };

  const toggleRuleStatus = (ruleId: string) => {
    setRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const RuleForm: React.FC<{ rule?: PricingRule; onSave: (rule: PricingRule) => void; onCancel: () => void }> = 
  ({ rule, onSave, onCancel }) => {
    const [formData, setFormData] = useState<PricingRule>(rule || {
      id: '',
      name: '',
      description: '',
      conditions: {},
      actions: {},
      enabled: true,
      priority: rules.length + 1
    });

    const updateFormData = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateConditions = (field: string, value: any) => {
      setFormData(prev => ({ 
        ...prev, 
        conditions: { ...prev.conditions, [field]: value }
      }));
    };

    const updateActions = (field: string, value: any) => {
      setFormData(prev => ({ 
        ...prev, 
        actions: { ...prev.actions, [field]: value }
      }));
    };

    return (
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle>{rule ? 'تعديل القاعدة' : 'إضافة قاعدة جديدة'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>اسم القاعدة</Label>
              <Input
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="موسم الذروة"
              />
            </div>
            <div>
              <Label>الأولوية</Label>
              <Input
                type="number"
                value={formData.priority}
                onChange={(e) => updateFormData('priority', parseInt(e.target.value))}
                min="1"
              />
            </div>
          </div>

          <div>
            <Label>الوصف</Label>
            <Input
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="وصف القاعدة وشروط تطبيقها"
            />
          </div>

          {/* الشروط */}
          <div className="space-y-3">
            <h4 className="font-semibold">شروط التطبيق</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>أقل مدة (أيام)</Label>
                <Input
                  type="number"
                  value={formData.conditions.minDays || ''}
                  onChange={(e) => updateConditions('minDays', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>أقصى مدة (أيام)</Label>
                <Input
                  type="number"
                  value={formData.conditions.maxDays || ''}
                  onChange={(e) => updateConditions('maxDays', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="∞"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>تاريخ البداية</Label>
                <Input
                  type="date"
                  value={formData.conditions.dateRange?.start || ''}
                  onChange={(e) => updateConditions('dateRange', {
                    ...formData.conditions.dateRange,
                    start: e.target.value
                  })}
                />
              </div>
              <div>
                <Label>تاريخ النهاية</Label>
                <Input
                  type="date"
                  value={formData.conditions.dateRange?.end || ''}
                  onChange={(e) => updateConditions('dateRange', {
                    ...formData.conditions.dateRange,
                    end: e.target.value
                  })}
                />
              </div>
            </div>
          </div>

          {/* الإجراءات */}
          <div className="space-y-3">
            <h4 className="font-semibold">إجراءات التسعير</h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>معامل الضرب</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.actions.multiplier || ''}
                  onChange={(e) => updateActions('multiplier', e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="1.0"
                />
              </div>
              <div>
                <Label>مبلغ ثابت ($)</Label>
                <Input
                  type="number"
                  value={formData.actions.fixedAmount || ''}
                  onChange={(e) => updateActions('fixedAmount', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>نسبة مئوية (%)</Label>
                <Input
                  type="number"
                  value={formData.actions.percentage || ''}
                  onChange={(e) => updateActions('percentage', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={() => onSave(formData)} className="flex-1">
              <Save className="w-4 h-4 ml-2" />
              حفظ القاعدة
            </Button>
            <Button onClick={onCancel} variant="outline">
              إلغاء
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* رأس القسم */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">قواعد التسعير</h3>
          <p className="text-sm text-gray-600">إدارة قواعد التسعير التلقائية والشروط الخاصة</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة قاعدة جديدة
        </Button>
      </div>

      {/* نموذج الإضافة/التعديل */}
      {(showAddForm || editingRule) && (
        <RuleForm
          rule={editingRule || undefined}
          onSave={handleSaveRule}
          onCancel={() => {
            setShowAddForm(false);
            setEditingRule(null);
          }}
        />
      )}

      {/* قائمة القواعد */}
      <div className="space-y-4">
        {rules.map(rule => (
          <Card key={rule.id} className={`${!rule.enabled ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    {rule.name}
                    <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                      {rule.enabled ? 'مفعل' : 'معطل'}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingRule(rule)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleRuleStatus(rule.id)}
                  >
                    {rule.enabled ? 'تعطيل' : 'تفعيل'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold mb-2">الشروط:</h5>
                  <ul className="space-y-1 text-gray-600">
                    {rule.conditions.minDays && (
                      <li>• أقل مدة: {rule.conditions.minDays} أيام</li>
                    )}
                    {rule.conditions.maxDays && (
                      <li>• أقصى مدة: {rule.conditions.maxDays} أيام</li>
                    )}
                    {rule.conditions.dateRange && (
                      <li>• التاريخ: {rule.conditions.dateRange.start} إلى {rule.conditions.dateRange.end}</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">الإجراءات:</h5>
                  <ul className="space-y-1 text-gray-600">
                    {rule.actions.multiplier && (
                      <li>• معامل الضرب: ×{rule.actions.multiplier}</li>
                    )}
                    {rule.actions.fixedAmount && (
                      <li>• مبلغ ثابت: ${rule.actions.fixedAmount}</li>
                    )}
                    {rule.actions.percentage && (
                      <li>• نسبة مئوية: {rule.actions.percentage > 0 ? '+' : ''}{rule.actions.percentage}%</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {rules.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">لا توجد قواعد تسعير محددة</p>
              <p className="text-sm text-gray-400">أضف قواعد لتخصيص التسعير حسب الشروط المختلفة</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PricingRules;
