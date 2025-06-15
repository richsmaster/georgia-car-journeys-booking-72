
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Calculator, RefreshCw } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';
import { calculateBookingPrice } from '../Booking/PricingEngine';

const PriceCalculator: React.FC = () => {
  const { data: cmsData } = useCMS();
  const [calculationData, setCalculationData] = useState({
    carType: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    driverNationality: '',
    tourType: '',
    includeHotel: false,
    hotelId: ''
  });
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const cities = cmsData.booking?.cities || [];
  const airports = cmsData.booking?.airports || [];
  const carTypes = cmsData.booking?.carTypes || [];
  const driverNationalities = cmsData.booking?.driverNationalities || [];
  const tourTypes = cmsData.booking?.tourTypes || [];
  const hotels = cmsData.booking?.hotels || [];

  const allLocations = [...cities, ...airports];

  const handleCalculate = async () => {
    if (!calculationData.carType || !calculationData.pickupLocation || !calculationData.dropoffLocation) {
      return;
    }

    setIsCalculating(true);
    
    try {
      const result = calculateBookingPrice({
        ...calculationData,
        guests: 1,
        specialRequests: '',
        contactInfo: {
          name: 'Test',
          email: 'test@test.com',
          phone: '123456789',
          whatsapp: '123456789'
        }
      }, cmsData.booking);

      setCalculationResult(result);
    } catch (error) {
      console.error('Error calculating price:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const updateCalculationData = (field: string, value: any) => {
    setCalculationData(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setCalculationData({
      carType: '',
      pickupLocation: '',
      dropoffLocation: '',
      pickupDate: '',
      dropoffDate: '',
      driverNationality: '',
      tourType: '',
      includeHotel: false,
      hotelId: ''
    });
    setCalculationResult(null);
  };

  // تحديث الحساب تلقائياً عند تغيير البيانات
  useEffect(() => {
    if (calculationData.carType && calculationData.pickupLocation && calculationData.dropoffLocation) {
      handleCalculate();
    }
  }, [calculationData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* نموذج الحساب */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            حاسبة الأسعار التفاعلية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* نوع السيارة */}
          <div>
            <Label>نوع السيارة</Label>
            <select
              value={calculationData.carType}
              onChange={(e) => updateCalculationData('carType', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">اختر نوع السيارة</option>
              {carTypes.map(car => (
                <option key={car.id} value={car.id}>
                  {car.name} - ${car.tourDailyPrice}/يوم
                </option>
              ))}
            </select>
          </div>

          {/* المواقع */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>من</Label>
              <select
                value={calculationData.pickupLocation}
                onChange={(e) => updateCalculationData('pickupLocation', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">اختر الموقع</option>
                {allLocations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>إلى</Label>
              <select
                value={calculationData.dropoffLocation}
                onChange={(e) => updateCalculationData('dropoffLocation', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">اختر الموقع</option>
                {allLocations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* التواريخ */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>تاريخ الانطلاق</Label>
              <Input
                type="datetime-local"
                value={calculationData.pickupDate}
                onChange={(e) => updateCalculationData('pickupDate', e.target.value)}
              />
            </div>
            <div>
              <Label>تاريخ العودة</Label>
              <Input
                type="datetime-local"
                value={calculationData.dropoffDate}
                onChange={(e) => updateCalculationData('dropoffDate', e.target.value)}
              />
            </div>
          </div>

          {/* جنسية السائق */}
          <div>
            <Label>جنسية السائق</Label>
            <select
              value={calculationData.driverNationality}
              onChange={(e) => updateCalculationData('driverNationality', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">اختر الجنسية</option>
              {driverNationalities.map(nationality => (
                <option key={nationality.id} value={nationality.id}>
                  {nationality.name} (معامل: {nationality.factor})
                </option>
              ))}
            </select>
          </div>

          {/* نوع الجولة */}
          <div>
            <Label>نوع الجولة</Label>
            <select
              value={calculationData.tourType}
              onChange={(e) => updateCalculationData('tourType', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">اختر نوع الجولة</option>
              {tourTypes.map(tour => (
                <option key={tour.id} value={tour.id}>
                  {tour.name} (معامل: {tour.factor})
                </option>
              ))}
            </select>
          </div>

          {/* أزرار التحكم */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleCalculate} disabled={isCalculating} className="flex-1">
              {isCalculating ? 'جاري الحساب...' : 'احسب السعر'}
            </Button>
            <Button onClick={resetCalculator} variant="outline">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* نتائج الحساب */}
      <Card>
        <CardHeader>
          <CardTitle>نتائج الحساب</CardTitle>
        </CardHeader>
        <CardContent>
          {calculationResult ? (
            <div className="space-y-4">
              {/* ملخص الحجز */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">ملخص الحجز</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>السيارة:</span>
                    <span>{calculationResult.carTypeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المدة:</span>
                    <span>{calculationResult.days} أيام</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المسار:</span>
                    <span>{calculationResult.routeType}</span>
                  </div>
                </div>
              </div>

              {/* تفاصيل الأسعار */}
              <div className="space-y-2">
                <h4 className="font-semibold">تفاصيل التسعير</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>السعر الأساسي:</span>
                    <span>${calculationResult.basePrice}</span>
                  </div>
                  {calculationResult.locationFactor !== 1 && (
                    <div className="flex justify-between">
                      <span>معامل الموقع:</span>
                      <span>×{calculationResult.locationFactor}</span>
                    </div>
                  )}
                  {calculationResult.nationalityFactor !== 1 && (
                    <div className="flex justify-between">
                      <span>معامل السائق:</span>
                      <span>×{calculationResult.nationalityFactor}</span>
                    </div>
                  )}
                  {calculationResult.tourFactor !== 1 && (
                    <div className="flex justify-between">
                      <span>معامل الجولة:</span>
                      <span>×{calculationResult.tourFactor}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* السعر النهائي */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">السعر الإجمالي:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${calculationResult.totalPrice}
                  </span>
                </div>
              </div>

              {/* ملاحظات */}
              {calculationResult.notes && calculationResult.notes.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">ملاحظات:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {calculationResult.notes.map((note: string, index: number) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>املأ البيانات أعلاه لحساب السعر</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceCalculator;
