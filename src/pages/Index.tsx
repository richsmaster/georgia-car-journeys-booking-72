
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/Hero/HeroSection';
import ServicesSection from '../components/Services/ServicesSection';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';
import Footer from '../components/Footer/Footer';
import BookingForm from '../components/BookingForm/BookingForm';
import SearchBar, { SearchData } from '../components/Search/SearchBar';
import { Button } from '../components/ui/button';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check if we need to pre-select a car from search results
  useEffect(() => {
    const bookCarId = searchParams.get('bookCar');
    if (bookCarId) {
      setShowBookingForm(true);
    }
  }, [searchParams]);

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleBackToHome = () => {
    setShowBookingForm(false);
    // Clear URL parameters
    navigate('/', { replace: true });
  };

  const handleSearch = (searchData: SearchData) => {
    // Navigate to search results page with filters
    const params = new URLSearchParams();
    if (searchData.pickupLocation) params.set('pickup', searchData.pickupLocation);
    if (searchData.dropoffLocation) params.set('dropoff', searchData.dropoffLocation);
    if (searchData.pickupDate) params.set('pickupDate', searchData.pickupDate);
    if (searchData.dropoffDate) params.set('dropoffDate', searchData.dropoffDate);
    if (searchData.carType) params.set('carType', searchData.carType);
    if (searchData.priceRange[1] < 500) params.set('maxPrice', searchData.priceRange[1].toString());

    navigate(`/search?${params.toString()}`);
  };

  if (showBookingForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm p-4 mb-8">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ← العودة للرئيسية
            </button>
            <h1 className="text-xl font-bold text-gray-900">نموذج الحجز</h1>
          </div>
        </div>
        <BookingForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Dashboard Access Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => window.location.href = '/dashboard'}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm shadow-lg border-white/20"
        >
          <Settings className="w-4 h-4 ml-2" />
          لوحة التحكم
        </Button>
      </div>

      <HeroSection onBookNow={handleBookNow} />
      
      {/* Advanced Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ابحث عن السيارة المثالية
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              استخدم البحث المتقدم للعثور على السيارة التي تناسب احتياجاتك وميزانيتك
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
