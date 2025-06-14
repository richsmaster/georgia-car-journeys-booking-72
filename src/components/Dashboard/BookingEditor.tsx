
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Trash2, Save } from 'lucide-react';
import { BookingData, City, CarType } from '../../types/cms';

interface BookingEditorProps {
  data: BookingData;
  onSave: (data: BookingData) => void;
}

const BookingEditor: React.FC<BookingEditorProps> = ({ data, onSave }) => {
  // Add safety checks to ensure data is properly structured
  const safeData: BookingData = {
    cities: data?.cities || [],
    airports: data?.airports || [],
    carTypes: data?.carTypes || [],
    hotels: data?.hotels || [],
    tourDestinations: data?.tourDestinations || [],
    driverNationalities: data?.driverNationalities || [],
    languages: data?.languages || [],
    tourTypes: data?.tourTypes || [],
    settings: data?.settings || {
      id: '1',
      whatsappNumber: '',
      confirmationMessage: '',
      currencySymbol: '$',
      defaultLanguage: 'ar',
      minBookingDays: 1,
      maxBookingDays: 30,
      mandatoryTourWhenDifferentCity: false
    }
  };

  const [formData, setFormData] = useState<BookingData>(safeData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addCity = () => {
    const newCity: City = {
      id: `city-${Date.now()}`,
      name: 'مدينة جديدة',
      nameEn: 'New City',
      factor: 1.0,
      enabled: true,
      order: formData.cities.length + 1,
      hasAirport: false,
      availableTours: []
    };
    setFormData({
      ...formData,
      cities: [...formData.cities, newCity]
    });
  };

  const updateCity = (id: string, updatedCity: Partial<City>) => {
    setFormData({
      ...formData,
      cities: formData.cities.map(city => 
        city.id === id ? { ...city, ...updatedCity } : city
      )
    });
  };

  const deleteCity = (id: string) => {
    setFormData({
      ...formData,
      cities: formData.cities.filter(city => city.id !== id)
    });
  };

  const addCarType = () => {
    const newCarType: CarType = {
      id: `car-${Date.now()}`,
      name: 'نوع سيارة جديد',
      nameEn: 'New Car Type',
      capacity: { min: 1, max: 4 },
      tourDailyPrice: 90,
      airportTransfer: {
        sameCity: { reception: 25, departure: 25 },
        differentCity: { reception: 25, departure: 90 }
      },
      features: ['ميزة 1', 'ميزة 2'],
      image: '🚗',
      enabled: true,
      order: formData.carTypes.length + 1
    };
    setFormData({
      ...formData,
      carTypes: [...formData.carTypes, newCarType]
    });
  };

  const updateCarType = (id: string, updatedCarType: Partial<CarType>) => {
    setFormData({
      ...formData,
      carTypes: formData.carTypes.map(carType => 
        carType.id === id ? { ...carType, ...updatedCarType } : carType
      )
    });
  };

  const deleteCarType = (id: string) => {
    setFormData({
      ...formData,
      carTypes: formData.carTypes.filter(carType => carType.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="cities" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="cities">المدن</TabsTrigger>
          <TabsTrigger value="airports">المطارات</TabsTrigger>
          <TabsTrigger value="cars">السيارات</TabsTrigger>
          <TabsTrigger value="drivers">السائقين</TabsTrigger>
          <TabsTrigger value="tours">الجولات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="cities">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>إدارة المدن</CardTitle>
                <Button onClick={addCity} size="sm">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مدينة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.cities.map((city) => (
                  <div key={city.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>الاسم بالعربية</Label>
                        <Input
                          value={city.name}
                          onChange={(e) => updateCity(city.id, { name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>الاسم بالإنجليزية</Label>
                        <Input
                          value={city.nameEn}
                          onChange={(e) => updateCity(city.id, { nameEn: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>معامل السعر</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={city.factor}
                          onChange={(e) => updateCity(city.id, { factor: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={city.enabled}
                            onChange={(e) => updateCity(city.id, { enabled: e.target.checked })}
                            className="ml-2"
                          />
                          مفعل
                        </label>
                        <Button
                          onClick={() => deleteCity(city.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cars">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>إدارة أنواع السيارات</CardTitle>
                <Button onClick={addCarType} size="sm">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة نوع سيارة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.carTypes.map((carType) => (
                  <div key={carType.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>الاسم بالعربية</Label>
                        <Input
                          value={carType.name}
                          onChange={(e) => updateCarType(carType.id, { name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>الاسم بالإنجليزية</Label>
                        <Input
                          value={carType.nameEn}
                          onChange={(e) => updateCarType(carType.id, { nameEn: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>السعر اليومي ($)</Label>
                        <Input
                          type="number"
                          value={carType.tourDailyPrice}
                          onChange={(e) => updateCarType(carType.id, { tourDailyPrice: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label>الأيقونة (Emoji)</Label>
                        <Input
                          value={carType.image}
                          onChange={(e) => updateCarType(carType.id, { image: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label>المميزات (مفصولة بفواصل)</Label>
                      <Input
                        value={carType.features.join(', ')}
                        onChange={(e) => updateCarType(carType.id, { features: e.target.value.split(', ') })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={carType.enabled}
                          onChange={(e) => updateCarType(carType.id, { enabled: e.target.checked })}
                          className="ml-2"
                        />
                        مفعل
                      </label>
                      <Button
                        onClick={() => deleteCarType(carType.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الحجز العامة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>رقم الواتساب</Label>
                  <Input
                    value={formData.settings.whatsappNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, whatsappNumber: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>رسالة التأكيد</Label>
                  <Textarea
                    value={formData.settings.confirmationMessage}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, confirmationMessage: e.target.value }
                    })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>رمز العملة</Label>
                    <Input
                      value={formData.settings.currencySymbol}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: { ...formData.settings, currencySymbol: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label>أقل مدة حجز (أيام)</Label>
                    <Input
                      type="number"
                      value={formData.settings.minBookingDays}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: { ...formData.settings, minBookingDays: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <Label>أقصى مدة حجز (أيام)</Label>
                    <Input
                      type="number"
                      value={formData.settings.maxBookingDays}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: { ...formData.settings, maxBookingDays: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="airports">
          <Card>
            <CardHeader>
              <CardTitle>إدارة المطارات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">قسم المطارات - سيتم إضافته قريباً</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>إدارة جنسيات السائقين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">قسم السائقين - سيتم إضافته قريباً</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours">
          <Card>
            <CardHeader>
              <CardTitle>إدارة أنواع الجولات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">قسم الجولات - سيتم إضافته قريباً</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          <Save className="w-4 h-4 ml-2" />
          حفظ جميع التغييرات
        </Button>
      </div>
    </div>
  );
};

export default BookingEditor;
