
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BookingData } from '../../types/booking';
import { calculatePricing } from '../../lib/pricing';
import { useCMS } from '../../hooks/useCMS';

const PriceCalculator: React.FC = () => {
  const { data: cmsData } = useCMS();
  const [testBooking, setTestBooking] = useState<BookingData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: '',
    hasPhoneLine: false,
    hasTravelInsurance: false,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    passengers: 1,
    specialRequests: '',
    totalPrice: 0
  });

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const pricing = calculatePricing(testBooking, cmsData);
    setResult(pricing);
  };

  const updateTestBooking = (field: keyof BookingData, value: any) => {
    setTestBooking(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>حاسبة الأسعار</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>نقطة الانطلاق</Label>
            <Select onValueChange={(value) => updateTestBooking('pickupLocation', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نقطة الانطلاق" />
              </SelectTrigger>
              <SelectContent>
                {cmsData.booking?.airports?.map(airport => (
                  <SelectItem key={airport.id} value={airport.id}>
                    {airport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>نقطة العودة</Label>
            <Select onValueChange={(value) => updateTestBooking('dropoffLocation', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نقطة العودة" />
              </SelectTrigger>
              <SelectContent>
                {cmsData.booking?.airports?.map(airport => (
                  <SelectItem key={airport.id} value={airport.id}>
                    {airport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>تاريخ الانطلاق</Label>
            <Input
              type="date"
              onChange={(e) => updateTestBooking('pickupDate', e.target.value)}
            />
          </div>

          <div>
            <Label>تاريخ العودة</Label>
            <Input
              type="date"
              onChange={(e) => updateTestBooking('dropoffDate', e.target.value)}
            />
          </div>

          <div>
            <Label>نوع السيارة</Label>
            <Select onValueChange={(value) => updateTestBooking('carType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع السيارة" />
              </SelectTrigger>
              <SelectContent>
                {cmsData.booking?.carTypes?.map(car => (
                  <SelectItem key={car.id} value={car.id}>
                    {car.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>عدد الركاب</Label>
            <Input
              type="number"
              min="1"
              onChange={(e) => updateTestBooking('passengers', parseInt(e.target.value))}
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          احسب السعر
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">نتيجة الحساب:</h3>
            <div className="space-y-1 text-sm">
              <p>تكلفة الاستقبال: {result.receptionCost} {cmsData.booking?.settings?.currencySymbol}</p>
              <p>تكلفة المغادرة: {result.departureCost} {cmsData.booking?.settings?.currencySymbol}</p>
              <p>تكلفة الجولات: {result.toursCost} {cmsData.booking?.settings?.currencySymbol}</p>
              <p>عدد الأيام: {result.totalDays}</p>
              <p className="font-bold border-t pt-2">
                السعر الإجمالي: {result.totalCost} {cmsData.booking?.settings?.currencySymbol}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;
