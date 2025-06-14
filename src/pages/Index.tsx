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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-200/50 p-4 mb-8">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-all duration-300"
            >
              ← العودة للرئيسية
            </button>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Dashboard Access Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => window.location.href = '/dashboard'}
          variant="outline"
          size="sm"
          className="bg-white/95 backdrop-blur-sm shadow-lg border-slate-200/50 hover:bg-white hover:shadow-xl transition-all duration-300"
        >
          <Settings className="w-4 h-4 ml-2" />
          لوحة التحكم
        </Button>
      </div>

      <HeroSection onBookNow={handleBookNow} />
      
      {/* Professional Search Section */}
      <section className="py-20 relative bg-gradient-to-r from-slate-50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              بحث متقدم
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              ابحث عن السيارة المثالية
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              استخدم البحث المتقدم للعثور على السيارة التي تناسب احتياجاتك وميزانيتك بأفضل الأسعار
            </p>
          </div>
          
          {/* Professional Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 p-8">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Professional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center group">
              <div className="bg-white/70 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">15+</h3>
                <p className="text-slate-600">مدينة جورجية</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/70 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <Clock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">24/7</h3>
                <p className="text-slate-600">خدمة العملاء</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/70 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">4.9</h3>
                <p className="text-slate-600">تقييم العملاء</p>
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
