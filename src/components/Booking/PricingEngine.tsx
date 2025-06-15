import React from 'react';
import { useCMS } from '../../hooks/useCMS';
import { BookingData } from '../../types/booking';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calculator, Car, MapPin, Calendar } from 'lucide-react';
import { calculatePricing } from '../../lib/pricing';

interface PricingEngineProps {
  bookingData: BookingData;
}

// NOTE: This exported function seems to be legacy or for a different purpose.
// The new pricing logic is in `lib/pricing.ts`.
// Keeping this for now to avoid breaking other parts of the app.
export const calculateBookingPrice = (bookingData: BookingData, cmsBookingData: any) => {
  if (!bookingData.carType || !bookingData.pickupLocation || !bookingData.dropoffLocation) {
    return {
      basePrice: 0,
      locationFactor: 1,
      nationalityFactor: 1,
      tourFactor: 1,
      totalPrice: 0,
      days: 0,
      routeType: 'غير محدد',
      carTypeName: 'غير محدد',
      notes: ['يرجى تحديد جميع البيانات المطلوبة']
    };
  }

  const car = cmsBookingData.carTypes.find((c: any) => c.id === bookingData.carType);
  if (!car) return {
    basePrice: 0,
    locationFactor: 1,
    nationalityFactor: 1,
    tourFactor: 1,
    totalPrice: 0,
    days: 0,
    routeType: 'غير محدد',
    carTypeName: 'غير موجود',
    notes: ['نوع السيارة غير موجود']
  };

  // Calculate days
  const totalDays = bookingData.pickupDate && bookingData.dropoffDate
    ? Math.max(1, Math.ceil((new Date(bookingData.dropoffDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;

  // Get pickup and dropoff locations
  const allLocations = [...cmsBookingData.cities, ...cmsBookingData.airports];
  const pickupLocation = allLocations.find((l: any) => l.id === bookingData.pickupLocation);
  const dropoffLocation = allLocations.find((l: any) => l.id === bookingData.dropoffLocation);

  // Determine route type - properly handle City vs Airport types
  const getLocationCity = (location: any) => {
    // If it's an airport, use the city property
    if (location && 'city' in location) {
      return location.city;
    }
    // If it's a city, use the id directly
    return location?.id;
  };

  const pickupCity = getLocationCity(pickupLocation);
  const dropoffCity = getLocationCity(dropoffLocation);
  const isSameCity = pickupCity === dropoffCity;
  const routeType = isSameCity ? 'نفس المدينة' : 'مدن مختلفة';

  // Base price calculation
  const basePrice = car.tourDailyPrice * totalDays;

  // Apply factors
  let locationFactor = 1;
  let nationalityFactor = 1;
  let tourFactor = 1;

  // Location factor
  if (!isSameCity) {
    locationFactor = 1.2; // 20% increase for different cities
  }

  // Driver nationality factor
  if (bookingData.driverNationality) {
    const nationality = cmsBookingData.driverNationalities?.find((n: any) => n.id === bookingData.driverNationality);
    if (nationality) {
      nationalityFactor = nationality.factor;
    }
  }

  // Tour type factor
  if (bookingData.tourType) {
    const tourType = cmsBookingData.tourTypes?.find((t: any) => t.id === bookingData.tourType);
    if (tourType) {
      tourFactor = tourType.factor;
    }
  }

  const totalPrice = Math.round(basePrice * locationFactor * nationalityFactor * tourFactor);

  const notes = [];
  if (!isSameCity) {
    notes.push('إضافة 20% لاختلاف المدن');
  }
  if (nationalityFactor !== 1) {
    notes.push(`معامل جنسية السائق: ${nationalityFactor}`);
  }
  if (tourFactor !== 1) {
    notes.push(`معامل نوع الجولة: ${tourFactor}`);
  }

  return {
    basePrice,
    locationFactor,
    nationalityFactor,
    tourFactor,
    totalPrice,
    days: totalDays,
    routeType,
    carTypeName: car.name,
    notes
  };
};

const PricingEngine: React.FC<PricingEngineProps> = ({ bookingData }) => {
  const { data: cmsData } = useCMS();

  const pricing = calculatePricing(bookingData, cmsData);
  const car = cmsData.booking.carTypes.find(c => c.id === bookingData.carType);
  const currencySymbol = cmsData.booking.settings.currencySymbol;

  if (!car) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="w-5 h-5 text-blue-600" />
          ملخص الحجز
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Car Information */}
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <Car className="w-5 h-5 text-blue-600" />
          <div>
            <div className="font-semibold text-blue-900">{car.name}</div>
            <div className="text-sm text-blue-600">
              {car.capacity.min}-{car.capacity.max} أشخاص
            </div>
          </div>
        </div>

        {/* Trip Duration */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">مدة الرحلة</span>
          </div>
          <span className="font-bold">{pricing.totalDays} أيام</span>
        </div>

        {/* Total Cost */}
        <div className="mt-4 pt-4 border-t-2 border-blue-200">
          <div className="flex justify-between items-center text-center py-2">
            <p className="text-lg font-bold text-gray-800">
              السعر الإجمالي
            </p>
            <p className="text-2xl font-extrabold text-blue-600">
              {pricing.totalCost > 0 ? `${pricing.totalCost} ${currencySymbol}` : '...'}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        {pricing.hasMandatoryTour && (
          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-600 mt-0.5" />
              <div className="text-sm text-orange-800">
                <div className="font-semibold mb-1">جولة إجبارية مضافة</div>
                <div>نظراً لاختلاف مطاري الوصول والمغادرة، تم إضافة جولة إجبارية للانتقال بين المدن.</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingEngine;
