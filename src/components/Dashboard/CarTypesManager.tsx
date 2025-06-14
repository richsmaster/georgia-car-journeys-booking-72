
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { CarType } from '../../types/cms';
import { addChangeRecord } from './ChangeHistory';

interface CarTypesManagerProps {
  carTypes: CarType[];
  onUpdateCarTypes: (carTypes: CarType[]) => void;
}

const CarTypesManager: React.FC<CarTypesManagerProps> = ({ carTypes, onUpdateCarTypes }) => {
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
      order: carTypes.length + 1
    };
    
    const updatedCarTypes = [...carTypes, newCarType];
    onUpdateCarTypes(updatedCarTypes);
    
    addChangeRecord({
      action: 'create',
      entityType: 'carTypes',
      entityId: newCarType.id,
      entityName: newCarType.name,
      changes: newCarType
    });
  };

  const updateCarType = (id: string, updatedCarType: Partial<CarType>) => {
    const originalCarType = carTypes.find(carType => carType.id === id);
    
    const updatedCarTypes = carTypes.map(carType => 
      carType.id === id ? { ...carType, ...updatedCarType } : carType
    );
    onUpdateCarTypes(updatedCarTypes);
    
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
    const carTypeToDelete = carTypes.find(carType => carType.id === id);
    
    const updatedCarTypes = carTypes.filter(carType => carType.id !== id);
    onUpdateCarTypes(updatedCarTypes);
    
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

  return (
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
          {carTypes.map((carType) => (
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
  );
};

export default CarTypesManager;
