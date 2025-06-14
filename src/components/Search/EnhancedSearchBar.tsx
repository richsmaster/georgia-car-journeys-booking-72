
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Car, Calculator } from 'lucide-react';
import { Button } from '../ui/button';
import { useCMS } from '../../hooks/useCMS';

export interface EnhancedSearchData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  carType: string;
  estimatedPrice: number;
}

interface EnhancedSearchBarProps {
  onSearch: (searchData: EnhancedSearchData) => void;
  onQuickBook?: (route: string) => void;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ onSearch, onQuickBook }) => {
  const { data } = useCMS();
  const [searchData, setSearchData] = useState<EnhancedSearchData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: '',
    estimatedPrice: 0
  });

  const cities = data.booking?.cities?.filter(city => city.enabled) || [];
  const carTypes = data.booking?.carTypes?.filter(car => car.enabled) || [];
  const currencySymbol = data.booking?.settings?.currencySymbol || '$';

  // Popular routes for quick booking
  const popularRoutes = [
    { id: 'tbilisi-batumi', name: 'تبليسي - باتومي', price: 120, duration: '5 ساعات' },
    { id: 'airport-city', name: 'المطار - المدينة', price: 40, duration: '45 دقيقة' },
    { id: 'kazbegi-tour', name: 'جولة كازبيجي', price: 180, duration: 'يوم كامل' },
    { id: 'svaneti-tour', name: 'جولة سفانيتي', price: 250, duration: 'يومين' }
  ];

  // Calculate estimated price
  useEffect(() => {
    if (searchData.pickupLocation && searchData.dropoffLocation && searchData.carType && searchData.pickupDate && searchData.dropoffDate) {
      const selectedCar = carTypes.find(car => car.id === searchData.carType);
      const pickupCity = cities.find(city => city.id === searchData.pickupLocation);
      const dropoffCity = cities.find(city => city.id === searchData.dropoffLocation);
      
      if (selectedCar && pickupCity && dropoffCity) {
        const days = Math.max(1, Math.ceil((new Date(searchData.dropoffDate).getTime() - new Date(searchData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)));
        const basePrice = selectedCar.basePrice * days;
        const locationFactor = (pickupCity.factor + dropoffCity.factor) / 2;
        const estimatedPrice = Math.round(basePrice * locationFactor);
        
        setSearchData(prev => ({ ...prev, estimatedPrice }));
      }
    }
  }, [searchData.pickupLocation, searchData.dropoffLocation, searchData.carType, searchData.pickupDate, searchData.dropoffDate, cities, carTypes]);

  const handleInputChange = (field: keyof EnhancedSearchData, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (searchData.pickupLocation && searchData.dropoffLocation && searchData.pickupDate && searchData.dropoffDate) {
      onSearch(searchData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Search Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Pickup Location */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin className="w-4 h-4 text-blue-600" />
              نقطة الانطلاق
            </label>
            <select
              value={searchData.pickupLocation}
              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">اختر المدينة</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Dropoff Location */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin className="w-4 h-4 text-red-600" />
              الوجهة
            </label>
            <select
              value={searchData.dropoffLocation}
              onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">اختر الوجهة</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar className="w-4 h-4 text-green-600" />
              تاريخ الانطلاق
            </label>
            <input
              type="date"
              value={searchData.pickupDate}
              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Dropoff Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar className="w-4 h-4 text-purple-600" />
              تاريخ العودة
            </label>
            <input
              type="date"
              value={searchData.dropoffDate}
              onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
              min={searchData.pickupDate || new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Car Type */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Car className="w-4 h-4 text-indigo-600" />
              نوع السيارة
            </label>
            <select
              value={searchData.carType}
              onChange={(e) => handleInputChange('carType', e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">اختر النوع</option>
              {carTypes.map(car => (
                <option key={car.id} value={car.id}>{car.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Estimation and Search Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-slate-200">
          {searchData.estimatedPrice > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-lg"
            >
              <Calculator className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">السعر المقدر:</span>
              <span className="text-lg font-bold text-green-600">
                {currencySymbol}{searchData.estimatedPrice}
              </span>
            </motion.div>
          )}
          
          <Button
            onClick={handleSearch}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={!searchData.pickupLocation || !searchData.dropoffLocation || !searchData.pickupDate || !searchData.dropoffDate}
          >
            <Search className="w-5 h-5 ml-2" />
            البحث عن السيارات
          </Button>
        </div>
      </motion.div>

      {/* Quick Booking Routes */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 p-6"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">المسارات الشائعة - حجز سريع</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularRoutes.map((route) => (
            <motion.div
              key={route.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => onQuickBook?.(route.id)}
            >
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {route.name}
                </h4>
                <div className="text-sm text-slate-600">{route.duration}</div>
                <div className="text-lg font-bold text-green-600">
                  {currencySymbol}{route.price}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                >
                  احجز الآن
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedSearchBar;
