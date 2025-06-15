
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Save, Map, Eye, EyeOff } from 'lucide-react';

interface SettingsEditorProps {
  data: any;
  onSave: (data: any) => void;
}

const SettingsEditor: React.FC<SettingsEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [showMapboxToken, setShowMapboxToken] = useState(false);

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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">الإعدادات الأساسية</h3>
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
          </div>

          {/* Color Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">إعدادات الألوان</h3>
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
          </div>

          {/* Map Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Map className="w-5 h-5" />
              إعدادات الخريطة
            </h3>
            <div>
              <Label>رمز Mapbox</Label>
              <div className="relative">
                <Input
                  type={showMapboxToken ? "text" : "password"}
                  value={formData.mapboxToken || ''}
                  onChange={(e) => setFormData({...formData, mapboxToken: e.target.value})}
                  placeholder="pk.eyJ1IjoiYWNhZGVteWZvY3VzODQ3IiwiYSI6ImNtYnd5bzZqMjBxMjAybXF3amc5cWY3dm8ifQ.NCWRSeWpKUfZv8YLFh-E0w"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowMapboxToken(!showMapboxToken)}
                >
                  {showMapboxToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                احصل على رمز Mapbox المجاني من{' '}
                <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  mapbox.com
                </a>
              </p>
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
