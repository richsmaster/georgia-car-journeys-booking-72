
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Save } from 'lucide-react';

interface ServicesEditorProps {
  data: any[];
  onSave: (data: any[]) => void;
}

const ServicesEditor: React.FC<ServicesEditorProps> = ({ data, onSave }) => {
  const [services, setServices] = useState(data);

  const updateService = (index: number, field: string, value: any) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(services);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحرير الخدمات</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {services.map((service, index) => (
            <div key={service.id} className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium">خدمة {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>الأيقونة (Emoji)</Label>
                  <Input
                    value={service.icon}
                    onChange={(e) => updateService(index, 'icon', e.target.value)}
                  />
                </div>
                <div>
                  <Label>العنوان</Label>
                  <Input
                    value={service.title}
                    onChange={(e) => updateService(index, 'title', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>الوصف</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label>المميزات (مفصولة بفواصل)</Label>
                <Input
                  value={service.features.join(', ')}
                  onChange={(e) => updateService(index, 'features', e.target.value.split(', '))}
                />
              </div>
            </div>
          ))}
          
          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServicesEditor;
