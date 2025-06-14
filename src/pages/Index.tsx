
import React, { useState } from 'react';
import HeroSection from '../components/Hero/HeroSection';
import ServicesSection from '../components/Services/ServicesSection';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';
import Footer from '../components/Footer/Footer';
import BookingForm from '../components/BookingForm/BookingForm';

const Index = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleBackToHome = () => {
    setShowBookingForm(false);
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
      <HeroSection onBookNow={handleBookNow} />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
