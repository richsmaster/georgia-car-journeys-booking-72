
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { MapPin, Plus, Trash2, Save, Eye, Settings } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';
import InteractiveMap from '../Map/InteractiveMap';

const MapManager: React.FC = () => {
  const { data: cmsData, updateData } = useCMS();
  const [activeTab, setActiveTab] = useState<'preview' | 'cities' | 'settings'>('preview');

  const handleUpdateCities = async (updatedCities: any[]) => {
    await updateData({
      booking: {
        ...cmsData.booking,
        cities: updatedCities
      }
    });
  };

  const addCity = () => {
    const newCity = {
      id: `city-${Date.now()}`,
      name: 'مدينة جديدة',
      nameEn: 'New City',
      factor: 1.0,
      enabled: true,
      order: cmsData.booking.cities.length + 1,
      hasAirport: false,
      availableTours: []
    };
    
    handleUpdateCities([...cmsData.booking.cities, newCity]);
  };

  const deleteCity = (cityId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المدينة؟')) {
      const updatedCities = cmsData.booking.cities.filter(city => city.id !== cityId);
      handleUpdateCities(updatedCities);
    }
  };

  const updateCity = (cityId: string, updates: any) => {
    const updatedCities = cmsData.booking.cities.map(city => 
      city.id === cityId ? { ...city, ...updates } : city
    );
    handleUpdateCities(updatedCities);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          إدارة الخريطة التفاعلية
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'preview' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Eye className="w-4 h-4 inline ml-2" />
          معاينة الخريطة
        </button>
        <button
          onClick={() => setActiveTab('cities')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'cities' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <MapPin className="w-4 h-4 inline ml-2" />
          إدارة المدن
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'settings' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings className="w-4 h-4 inline ml-2" />
          إعدادات الخريطة
        </button>
      </div>

      {/* Map Preview Tab */}
      {activeTab === 'preview' && (
        <Card>
          <CardHeader>
            <CardTitle>معاينة الخريطة التفاعلية</CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveMap />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">المدن المفعلة</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {cmsData.booking.cities.filter(city => city.enabled).length}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900">المدن مع مطارات</h3>
                <p className="text-2xl font-bold text-green-600">
                  {cmsData.booking.cities.filter(city => city.hasAirport).length}
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-900">أنواع السيارات</h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {cmsData.booking.carTypes.filter(car => car.enabled).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cities Management Tab */}
      {activeTab === 'cities' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>إدارة المدن على الخريطة</CardTitle>
              <Button onClick={addCity} size="sm">
                <Plus className="w-4 h-4 ml-2" />
                إضافة مدينة
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cmsData.booking.cities.map((city) => (
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
                          checked={city.hasAirport}
                          onChange={(e) => updateCity(city.id, { hasAirport: e.target.checked })}
                          className="ml-2"
                        />
                        <span>يحتوي على مطار</span>
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
      )}

      {/* Map Settings Tab */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الخريطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">حالة رمز Mapbox</h3>
                {cmsData.settings?.mapboxToken ? (
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>تم تكوين رمز Mapbox بنجاح</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>لم يتم تكوين رمز Mapbox - انتقل إلى الإعدادات لإضافته</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">إحصائيات الخريطة</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>إجمالي المدن:</span>
                      <span className="font-semibold">{cmsData.booking.cities.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المدن المفعلة:</span>
                      <span className="font-semibold">{cmsData.booking.cities.filter(c => c.enabled).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المدن مع مطارات:</span>
                      <span className="font-semibold">{cmsData.booking.cities.filter(c => c.hasAirport).length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">معلومات مفيدة</h3>
                  <div className="text-sm text-slate-600 space-y-2">
                    <p>• يتم عرض المدن المفعلة فقط على الخريطة</p>
                    <p>• المدن التي تحتوي على مطارات تظهر بعلامة خضراء</p>
                    <p>• عدد السيارات المعروض يعتمد على السيارات المفعلة</p>
                    <p>• يمكن النقر على أي مدينة لعرض السيارات المتاحة</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapManager;
