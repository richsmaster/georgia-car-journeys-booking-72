
import React from 'react';
import { BookingData } from '../../types/booking';
import { useCMS } from '../../hooks/useCMS';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { calculatePricing } from '../../lib/pricing';

interface PriceSummaryProps {
  bookingData: BookingData;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ bookingData }) => {
  const { data: cmsData } = useCMS();

  const pricing = calculatePricing(bookingData, cmsData);
  const totalPrice = pricing.totalCost;
  const allLocations = [...cmsData.booking.cities, ...cmsData.booking.airports];

  const getLocationName = (locationId: string) => {
    const location = allLocations.find(l => l.id === locationId);
    return location ? location.name : '';
  };

  const getCarName = (carId: string) => {
    const car = cmsData.booking.carTypes.find(c => c.id === carId);
    return car ? car.name : '';
  };

  if (!bookingData.carType) {
    return null;
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg text-center">ملخص الحجز</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {bookingData.pickupLocation && (
          <div className="flex justify-between text-sm">
            <span>من:</span>
            <span>{getLocationName(bookingData.pickupLocation)}</span>
          </div>
        )}
        
        {bookingData.dropoffLocation && (
          <div className="flex justify-between text-sm">
            <span>إلى:</span>
            <span>{getLocationName(bookingData.dropoffLocation)}</span>
          </div>
        )}

        {bookingData.citiesToVisit && bookingData.citiesToVisit.length > 0 && (
            <div className="flex justify-between text-sm pt-2 border-t mt-2">
                <span>المدن المختارة:</span>
                <span className="text-left max-w-[60%]">
                    {bookingData.citiesToVisit.map(cityId => getLocationName(cityId)).join('، ')}
                </span>
            </div>
        )}

        {bookingData.carType && (
          <div className="flex justify-between text-sm">
            <span>نوع السيارة:</span>
            <span>{getCarName(bookingData.carType)}</span>
          </div>
        )}

        {bookingData.pickupDate && bookingData.dropoffDate && (
          <div className="flex justify-between text-sm">
            <span>المدة:</span>
            <span>{pricing.totalDays} أيام</span>
          </div>
        )}

        <hr className="my-3" />
        
        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-lg">السعر الإجمالي:</span>
          <span className="font-bold text-xl text-blue-600">
            {totalPrice > 0 ? `${totalPrice} ${cmsData.booking.settings.currencySymbol}` : '...'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceSummary;
