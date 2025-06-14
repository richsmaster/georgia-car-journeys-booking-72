
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Save } from 'lucide-react';

interface FooterEditorProps {
  data: any;
  onSave: (data: any) => void;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحرير تذييل الصفحة</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>اسم الشركة</Label>
            <Input
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
          
          <div>
            <Label>وصف الشركة</Label>
            <Textarea
              value={formData.companyDescription}
              onChange={(e) => setFormData({...formData, companyDescription: e.target.value})}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">معلومات التواصل</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>العنوان</Label>
                <Input
                  value={formData.contactInfo.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, address: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label>رقم الهاتف</Label>
                <Input
                  value={formData.contactInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, phone: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label>البريد الإلكتروني</Label>
                <Input
                  value={formData.contactInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, email: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label>ساعات العمل</Label>
                <Input
                  value={formData.contactInfo.hours}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, hours: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div>
            <Label>الروابط السريعة (مفصولة بفواصل)</Label>
            <Input
              value={formData.quickLinks.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                quickLinks: e.target.value.split(', ')
              })}
            />
          </div>

          <div>
            <Label>الخدمات (مفصولة بفواصل)</Label>
            <Input
              value={formData.services.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                services: e.target.value.split(', ')
              })}
            />
          </div>

          <div>
            <Label>نص حقوق النشر</Label>
            <Input
              value={formData.copyright}
              onChange={(e) => setFormData({...formData, copyright: e.target.value})}
            />
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

export default FooterEditor;
