import React from 'react';
import { BookingData } from '../../types/booking';
import { useCMS } from '../../hooks/useCMS';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MapPin } from 'lucide-react';

interface Step1LocationProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

const Step1Location: React.FC<Step1LocationProps> = ({
  bookingData,
  updateBookingData,
  onNext
}) => {
  const { data: cmsData } = useCMS();
  const cities = cmsData.booking.cities.filter(city => city.enabled).sort((a, b) => a.order - b.order);
  const airports = cmsData.booking.airports.filter(airport => airport.enabled).sort((a, b) => a.order - b.order);

  const isFormValid = () => {
    return bookingData.pickupLocation && 
           bookingData.dropoffLocation && 
           bookingData.pickupDate && 
           bookingData.dropoffDate;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-blue-600 flex items-center justify-center gap-2">
          <MapPin className="w-6 h-6" />
          اختر الموقع والتاريخ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">نقطة الانطلاق</label>
            <select
              value={bookingData.pickupLocation}
              onChange={(e) => updateBookingData({ pickupLocation: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">اختر مطار الانطلاق</option>
              <optgroup label="المطارات">
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نقطة العودة</label>
            <select
              value={bookingData.dropoffLocation}
              onChange={(e) => updateBookingData({ dropoffLocation: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">اختر مطار العودة</option>
              <optgroup label="المطارات">
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">تاريخ الانطلاق</label>
            <input
              type="datetime-local"
              value={bookingData.pickupDate}
              onChange={(e) => updateBookingData({ pickupDate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">تاريخ العودة</label>
            <input
              type="datetime-local"
              value={bookingData.dropoffDate}
              onChange={(e) => updateBookingData({ dropoffDate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">المدن المراد زيارتها (اختياري)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 border rounded-lg">
            {cities.map(city => (
              <div key={city.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`city-${city.id}`}
                  value={city.id}
                  checked={!!bookingData.citiesToVisit?.includes(city.id)}
                  onChange={(e) => {
                    const cityId = e.target.value;
                    const currentCities = bookingData.citiesToVisit || [];
                    const newCities = e.target.checked
                      ? [...currentCities, cityId]
                      : currentCities.filter(id => id !== cityId);
                    updateBookingData({ citiesToVisit: newCities });
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`city-${city.id}`} className="text-sm font-medium text-gray-700">
                  {city.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
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

export default Step1Location;
