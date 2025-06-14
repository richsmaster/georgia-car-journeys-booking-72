
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/Hero/HeroSection';
import ServicesSection from '../components/Services/ServicesSection';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';
import Footer from '../components/Footer/Footer';
import BookingForm from '../components/BookingForm/BookingForm';
import SearchBar, { SearchData } from '../components/Search/SearchBar';
import { Button } from '../components/ui/button';
import { Settings, Sparkles, MapPin, Clock, Star } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 p-4 mb-8">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-all duration-300 hover:gap-3"
            >
              ← العودة للرئيسية
            </button>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              نموذج الحجز
            </h1>
          </div>
        </div>
        <BookingForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Dashboard Access Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => window.location.href = '/dashboard'}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm shadow-xl border-white/20 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <Settings className="w-4 h-4 ml-2" />
          لوحة التحكم
        </Button>
      </div>

      <HeroSection onBookNow={handleBookNow} />
      
      {/* Enhanced Search Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              بحث متقدم
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ابحث عن السيارة المثالية
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              استخدم البحث المتقدم للعثور على السيارة التي تناسب احتياجاتك وميزانيتك بأفضل الأسعار
            </p>
          </div>
          
          {/* Search Bar with Enhanced Design */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center group">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
                <p className="text-gray-600">مدينة جورجية</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
                <p className="text-gray-600">خدمة العملاء</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9</h3>
                <p className="text-gray-600">تقييم العملاء</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
