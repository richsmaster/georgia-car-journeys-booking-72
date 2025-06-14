
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Save } from 'lucide-react';

interface SettingsEditorProps {
  data: any;
  onSave: (data: any) => void;
}

const SettingsEditor: React.FC<SettingsEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات الموقع</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>اسم الموقع</Label>
            <Input
              value={formData.siteName}
              onChange={(e) => setFormData({...formData, siteName: e.target.value})}
            />
          </div>
          
          <div>
            <Label>وصف الموقع</Label>
            <Textarea
              value={formData.siteDescription}
              onChange={(e) => setFormData({...formData, siteDescription: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>اللون الأساسي</Label>
              <Input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
              />
            </div>
            <div>
              <Label>اللون الثانوي</Label>
              <Input
                type="color"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
              />
            </div>
            <div>
              <Label>لون التمييز</Label>
              <Input
                type="color"
                value={formData.accentColor}
                onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
              />
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

export default SettingsEditor;
