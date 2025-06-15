import React from 'react';
import { BookingData } from '../../types/booking';
import { useCMS } from '../../hooks/useCMS';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PriceSummaryProps {
  bookingData: BookingData;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ bookingData }) => {
  const { data: cmsData } = useCMS();

  // The calculation logic can remain for potential future use or backend processing,
  // but we won't display the result.
  const calculatePrice = () => {
    if (!bookingData.carType || !bookingData.pickupLocation || !bookingData.dropoffLocation) {
      return 0;
    }

    const car = cmsData.booking.carTypes.find(c => c.id === bookingData.carType);
    if (!car) return 0;

    let tourDailyPrice = car.tourDailyPrice;

    // Calculate days
    const days = bookingData.pickupDate && bookingData.dropoffDate
      ? Math.max(1, Math.ceil((new Date(bookingData.dropoffDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
      : 1;

    // Location factors
    const allLocations = [...cmsData.booking.cities, ...cmsData.booking.airports];
    const pickupLocation = allLocations.find(l => l.id === bookingData.pickupLocation);
    const dropoffLocation = allLocations.find(l => l.id === bookingData.dropoffLocation);
    
    const locationFactor = Math.min(
      (pickupLocation?.factor || 1) + (dropoffLocation?.factor || 1), 
      2.5
    );

    // Driver nationality factor
    const driverNationality = cmsData.booking.driverNationalities.find(d => d.id === bookingData.driverNationality);
    const nationalityFactor = driverNationality?.factor || 1;

    // Tour type factor
    const tourType = cmsData.booking.tourTypes.find(t => t.id === bookingData.tourType);
    const tourFactor = tourType?.factor || 1;

    const totalPrice = Math.round(tourDailyPrice * days * locationFactor * nationalityFactor * tourFactor);
    
    return totalPrice;
  };

  const totalPrice = calculatePrice();
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

        {bookingData.carType && (
          <div className="flex justify-between text-sm">
            <span>نوع السيارة:</span>
            <span>{getCarName(bookingData.carType)}</span>
          </div>
        )}

        {bookingData.pickupDate && bookingData.dropoffDate && (
          <div className="flex justify-between text-sm">
            <span>المدة:</span>
            <span>
              {Math.max(1, Math.ceil((new Date(bookingData.dropoffDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))} أيام
            </span>
          </div>
        )}

        <hr className="my-3" />
        
        <div className="text-center font-bold text-lg text-blue-600 py-2">
          <span>تواصل معنا لمعرفة السعر</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceSummary;
