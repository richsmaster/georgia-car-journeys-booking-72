
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Save, History, Shield, Bell } from 'lucide-react';
import { BookingData } from '../../types/cms';
import CitiesManager from './CitiesManager';
import CarTypesManager from './CarTypesManager';
import BookingSettingsManager from './BookingSettingsManager';
import PlaceholderSection from './PlaceholderSection';
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
  const [showImportExport, setShowImportExport] = useState<{show: boolean, type: string, data: any[]}>({show: false, type: '', data: []});
  const [activeTab, setActiveTab] = useState('cities');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

  const handleImportData = (importedData: any[]) => {
    switch (showImportExport.type) {
      case 'cities':
        setFormData({
          ...formData,
          cities: importedData
        });
        break;
      case 'carTypes':
        setFormData({
          ...formData,
          carTypes: importedData
        });
        break;
    }
    setShowImportExport({show: false, type: '', data: []});
  };

  const handleImportExport = (type: string, data: any[]) => {
    setShowImportExport({show: true, type, data});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة بيانات الحجز المتقدمة</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="cities">المدن</TabsTrigger>
          <TabsTrigger value="cars">السيارات</TabsTrigger>
          <TabsTrigger value="airports">المطارات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">التنبيهات</span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">السجل</span>
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Shield className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">النسخ الاحتياطية</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cities">
          <CitiesManager
            cities={formData.cities}
            onUpdateCities={(cities) => setFormData({...formData, cities})}
            onImportExport={handleImportExport}
          />
        </TabsContent>

        <TabsContent value="cars">
          <CarTypesManager
            carTypes={formData.carTypes}
            onUpdateCarTypes={(carTypes) => setFormData({...formData, carTypes})}
          />
        </TabsContent>

        <TabsContent value="airports">
          <PlaceholderSection
            title="إدارة المطارات"
            description="قسم المطارات - سيتم إضافته قريباً"
          />
        </TabsContent>

        <TabsContent value="settings">
          <BookingSettingsManager
            settings={formData.settings}
            onUpdateSettings={(settings) => setFormData({...formData, settings})}
          />
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
