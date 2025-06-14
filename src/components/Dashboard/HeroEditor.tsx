
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Save } from 'lucide-react';

interface HeroEditorProps {
  data: any;
  onSave: (data: any) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحرير القسم الرئيسي</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">العنوان الأول</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">العنوان الثاني</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryButton">نص الزر الأساسي</Label>
              <Input
                id="primaryButton"
                value={formData.primaryButtonText}
                onChange={(e) => setFormData({...formData, primaryButtonText: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="secondaryButton">نص الزر الثانوي</Label>
              <Input
                id="secondaryButton"
                value={formData.secondaryButtonText}
                onChange={(e) => setFormData({...formData, secondaryButtonText: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">الإحصائيات</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>عدد العملاء</Label>
                <Input
                  value={formData.statistics.customers.value}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      customers: { ...formData.statistics.customers, value: e.target.value }
                    }
                  })}
                />
                <Input
                  className="mt-2"
                  placeholder="تسمية"
                  value={formData.statistics.customers.label}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      customers: { ...formData.statistics.customers, label: e.target.value }
                    }
                  })}
                />
              </div>
              <div>
                <Label>عدد المدن</Label>
                <Input
                  value={formData.statistics.cities.value}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      cities: { ...formData.statistics.cities, value: e.target.value }
                    }
                  })}
                />
                <Input
                  className="mt-2"
                  placeholder="تسمية"
                  value={formData.statistics.cities.label}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      cities: { ...formData.statistics.cities, label: e.target.value }
                    }
                  })}
                />
              </div>
              <div>
                <Label>سنوات الخبرة</Label>
                <Input
                  value={formData.statistics.experience.value}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      experience: { ...formData.statistics.experience, value: e.target.value }
                    }
                  })}
                />
                <Input
                  className="mt-2"
                  placeholder="تسمية"
                  value={formData.statistics.experience.label}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      experience: { ...formData.statistics.experience, label: e.target.value }
                    }
                  })}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HeroEditor;
