
import React from 'react';
import { useCMS } from '../../hooks/useCMS';
import { BookingData } from '../../types/booking';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calculator, Car, MapPin, Calendar, Users } from 'lucide-react';

interface PricingEngineProps {
  bookingData: BookingData;
}

interface PricingBreakdown {
  receptionCost: number;
  departureCost: number;
  toursCost: number;
  mandatoryTourCost: number;
  totalDays: number;
  totalTours: number;
  hasMandatoryTour: boolean;
  totalCost: number;
}

// Export the calculation function for use in other components
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
    carTypeName: 'غير محدد',
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

  // Determine route type
  const pickupCity = pickupLocation?.city || pickupLocation?.id;
  const dropoffCity = dropoffLocation?.city || dropoffLocation?.id;
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

  const calculatePricing = (): PricingBreakdown => {
    if (!bookingData.carType || !bookingData.pickupLocation || !bookingData.dropoffLocation) {
      return {
        receptionCost: 0,
        departureCost: 0,
        toursCost: 0,
        mandatoryTourCost: 0,
        totalDays: 0,
        totalTours: 0,
        hasMandatoryTour: false,
        totalCost: 0
      };
    }

    const car = cmsData.booking.carTypes.find(c => c.id === bookingData.carType);
    if (!car) return {
      receptionCost: 0,
      departureCost: 0,
      toursCost: 0,
      mandatoryTourCost: 0,
      totalDays: 0,
      totalTours: 0,
      hasMandatoryTour: false,
      totalCost: 0
    };

    // Calculate days
    const totalDays = bookingData.pickupDate && bookingData.dropoffDate
      ? Math.max(1, Math.ceil((new Date(bookingData.dropoffDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
      : 1;

    // Get pickup and dropoff locations
    const allLocations = [...cmsData.booking.cities, ...cmsData.booking.airports];
    const pickupLocation = allLocations.find(l => l.id === bookingData.pickupLocation);
    const dropoffLocation = allLocations.find(l => l.id === bookingData.dropoffLocation);

    // Determine if same city or different cities
    const pickupCity = pickupLocation?.city || pickupLocation?.id;
    const dropoffCity = dropoffLocation?.city || dropoffLocation?.id;
    const isSameCity = pickupCity === dropoffCity;

    // Calculate reception and departure costs
    const receptionCost = isSameCity 
      ? car.airportTransfer.sameCity.reception 
      : car.airportTransfer.differentCity.reception;

    const departureCost = isSameCity 
      ? car.airportTransfer.sameCity.departure 
      : car.airportTransfer.differentCity.departure;

    // Calculate mandatory tour (when different cities and setting is enabled)
    const hasMandatoryTour = !isSameCity && cmsData.booking.settings.mandatoryTourWhenDifferentCity;
    const mandatoryTourCost = hasMandatoryTour ? car.tourDailyPrice : 0;

    // Calculate regular tours cost
    const totalTours = totalDays;
    const toursCost = car.tourDailyPrice * totalTours;

    const totalCost = receptionCost + departureCost + toursCost + mandatoryTourCost;

    return {
      receptionCost,
      departureCost,
      toursCost,
      mandatoryTourCost,
      totalDays,
      totalTours,
      hasMandatoryTour,
      totalCost
    };
  };

  const pricing = calculatePricing();
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
          تفصيل التكلفة
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

        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm">خدمة الاستقبال</span>
            <span className="font-semibold">{currencySymbol}{pricing.receptionCost}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm">خدمة التوديع</span>
            <span className="font-semibold">{currencySymbol}{pricing.departureCost}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm">الجولات ({pricing.totalTours} جولة)</span>
            <span className="font-semibold">{currencySymbol}{pricing.toursCost}</span>
          </div>

          {pricing.hasMandatoryTour && (
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-orange-600">جولة إجبارية (مدن مختلفة)</span>
              <span className="font-semibold text-orange-600">{currencySymbol}{pricing.mandatoryTourCost}</span>
            </div>
          )}
        </div>

        {/* Total Cost */}
        <div className="mt-4 pt-4 border-t-2 border-blue-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-900">المجموع الكلي</span>
            <span className="text-2xl font-bold text-blue-600">
              {currencySymbol}{pricing.totalCost}
            </span>
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
