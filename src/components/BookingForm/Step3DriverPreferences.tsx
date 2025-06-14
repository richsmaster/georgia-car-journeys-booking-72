
import React from 'react';
import { BookingData } from '../../types/booking';
import { useCMS } from '../../hooks/useCMS';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User } from 'lucide-react';

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
  const driverNationalities = cmsData.booking.driverNationalities.filter(driver => driver.enabled).sort((a, b) => a.order - b.order);
  const languages = cmsData.booking.languages.filter(lang => lang.enabled).sort((a, b) => a.order - b.order);

  const handleLanguageToggle = (languageId: string) => {
    const currentLanguages = bookingData.driverLanguages || [];
    const updatedLanguages = currentLanguages.includes(languageId)
      ? currentLanguages.filter(id => id !== languageId)
      : [...currentLanguages, languageId];
    
    updateBookingData({ driverLanguages: updatedLanguages });
  };

  const isFormValid = () => {
    return bookingData.driverNationality && 
           bookingData.driverLanguages && 
           bookingData.driverLanguages.length > 0;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-blue-600 flex items-center justify-center gap-2">
          <User className="w-6 h-6" />
          تفضيلات السائق
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">جنسية السائق</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {driverNationalities.map(nationality => (
              <div
                key={nationality.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  bookingData.driverNationality === nationality.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updateBookingData({ driverNationality: nationality.id })}
              >
                <div className="text-center">
                  <h4 className="font-medium">{nationality.name}</h4>
                  <p className="text-sm text-gray-600">
                    إضافة {Math.round((nationality.factor - 1) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">اللغات المطلوبة (يمكن اختيار أكثر من لغة)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {languages.map(language => (
              <div
                key={language.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  (bookingData.driverLanguages || []).includes(language.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleLanguageToggle(language.id)}
              >
                <div className="text-center">
                  <h4 className="font-medium">{language.name}</h4>
                </div>
              </div>
            ))}
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
            disabled={!isFormValid()}
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
