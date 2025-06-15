
import React from 'react';
import { BookingData } from '../../types/booking';
import { useCMS } from '../../hooks/useCMS';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Wifi, Shield } from 'lucide-react';

interface Step3DriverPreferencesProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step3DriverPreferences: React.FC<Step3DriverPreferencesProps> = ({
  bookingData,
  updateBookingData,
  onNext,
  onPrev
}) => {
  const { data: cmsData } = useCMS();
  const currencySymbol = cmsData.booking.settings.currencySymbol;

  const handlePhoneLineChange = (checked: boolean) => {
    updateBookingData({ hasPhoneLine: checked });
  };

  const handleTravelInsuranceChange = (checked: boolean) => {
    updateBookingData({ hasTravelInsurance: checked });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-blue-600 flex items-center justify-center gap-2">
          <Shield className="w-6 h-6" />
          الخدمات الإضافية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 border-2 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="phoneLine"
                checked={bookingData.hasPhoneLine || false}
                onCheckedChange={handlePhoneLineChange}
              />
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-blue-600" />
                <div>
                  <label htmlFor="phoneLine" className="text-lg font-medium cursor-pointer">
                    خط اتصال
                  </label>
                  <p className="text-sm text-gray-600">
                    {currencySymbol}15 للشخص الواحد
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-2 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="travelInsurance"
                checked={bookingData.hasTravelInsurance || false}
                onCheckedChange={handleTravelInsuranceChange}
              />
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <label htmlFor="travelInsurance" className="text-lg font-medium cursor-pointer">
                    تأمين السفر
                  </label>
                  <p className="text-sm text-gray-600">
                    {currencySymbol}5 للشخص في اليوم الواحد
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            onClick={onPrev}
            variant="outline"
            className="px-8 py-2"
          >
            السابق
          </Button>
          <Button 
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
          >
            التالي
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3DriverPreferences;
