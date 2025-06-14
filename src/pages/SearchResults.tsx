
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import SearchBar, { SearchData } from '../components/Search/SearchBar';
import CarCard from '../components/Search/CarCard';
import { useCMS } from '../hooks/useCMS';
import { ArrowRight, SlidersHorizontal, MapPin } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: cmsData } = useCMS();
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('price-low');

  const carTypes = cmsData.booking?.carTypes?.filter(car => car.enabled) || [];
  const currencySymbol = cmsData.booking?.settings?.currencySymbol || '$';

  useEffect(() => {
    // Filter cars based on search parameters
    let filtered = [...carTypes];

    const carTypeFilter = searchParams.get('carType');
    const maxPrice = searchParams.get('maxPrice');

    if (carTypeFilter) {
      filtered = filtered.filter(car => car.id === carTypeFilter);
    }

    if (maxPrice) {
      filtered = filtered.filter(car => car.tourDailyPrice <= parseInt(maxPrice));
    }

    // Sort cars
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.tourDailyPrice - b.tourDailyPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.tourDailyPrice - a.tourDailyPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
        break;
      default:
        break;
    }

    setFilteredCars(filtered);
  }, [searchParams, carTypes, sortBy]);

  const handleNewSearch = (searchData: SearchData) => {
    const params = new URLSearchParams();
    if (searchData.pickupLocation) params.set('pickup', searchData.pickupLocation);
    if (searchData.dropoffLocation) params.set('dropoff', searchData.dropoffLocation);
    if (searchData.pickupDate) params.set('pickupDate', searchData.pickupDate);
    if (searchData.dropoffDate) params.set('dropoffDate', searchData.dropoffDate);
    if (searchData.carType) params.set('carType', searchData.carType);
    if (searchData.priceRange[1] < 500) params.set('maxPrice', searchData.priceRange[1].toString());

    navigate(`/search?${params.toString()}`);
  };

  const handleBookCar = (carId: string) => {
    // Navigate back to home with pre-selected car
    navigate(`/?bookCar=${carId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800"
            >
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">نتائج البحث</h1>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <SearchBar onSearch={handleNewSearch} />
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  الترتيب والفلترة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ترتيب حسب:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="price-low">السعر (الأقل أولاً)</option>
                    <option value="price-high">السعر (الأعلى أولاً)</option>
                    <option value="rating">التقييم</option>
                    <option value="name">الاسم</option>
                  </select>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm mb-3">معلومات البحث:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {searchParams.get('pickup') && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>من: {searchParams.get('pickup')}</span>
                      </div>
                    )}
                    {searchParams.get('dropoff') && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>إلى: {searchParams.get('dropoff')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Grid */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                وُجدت {filteredCars.length} سيارة متاحة
              </h2>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard
                    key={car.id}
                    car={car}
                    currencySymbol={currencySymbol}
                    onBook={handleBookCar}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-semibold mb-2">لا توجد سيارات متاحة</h3>
                  <p className="text-gray-600 mb-4">
                    جرب تعديل معايير البحث للعثور على خيارات أخرى
                  </p>
                  <Button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    بحث جديد
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
