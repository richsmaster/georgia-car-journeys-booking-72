
import React, { useState } from 'react';
import { BookingData } from '../../types/booking';
import { useCMS } from '../../hooks/useCMS';
import StepIndicator from './StepIndicator';
import Step1Location from './Step1Location';
import Step2CarSelection from './Step2CarSelection';
import Step3DriverPreferences from './Step3DriverPreferences';
import Step4PersonalInfo from './Step4PersonalInfo';
import PriceSummary from './PriceSummary';
import { useToast } from '@/hooks/use-toast';
import { calculatePricing } from '../../lib/pricing';

const BookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: '',
    hasPhoneLine: false,
    hasTravelInsurance: false,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    passengers: 1,
    specialRequests: '',
    totalPrice: 0
  });

  const { data: cmsData } = useCMS();
  const { toast } = useToast();

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const generateWhatsAppMessage = () => {
    const allLocations = [...cmsData.booking.cities, ...cmsData.booking.airports];
    const pickupLocation = allLocations.find(l => l.id === bookingData.pickupLocation);
    const dropoffLocation = allLocations.find(l => l.id === bookingData.dropoffLocation);
    const car = cmsData.booking.carTypes.find(c => c.id === bookingData.carType);
    const pricing = calculatePricing(bookingData, cmsData);

    const message = `🚗 *طلب حجز سيارة في جورجيا*

📍 *تفاصيل الرحلة:*
- من: ${pickupLocation?.name}
- إلى: ${dropoffLocation?.name}
- تاريخ الانطلاق: ${new Date(bookingData.pickupDate).toLocaleString('ar')}
- تاريخ العودة: ${new Date(bookingData.dropoffDate).toLocaleString('ar')}
- المدة: ${pricing.totalDays} أيام

🚙 *تفاصيل السيارة:*
- نوع السيارة: ${car?.name}

🛡️ *الخدمات الإضافية:*
${bookingData.hasPhoneLine ? `- خط الاتصال: ${pricing.phoneLineCost} ${cmsData.booking.settings.currencySymbol}` : ''}
${bookingData.hasTravelInsurance ? `- تأمين السفر: ${pricing.insuranceCost} ${cmsData.booking.settings.currencySymbol}` : ''}

👤 *بيانات العميل:*
- الاسم: ${bookingData.customerName}
- الهاتف: ${bookingData.customerPhone}
- البريد الإلكتروني: ${bookingData.customerEmail}
- عدد الركاب: ${bookingData.passengers}
${bookingData.specialRequests ? `- طلبات خاصة: ${bookingData.specialRequests}` : ''}

💰 *السعر الإجمالي: ${cmsData.booking.settings.currencySymbol}${pricing.totalCost}*

نرجو تأكيد الحجز وإرسال التفاصيل النهائية.`;

    return encodeURIComponent(message);
  };

  const handleSubmit = () => {
    const pricing = calculatePricing(bookingData, cmsData);
    const updatedBookingData = { ...bookingData, totalPrice: pricing.totalCost };
    setBookingData(updatedBookingData);

    // Generate WhatsApp URL using CMS settings
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappURL = `https://wa.me/${cmsData.booking.settings.whatsappNumber.replace('+', '')}?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    toast({
      title: "تم إنشاء الحجز بنجاح!",
      description: cmsData.booking.settings.confirmationMessage,
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              حجز السيارات في جورجيا
            </h1>
            <p className="text-gray-600">احجز سيارتك المثالية لرحلة مميزة في جورجيا</p>
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={4} />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <Step1Location
                  bookingData={bookingData}
                  updateBookingData={updateBookingData}
                  onNext={nextStep}
                />
              )}
              
              {currentStep === 2 && (
                <Step2CarSelection
                  bookingData={bookingData}
                  updateBookingData={updateBookingData}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              
              {currentStep === 3 && (
                <Step3DriverPreferences
                  bookingData={bookingData}
                  updateBookingData={updateBookingData}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              
              {currentStep === 4 && (
                <Step4PersonalInfo
                  bookingData={bookingData}
                  updateBookingData={updateBookingData}
                  onSubmit={handleSubmit}
                  onPrev={prevStep}
                />
              )}
            </div>

            <div className="lg:col-span-1">
              <PriceSummary bookingData={bookingData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
