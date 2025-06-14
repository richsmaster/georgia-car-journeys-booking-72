
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Trash2, Hotel, Star } from 'lucide-react';
import { Hotel as HotelType } from '../../types/cms';
import { useCMS } from '../../hooks/useCMS';

interface HotelsManagerProps {
  hotels: HotelType[];
  onUpdateHotels: (hotels: HotelType[]) => void;
}

const HotelsManager: React.FC<HotelsManagerProps> = ({ hotels, onUpdateHotels }) => {
  const { data: cmsData } = useCMS();
  
  const addHotel = () => {
    const newHotel: HotelType = {
      id: `hotel-${Date.now()}`,
      name: 'فندق جديد',
      nameEn: 'New Hotel',
      city: 'tbilisi',
      stars: 3,
      priceRange: { min: 50, max: 100 },
      features: ['إفطار مجاني', 'واي فاي مجاني'],
      enabled: true,
      order: hotels.length + 1
    };
    
    onUpdateHotels([...hotels, newHotel]);
  };

  const updateHotel = (id: string, updatedHotel: Partial<HotelType>) => {
    const updatedHotels = hotels.map(hotel => 
      hotel.id === id ? { ...hotel, ...updatedHotel } : hotel
    );
    onUpdateHotels(updatedHotels);
  };

  const deleteHotel = (id: string) => {
    const updatedHotels = hotels.filter(hotel => hotel.id !== id);
    onUpdateHotels(updatedHotels);
  };

  const cities = cmsData.booking?.cities || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Hotel className="w-5 h-5" />
            إدارة الفنادق
          </CardTitle>
          <Button onClick={addHotel} size="sm">
            <Plus className="w-4 h-4 ml-2" />
            إضافة فندق
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>اسم الفندق بالعربية</Label>
                  <Input
                    value={hotel.name}
                    onChange={(e) => updateHotel(hotel.id, { name: e.target.value })}
                    placeholder="اسم الفندق"
                  />
                </div>
                <div>
                  <Label>اسم الفندق بالإنجليزية</Label>
                  <Input
                    value={hotel.nameEn}
                    onChange={(e) => updateHotel(hotel.id, { nameEn: e.target.value })}
                    placeholder="Hotel Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>المدينة</Label>
                  <Select
                    value={hotel.city}
                    onValueChange={(value) => updateHotel(hotel.id, { city: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    تصنيف النجوم
                  </Label>
                  <Select
                    value={hotel.stars.toString()}
                    onValueChange={(value) => updateHotel(hotel.id, { stars: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(stars => (
                        <SelectItem key={stars} value={stars.toString()}>
                          {stars} نجوم
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ترتيب العرض</Label>
                  <Input
                    type="number"
                    value={hotel.order}
                    onChange={(e) => updateHotel(hotel.id, { order: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>أقل سعر ($/ليلة)</Label>
                  <Input
                    type="number"
                    value={hotel.priceRange.min}
                    onChange={(e) => updateHotel(hotel.id, { 
                      priceRange: { ...hotel.priceRange, min: parseInt(e.target.value) }
                    })}
                    min="0"
                  />
                </div>
                <div>
                  <Label>أعلى سعر ($/ليلة)</Label>
                  <Input
                    type="number"
                    value={hotel.priceRange.max}
                    onChange={(e) => updateHotel(hotel.id, { 
                      priceRange: { ...hotel.priceRange, max: parseInt(e.target.value) }
                    })}
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label>مميزات الفندق (مفصولة بفواصل)</Label>
                <Input
                  value={hotel.features.join(', ')}
                  onChange={(e) => updateHotel(hotel.id, { features: e.target.value.split(', ').filter(f => f.trim()) })}
                  placeholder="إفطار مجاني, واي فاي مجاني, مسبح"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <label className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    checked={hotel.enabled}
                    onCheckedChange={(checked) => updateHotel(hotel.id, { enabled: !!checked })}
                  />
                  <span>فندق مفعل</span>
                </label>
                <Button
                  onClick={() => deleteHotel(hotel.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {hotels.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Hotel className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد فنادق مضافة بعد</p>
              <p className="text-sm">اضغط على "إضافة فندق" لبدء إضافة الفنادق</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelsManager;
