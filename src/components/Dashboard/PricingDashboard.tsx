
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calculator, TrendingUp, Settings, History, AlertTriangle } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';
import PriceCalculator from './PriceCalculator';
import PricingRules from './PricingRules';
import PriceHistory from './PriceHistory';

const PricingDashboard: React.FC = () => {
  const { data: cmsData } = useCMS();
  const [activeTab, setActiveTab] = useState('calculator');

  const carTypes = cmsData.booking?.carTypes || [];
  const cities = cmsData.booking?.cities || [];
  const airports = cmsData.booking?.airports || [];

  // احصائيات سريعة للأسعار
  const priceStats = {
    avgDailyPrice: carTypes.length > 0 ? Math.round(carTypes.reduce((sum, car) => sum + car.tourDailyPrice, 0) / carTypes.length) : 0,
    cheapestCar: carTypes.length > 0 ? Math.min(...carTypes.map(car => car.tourDailyPrice)) : 0,
    mostExpensiveCar: carTypes.length > 0 ? Math.max(...carTypes.map(car => car.tourDailyPrice)) : 0,
    totalLocations: cities.length + airports.length
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط السعر اليومي</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${priceStats.avgDailyPrice}</div>
            <p className="text-xs text-muted-foreground">لجميع أنواع السيارات</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أرخص سيارة</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${priceStats.cheapestCar}</div>
            <p className="text-xs text-muted-foreground">أقل سعر يومي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أغلى سيارة</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${priceStats.mostExpensiveCar}</div>
            <p className="text-xs text-muted-foreground">أعلى سعر يومي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المواقع</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{priceStats.totalLocations}</div>
            <p className="text-xs text-muted-foreground">مدن ومطارات</p>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات إدارة الأسعار */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">حاسبة الأسعار</TabsTrigger>
          <TabsTrigger value="rules">قواعد التسعير</TabsTrigger>
          <TabsTrigger value="history">تاريخ التغييرات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <PriceCalculator />
        </TabsContent>

        <TabsContent value="rules">
          <PricingRules />
        </TabsContent>

        <TabsContent value="history">
          <PriceHistory />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>تحليلات الأسعار</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>تحليلات الأسعار والإحصائيات المتقدمة</p>
                <p className="text-sm">سيتم إضافة المزيد من التحليلات قريباً</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingDashboard;
