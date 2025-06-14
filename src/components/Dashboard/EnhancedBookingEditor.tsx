import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { Plus, Trash2, Save, History, Shield, Bell } from 'lucide-react';
import { BookingData, City, CarType } from '../../types/cms';
import BulkActionsToolbar from './BulkActionsToolbar';
import DataImportExport from './DataImportExport';
import BackupManager from './BackupManager';
import ChangeHistory, { addChangeRecord } from './ChangeHistory';
import NotificationCenter from './NotificationCenter';

interface EnhancedBookingEditorProps {
  data: BookingData;
  onSave: (data: BookingData) => void;
}

const EnhancedBookingEditor: React.FC<EnhancedBookingEditorProps> = ({ data, onSave }) => {
  const safeData: BookingData = {
    cities: data?.cities || [],
    airports: data?.airports || [],
    carTypes: data?.carTypes || [],
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
      maxBookingDays: 30
    }
  };

  const [formData, setFormData] = useState<BookingData>(safeData);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([]);
  const [showImportExport, setShowImportExport] = useState<{show: boolean, type: string, data: any[]}>({show: false, type: '', data: []});
  const [activeTab, setActiveTab] = useState('cities');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add change record
    addChangeRecord({
      action: 'update',
      entityType: 'booking',
      entityId: 'booking-settings',
      entityName: 'إعدادات الحجز',
      changes: formData,
      previousData: data
    });
    
    onSave(formData);
  };

  // Cities Management
  const addCity = () => {
    const newCity: City = {
      id: `city-${Date.now()}`,
      name: 'مدينة جديدة',
      nameEn: 'New City',
      factor: 1.0,
      enabled: true,
      order: formData.cities.length + 1
    };
    
    const updatedData = {
      ...formData,
      cities: [...formData.cities, newCity]
    };
    
    setFormData(updatedData);
    
    addChangeRecord({
      action: 'create',
      entityType: 'cities',
      entityId: newCity.id,
      entityName: newCity.name,
      changes: newCity
    });
  };

  const updateCity = (id: string, updatedCity: Partial<City>) => {
    const originalCity = formData.cities.find(city => city.id === id);
    
    setFormData({
      ...formData,
      cities: formData.cities.map(city => 
        city.id === id ? { ...city, ...updatedCity } : city
      )
    });
    
    if (originalCity) {
      addChangeRecord({
        action: 'update',
        entityType: 'cities',
        entityId: id,
        entityName: originalCity.name,
        changes: updatedCity,
        previousData: originalCity
      });
    }
  };

  const deleteCity = (id: string) => {
    const cityToDelete = formData.cities.find(city => city.id === id);
    
    setFormData({
      ...formData,
      cities: formData.cities.filter(city => city.id !== id)
    });
    
    if (cityToDelete) {
      addChangeRecord({
        action: 'delete',
        entityType: 'cities',
        entityId: id,
        entityName: cityToDelete.name,
        changes: {},
        previousData: cityToDelete
      });
    }
  };

  // Bulk Actions for Cities
  const handleCityBulkAction = (action: string) => {
    if (selectedCities.length === 0) return;

    const selectedCitiesData = formData.cities.filter(city => selectedCities.includes(city.id));
    
    switch (action) {
      case 'delete':
        if (confirm(`هل أنت متأكد من حذف ${selectedCities.length} مدينة؟`)) {
          setFormData({
            ...formData,
            cities: formData.cities.filter(city => !selectedCities.includes(city.id))
          });
          
          addChangeRecord({
            action: 'bulk_delete',
            entityType: 'cities',
            entityId: 'bulk',
            entityName: `${selectedCities.length} مدينة`,
            changes: { deletedCount: selectedCities.length },
            previousData: selectedCitiesData
          });
          
          setSelectedCities([]);
        }
        break;
      case 'enable':
        setFormData({
          ...formData,
          cities: formData.cities.map(city => 
            selectedCities.includes(city.id) ? { ...city, enabled: true } : city
          )
        });
        
        addChangeRecord({
          action: 'bulk_update',
          entityType: 'cities',
          entityId: 'bulk',
          entityName: `${selectedCities.length} مدينة`,
          changes: { enabled: true },
          previousData: selectedCitiesData
        });
        break;
      case 'disable':
        setFormData({
          ...formData,
          cities: formData.cities.map(city => 
            selectedCities.includes(city.id) ? { ...city, enabled: false } : city
          )
        });
        
        addChangeRecord({
          action: 'bulk_update',
          entityType: 'cities',
          entityId: 'bulk',
          entityName: `${selectedCities.length} مدينة`,
          changes: { enabled: false },
          previousData: selectedCitiesData
        });
        break;
    }
  };

  // Car Types Management with similar bulk actions
  const addCarType = () => {
    const newCarType: CarType = {
      id: `car-${Date.now()}`,
      name: 'نوع سيارة جديد',
      nameEn: 'New Car Type',
      basePrice: 50,
      features: ['ميزة 1', 'ميزة 2'],
      image: '🚗',
      enabled: true,
      order: formData.carTypes.length + 1
    };
    
    setFormData({
      ...formData,
      carTypes: [...formData.carTypes, newCarType]
    });
    
    addChangeRecord({
      action: 'create',
      entityType: 'carTypes',
      entityId: newCarType.id,
      entityName: newCarType.name,
      changes: newCarType
    });
  };

  const updateCarType = (id: string, updatedCarType: Partial<CarType>) => {
    const originalCarType = formData.carTypes.find(carType => carType.id === id);
    
    setFormData({
      ...formData,
      carTypes: formData.carTypes.map(carType => 
        carType.id === id ? { ...carType, ...updatedCarType } : carType
      )
    });
    
    if (originalCarType) {
      addChangeRecord({
        action: 'update',
        entityType: 'carTypes',
        entityId: id,
        entityName: originalCarType.name,
        changes: updatedCarType,
        previousData: originalCarType
      });
    }
  };

  const deleteCarType = (id: string) => {
    const carTypeToDelete = formData.carTypes.find(carType => carType.id === id);
    
    setFormData({
      ...formData,
      carTypes: formData.carTypes.filter(carType => carType.id !== id)
    });
    
    if (carTypeToDelete) {
      addChangeRecord({
        action: 'delete',
        entityType: 'carTypes',
        entityId: id,
        entityName: carTypeToDelete.name,
        changes: {},
        previousData: carTypeToDelete
      });
    }
  };

  // Import/Export Functions
  const handleImportData = (importedData: any[]) => {
    switch (showImportExport.type) {
      case 'cities':
        setFormData({
          ...formData,
          cities: importedData as City[]
        });
        break;
      case 'carTypes':
        setFormData({
          ...formData,
          carTypes: importedData as CarType[]
        });
        break;
    }
    setShowImportExport({show: false, type: '', data: []});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة بيانات الحجز المتقدمة</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab('notifications')}
            variant="outline"
            size="sm"
          >
            <Bell className="w-4 h-4 ml-2" />
            التنبيهات
          </Button>
          <Button
            onClick={() => setActiveTab('history')}
            variant="outline"
            size="sm"
          >
            <History className="w-4 h-4 ml-2" />
            السجل
          </Button>
          <Button
            onClick={() => setActiveTab('backup')}
            variant="outline"
            size="sm"
          >
            <Shield className="w-4 h-4 ml-2" />
            النسخ الاحتياطية
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="cities">المدن</TabsTrigger>
          <TabsTrigger value="cars">السيارات</TabsTrigger>
          <TabsTrigger value="airports">المطارات</TabsTrigger>
          <TabsTrigger value="drivers">السائقين</TabsTrigger>
          <TabsTrigger value="tours">الجولات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          <TabsTrigger value="notifications">التنبيهات</TabsTrigger>
          <TabsTrigger value="history">السجل</TabsTrigger>
          <TabsTrigger value="backup">النسخ الاحتياطية</TabsTrigger>
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
              <BulkActionsToolbar
                selectedItems={selectedCities}
                totalItems={formData.cities.length}
                onSelectAll={(checked) => {
                  if (checked) {
                    setSelectedCities(formData.cities.map(city => city.id));
                  } else {
                    setSelectedCities([]);
                  }
                }}
                onBulkDelete={() => handleCityBulkAction('delete')}
                onBulkEnable={() => handleCityBulkAction('enable')}
                onBulkDisable={() => handleCityBulkAction('disable')}
                onExport={() => setShowImportExport({show: true, type: 'cities', data: formData.cities})}
                onImport={() => setShowImportExport({show: true, type: 'cities', data: []})}
                isAllSelected={selectedCities.length === formData.cities.length && formData.cities.length > 0}
              />
              
              <div className="space-y-4 mt-4">
                {formData.cities.map((city) => (
                  <div key={city.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Checkbox
                        checked={selectedCities.includes(city.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCities([...selectedCities, city.id]);
                          } else {
                            setSelectedCities(selectedCities.filter(id => id !== city.id));
                          }
                        }}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
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
                            <Checkbox
                              checked={city.enabled}
                              onCheckedChange={(checked) => updateCity(city.id, { enabled: !!checked })}
                            />
                            <span className="mr-2">مفعل</span>
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
                        <Label>السعر الأساسي ($)</Label>
                        <Input
                          type="number"
                          value={carType.basePrice}
                          onChange={(e) => updateCarType(carType.id, { basePrice: parseInt(e.target.value) })}
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
                        <Checkbox
                          checked={carType.enabled}
                          onCheckedChange={(checked) => updateCarType(carType.id, { enabled: !!checked })}
                        />
                        <span className="mr-2">مفعل</span>
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

        <TabsContent value="notifications">
          <NotificationCenter data={formData} />
        </TabsContent>

        <TabsContent value="history">
          <ChangeHistory />
        </TabsContent>

        <TabsContent value="backup">
          <BackupManager
            onCreateBackup={() => console.log('Backup created')}
            onRestoreBackup={(id) => console.log('Backup restored:', id)}
            onDeleteBackup={(id) => console.log('Backup deleted:', id)}
          />
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
      </Tabs>

      {showImportExport.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DataImportExport
            data={showImportExport.data}
            onImport={handleImportData}
            onClose={() => setShowImportExport({show: false, type: '', data: []})}
            dataType={showImportExport.type}
          />
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          <Save className="w-4 h-4 ml-2" />
          حفظ جميع التغييرات
        </Button>
      </div>
    </div>
  );
};

export default EnhancedBookingEditor;
