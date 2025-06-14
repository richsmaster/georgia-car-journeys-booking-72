
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
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
            />
          </div>
          <div>
            <Label>رسالة التأكيد</Label>
            <Textarea
              value={settings.confirmationMessage}
              onChange={(e) => updateSetting('confirmationMessage', e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>رمز العملة</Label>
              <Input
                value={settings.currencySymbol}
                onChange={(e) => updateSetting('currencySymbol', e.target.value)}
              />
            </div>
            <div>
              <Label>أقل مدة حجز (أيام)</Label>
              <Input
                type="number"
                value={settings.minBookingDays}
                onChange={(e) => updateSetting('minBookingDays', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>أقصى مدة حجز (أيام)</Label>
              <Input
                type="number"
                value={settings.maxBookingDays}
                onChange={(e) => updateSetting('maxBookingDays', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSettingsManager;
