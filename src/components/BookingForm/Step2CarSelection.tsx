
import React from 'react';
import { BookingData } from '../../types/booking';
import { useCMS } from '../../hooks/useCMS';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Car } from 'lucide-react';

interface Step2CarSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step2CarSelection: React.FC<Step2CarSelectionProps> = ({
  bookingData,
  updateBookingData,
  onNext,
  onPrev
}) => {
  const { data: cmsData } = useCMS();
  const carTypes = cmsData.booking.carTypes.filter(car => car.enabled).sort((a, b) => a.order - b.order);
  const tourTypes = cmsData.booking.tourTypes.filter(tour => tour.enabled).sort((a, b) => a.order - b.order);
  const currencySymbol = cmsData.booking.settings.currencySymbol;

  const isFormValid = () => {
    return bookingData.carType;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-blue-600 flex items-center justify-center gap-2">
          <Car className="w-6 h-6" />
          اختر نوع السيارة والجولة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">أنواع السيارات</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carTypes.map(car => (
              <div
                key={car.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  bookingData.carType === car.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updateBookingData({ carType: car.id })}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{car.image}</div>
                  <h4 className="font-semibold text-lg">{car.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{car.nameEn}</p>
                  <p className="text-sm text-gray-600 mb-2">{car.capacity.min}-{car.capacity.max} أشخاص</p>
                  <p className="text-blue-600 font-bold">{currencySymbol}{car.tourDailyPrice}/يوم</p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    {car.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">نوع الجولة (اختياري)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tourTypes.map(tour => (
              <div
                key={tour.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  bookingData.tourType === tour.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updateBookingData({ 
                  tourType: bookingData.tourType === tour.id ? '' : tour.id 
                })}
              >
                <div className="text-center">
                  <h4 className="font-medium">{tour.name}</h4>
                  <p className="text-sm text-gray-600">إضافة {Math.round((tour.factor - 1) * 100)}%</p>
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

export default Step2CarSelection;
