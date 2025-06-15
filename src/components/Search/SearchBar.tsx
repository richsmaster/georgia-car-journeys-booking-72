import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Search, MapPin, Calendar, Car, Filter } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

interface SearchBarProps {
  onSearch: (searchData: SearchData) => void;
  showFilters?: boolean;
}

export interface SearchData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  carType: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, showFilters = true }) => {
  const { data: cmsData } = useCMS();
  const [searchData, setSearchData] = useState<SearchData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: '',
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const cities = cmsData.booking?.cities?.filter(city => city.enabled) || [];
  const airports = cmsData.booking?.airports?.filter(airport => airport.enabled) || [];
  const carTypes = cmsData.booking?.carTypes?.filter(car => car.enabled) || [];

  const handleSearch = () => {
    onSearch(searchData);
  };

  const updateSearchData = (field: keyof SearchData, value: any) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              نقطة الانطلاق
            </label>
            <select
              value={searchData.pickupLocation}
              onChange={(e) => updateSearchData('pickupLocation', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">اختر مطار الانطلاق</option>
              <optgroup label="المطارات">
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Dropoff Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              نقطة العودة
            </label>
            <select
              value={searchData.dropoffLocation}
              onChange={(e) => updateSearchData('dropoffLocation', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">اختر مطار العودة</option>
              <optgroup label="المطارات">
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Pickup Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" />
              تاريخ الانطلاق
            </label>
            <Input
              type="datetime-local"
              value={searchData.pickupDate}
              onChange={(e) => updateSearchData('pickupDate', e.target.value)}
              className="p-3"
            />
          </div>

          {/* Dropoff Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              تاريخ العودة
            </label>
            <Input
              type="datetime-local"
              value={searchData.dropoffDate}
              onChange={(e) => updateSearchData('dropoffDate', e.target.value)}
              className="p-3"
            />
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="mb-4 text-blue-600"
            >
              <Filter className="w-4 h-4 ml-2" />
              {showAdvancedFilters ? 'إخفاء الفلاتر المتقدمة' : 'إظهار الفلاتر المتقدمة'}
            </Button>

            {showAdvancedFilters && (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Car Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Car className="w-4 h-4 text-purple-600" />
                    نوع السيارة
                  </label>
                  <select
                    value={searchData.carType}
                    onChange={(e) => updateSearchData('carType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">جميع الأنواع</option>
                    {carTypes.map(car => (
                      <option key={car.id} value={car.id}>
                        {car.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            size="lg"
          >
            <Search className="w-5 h-5 ml-2" />
            البحث عن السيارات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
