
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { BookingSettings } from '../../types/cms';

interface BookingSettingsManagerProps {
  settings: BookingSettings;
  onUpdateSettings: (settings: BookingSettings) => void;
}

const BookingSettingsManager: React.FC<BookingSettingsManagerProps> = ({ settings, onUpdateSettings }) => {
  const updateSetting = (field: keyof BookingSettings, value: any) => {
    onUpdateSettings({ ...settings, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات الحجز العامة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>رقم الواتساب</Label>
            <Input
              value={settings.whatsappNumber}
              onChange={(e) => updateSetting('whatsappNumber', e.target.value)}
              placeholder="+995551234567"
            />
          </div>
          
          <div>
            <Label>رسالة التأكيد</Label>
            <Textarea
              value={settings.confirmationMessage}
              onChange={(e) => updateSetting('confirmationMessage', e.target.value)}
              rows={3}
              placeholder="رسالة التأكيد التي ستظهر للعميل بعد الحجز"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>رمز العملة</Label>
              <Input
                value={settings.currencySymbol}
                onChange={(e) => updateSetting('currencySymbol', e.target.value)}
                placeholder="$"
              />
            </div>
            <div>
              <Label>أقل مدة حجز (أيام)</Label>
              <Input
                type="number"
                value={settings.minBookingDays}
                onChange={(e) => updateSetting('minBookingDays', parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <Label>أقصى مدة حجز (أيام)</Label>
              <Input
                type="number"
                value={settings.maxBookingDays}
                onChange={(e) => updateSetting('maxBookingDays', parseInt(e.target.value))}
                min="1"
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Label className="text-base font-semibold">إعدادات التسعير المتقدمة</Label>
            <div className="mt-3">
              <label className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  checked={settings.mandatoryTourWhenDifferentCity}
                  onCheckedChange={(checked) => updateSetting('mandatoryTourWhenDifferentCity', !!checked)}
                />
                <span className="text-sm">
                  إضافة جولة إجبارية عند اختلاف مطاري الوصول والمغادرة
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1 mr-6">
                عند تفعيل هذا الخيار، ستتم إضافة جولة إجبارية تلقائياً إذا كان مطار الوصول يختلف عن مطار المغادرة
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSettingsManager;
