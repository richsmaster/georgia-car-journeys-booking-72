
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { City } from '../../types/cms';
import BulkActionsToolbar from './BulkActionsToolbar';
import { addChangeRecord } from './ChangeHistory';

interface CitiesManagerProps {
  cities: City[];
  onUpdateCities: (cities: City[]) => void;
  onImportExport: (type: string, data: any[]) => void;
}

const CitiesManager: React.FC<CitiesManagerProps> = ({ cities, onUpdateCities, onImportExport }) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const addCity = () => {
    const newCity: City = {
      id: `city-${Date.now()}`,
      name: 'مدينة جديدة',
      nameEn: 'New City',
      factor: 1.0,
      enabled: true,
      order: cities.length + 1,
      hasAirport: false,
      availableTours: []
    };
    
    const updatedCities = [...cities, newCity];
    onUpdateCities(updatedCities);
    
    addChangeRecord({
      action: 'create',
      entityType: 'cities',
      entityId: newCity.id,
      entityName: newCity.name,
      changes: newCity
    });
  };

  const updateCity = (id: string, updatedCity: Partial<City>) => {
    const originalCity = cities.find(city => city.id === id);
    
    const updatedCities = cities.map(city => 
      city.id === id ? { ...city, ...updatedCity } : city
    );
    onUpdateCities(updatedCities);
    
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
    const cityToDelete = cities.find(city => city.id === id);
    
    const updatedCities = cities.filter(city => city.id !== id);
    onUpdateCities(updatedCities);
    
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

  const handleBulkAction = (action: string) => {
    if (selectedCities.length === 0) return;

    const selectedCitiesData = cities.filter(city => selectedCities.includes(city.id));
    
    switch (action) {
      case 'delete':
        if (confirm(`هل أنت متأكد من حذف ${selectedCities.length} مدينة؟`)) {
          const updatedCities = cities.filter(city => !selectedCities.includes(city.id));
          onUpdateCities(updatedCities);
          
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
        const enabledCities = cities.map(city => 
          selectedCities.includes(city.id) ? { ...city, enabled: true } : city
        );
        onUpdateCities(enabledCities);
        
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
        const disabledCities = cities.map(city => 
          selectedCities.includes(city.id) ? { ...city, enabled: false } : city
        );
        onUpdateCities(disabledCities);
        
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

  return (
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
          totalItems={cities.length}
          onSelectAll={(checked) => {
            if (checked) {
              setSelectedCities(cities.map(city => city.id));
            } else {
              setSelectedCities([]);
            }
          }}
          onBulkDelete={() => handleBulkAction('delete')}
          onBulkEnable={() => handleBulkAction('enable')}
          onBulkDisable={() => handleBulkAction('disable')}
          onExport={() => onImportExport('cities', cities)}
          onImport={() => onImportExport('cities', [])}
          isAllSelected={selectedCities.length === cities.length && cities.length > 0}
        />
        
        <div className="space-y-4 mt-4">
          {cities.map((city) => (
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
  );
};

export default CitiesManager;
