
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { History, TrendingUp, TrendingDown, Filter } from 'lucide-react';

interface PriceChange {
  id: string;
  timestamp: string;
  entityType: 'car' | 'location' | 'rule';
  entityId: string;
  entityName: string;
  changeType: 'price_increase' | 'price_decrease' | 'factor_change' | 'rule_added' | 'rule_modified';
  oldValue: any;
  newValue: any;
  difference: number;
  user: string;
  reason?: string;
}

const PriceHistory: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [priceChanges] = useState<PriceChange[]>([
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      entityType: 'car',
      entityId: 'sedan-comfort',
      entityName: 'سيدان مريح',
      changeType: 'price_increase',
      oldValue: 80,
      newValue: 90,
      difference: 10,
      user: 'أحمد المدير',
      reason: 'زيادة تكلفة الوقود'
    },
    {
      id: '2',
      timestamp: '2024-01-14T15:45:00Z',
      entityType: 'location',
      entityId: 'tbilisi',
      entityName: 'تبليسي',
      changeType: 'factor_change',
      oldValue: 1.2,
      newValue: 1.3,
      difference: 0.1,
      user: 'سارة المحاسبة',
      reason: 'تحديث معامل المدينة'
    },
    {
      id: '3',
      timestamp: '2024-01-13T09:15:00Z',
      entityType: 'car',
      entityId: 'luxury-suv',
      entityName: 'SUV فاخر',
      changeType: 'price_decrease',
      oldValue: 150,
      newValue: 140,
      difference: -10,
      user: 'أحمد المدير',
      reason: 'عرض ترويجي'
    },
    {
      id: '4',
      timestamp: '2024-01-12T14:20:00Z',
      entityType: 'rule',
      entityId: 'peak-season',
      entityName: 'موسم الذروة',
      changeType: 'rule_added',
      oldValue: null,
      newValue: { multiplier: 1.3 },
      difference: 0,
      user: 'أحمد المدير',
      reason: 'إضافة قاعدة موسم الذروة'
    },
    {
      id: '5',
      timestamp: '2024-01-11T11:00:00Z',
      entityType: 'car',
      entityId: 'economy-car',
      entityName: 'سيارة اقتصادية',
      changeType: 'price_increase',
      oldValue: 60,
      newValue: 65,
      difference: 5,
      user: 'سارة المحاسبة',
      reason: 'تحديث الأسعار الدورية'
    }
  ]);

  const filteredChanges = filterType === 'all' 
    ? priceChanges 
    : priceChanges.filter(change => change.entityType === filterType);

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'price_increase':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'price_decrease':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <History className="w-4 h-4 text-blue-500" />;
    }
  };

  const getChangeLabel = (changeType: string) => {
    const labels = {
      price_increase: 'زيادة سعر',
      price_decrease: 'تخفيض سعر',
      factor_change: 'تغيير معامل',
      rule_added: 'إضافة قاعدة',
      rule_modified: 'تعديل قاعدة'
    };
    return labels[changeType as keyof typeof labels] || 'تغيير';
  };

  const getChangeBadgeVariant = (changeType: string) => {
    switch (changeType) {
      case 'price_increase':
        return 'destructive';
      case 'price_decrease':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDifference = (change: PriceChange) => {
    if (change.changeType === 'rule_added') return 'جديد';
    if (change.entityType === 'location') {
      return `${change.difference > 0 ? '+' : ''}${change.difference}`;
    }
    return `${change.difference > 0 ? '+' : ''}$${Math.abs(change.difference)}`;
  };

  return (
    <div className="space-y-6">
      {/* فلاتر */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            تصفية التغييرات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
            >
              جميع التغييرات
            </Button>
            <Button
              variant={filterType === 'car' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('car')}
            >
              أسعار السيارات
            </Button>
            <Button
              variant={filterType === 'location' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('location')}
            >
              معاملات المواقع
            </Button>
            <Button
              variant={filterType === 'rule' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('rule')}
            >
              قواعد التسعير
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* قائمة التغييرات */}
      <Card>
        <CardHeader>
          <CardTitle>تاريخ التغييرات</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredChanges.length > 0 ? (
            <div className="space-y-4">
              {filteredChanges.map(change => (
                <div key={change.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0 mt-1">
                    {getChangeIcon(change.changeType)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{change.entityName}</h4>
                      <Badge variant={getChangeBadgeVariant(change.changeType)}>
                        {getChangeLabel(change.changeType)}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-4">
                        <span>التاريخ: {formatDate(change.timestamp)}</span>
                        <span>المستخدم: {change.user}</span>
                      </div>
                      
                      {change.changeType !== 'rule_added' && (
                        <div className="flex items-center gap-4">
                          <span>القيمة السابقة: {change.oldValue}</span>
                          <span>القيمة الجديدة: {change.newValue}</span>
                          <span className={`font-medium ${change.difference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ({formatDifference(change)})
                          </span>
                        </div>
                      )}
                      
                      {change.reason && (
                        <div className="text-gray-500">
                          السبب: {change.reason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">لا توجد تغييرات للعرض</p>
              <p className="text-sm text-gray-400">جرب تغيير الفلتر أو قم بإجراء بعض التغييرات على الأسعار</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {priceChanges.filter(c => c.changeType === 'price_increase').length}
              </div>
              <p className="text-sm text-gray-600">زيادات في الأسعار</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {priceChanges.filter(c => c.changeType === 'price_decrease').length}
              </div>
              <p className="text-sm text-gray-600">تخفيضات في الأسعار</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {priceChanges.filter(c => c.changeType.includes('rule')).length}
              </div>
              <p className="text-sm text-gray-600">تغييرات في القواعد</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PriceHistory;
