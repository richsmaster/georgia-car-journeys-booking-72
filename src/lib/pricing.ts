
import { BookingData } from '../types/booking';

export interface PricingBreakdown {
  receptionCost: number;
  departureCost: number;
  toursCost: number;
  mandatoryTourCost: number;
  totalDays: number;
  totalTours: number;
  hasMandatoryTour: boolean;
  totalCost: number;
}

export const calculatePricing = (bookingData: BookingData, cmsData: any): PricingBreakdown => {
  const emptyResult = {
    receptionCost: 0,
    departureCost: 0,
    toursCost: 0,
    mandatoryTourCost: 0,
    totalDays: 0,
    totalTours: 0,
    hasMandatoryTour: false,
    totalCost: 0,
  };

  if (!bookingData.carType || !bookingData.pickupLocation || !bookingData.dropoffLocation || !bookingData.pickupDate || !bookingData.dropoffDate) {
    return emptyResult;
  }

  const car = cmsData.booking.carTypes.find((c: any) => c.id === bookingData.carType);
  if (!car) return emptyResult;

  // حساب الأيام بطريقة صحيحة - من تاريخ الوصول إلى تاريخ المغادرة شاملاً
  const pickupDate = new Date(bookingData.pickupDate);
  const dropoffDate = new Date(bookingData.dropoffDate);
  const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
  const totalDays = Math.max(1, Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1);

  const allLocations = [...cmsData.booking.cities, ...cmsData.booking.airports];
  const pickupLocation = allLocations.find((l: any) => l.id === bookingData.pickupLocation);
  const dropoffLocation = allLocations.find((l: any) => l.id === bookingData.dropoffLocation);

  const getLocationCity = (location: any) => {
    if (location && 'city' in location) {
      return location.city;
    }
    return location?.id;
  };

  const pickupCity = getLocationCity(pickupLocation);
  const dropoffCity = getLocationCity(dropoffLocation);
  const isSameCity = pickupCity === dropoffCity;

  const receptionCost = isSameCity
    ? (car.airportTransfer?.sameCity?.reception || 0)
    : (car.airportTransfer?.differentCity?.reception || 0);

  const departureCost = isSameCity
    ? (car.airportTransfer?.sameCity?.departure || 0)
    : (car.airportTransfer?.differentCity?.departure || 0);

  const hasMandatoryTour = !isSameCity && cmsData.booking.settings.mandatoryTourWhenDifferentCity;
  const mandatoryTourCost = hasMandatoryTour ? (car.tourDailyPrice || 0) : 0;

  const totalTours = totalDays;
  const toursCost = (car.tourDailyPrice || 0) * totalTours;

  const totalCost = Math.round(receptionCost + departureCost + toursCost + mandatoryTourCost);

  return {
    receptionCost,
    departureCost,
    toursCost,
    mandatoryTourCost,
    totalDays,
    totalTours,
    hasMandatoryTour,
    totalCost,
  };
};
