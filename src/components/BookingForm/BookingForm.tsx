
import React, { useState } from 'react';
import { BookingData } from '../../types/booking';
import StepIndicator from './StepIndicator';
import Step1Location from './Step1Location';
import Step2CarSelection from './Step2CarSelection';
import Step3DriverPreferences from './Step3DriverPreferences';
import Step4PersonalInfo from './Step4PersonalInfo';
import PriceSummary from './PriceSummary';
import { cities, airports, carTypes, driverNationalities, tourTypes } from '../../data/georgia-data';
import { useToast } from '@/hooks/use-toast';

const BookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: '',
    tourType: '',
    driverNationality: '',
    driverLanguages: [],
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    passengers: 1,
    specialRequests: '',
    totalPrice: 0
  });

  const { toast } = useToast();

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const calculateFinalPrice = () => {
    if (!bookingData.carType || !bookingData.pickupLocation || !bookingData.dropoffLocation) {
      return 0;
    }

    const car = carTypes.find(c => c.id === bookingData.carType);
    if (!car) return 0;

    let basePrice = car.basePrice;

    // Calculate days
    const days = bookingData.pickupDate && bookingData.dropoffDate
      ? Math.max(1, Math.ceil((new Date(bookingData.dropoffDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
      : 1;

    // Location factors
    const allLocations = [...cities, ...airports];
    const pickupLocation = allLocations.find(l => l.id === bookingData.pickupLocation);
    const dropoffLocation = allLocations.find(l => l.id === bookingData.dropoffLocation);
    
    const locationFactor = Math.min(
      (pickupLocation?.factor || 1) + (dropoffLocation?.factor || 1), 
      2.5
    );

    // Driver nationality factor
    const driverNationality = driverNationalities.find(d => d.id === bookingData.driverNationality);
    const nationalityFactor = driverNationality?.factor || 1;

    // Tour type factor
    const tourType = tourTypes.find(t => t.id === bookingData.tourType);
    const tourFactor = tourType?.factor || 1;

    return Math.round(basePrice * days * locationFactor * nationalityFactor * tourFactor);
  };

  const generateWhatsAppMessage = () => {
    const allLocations = [...cities, ...airports];
    const pickupLocation = allLocations.find(l => l.id === bookingData.pickupLocation);
    const dropoffLocation = allLocations.find(l => l.id === bookingData.dropoffLocation);
    const car = carTypes.find(c => c.id === bookingData.carType);
    const driverNationality = driverNationalities.find(d => d.id === bookingData.driverNationality);
    const tourType = tourTypes.find(t => t.id === bookingData.tourType);

    const message = `🚗 *طلب حجز سيارة في جورجيا*

📍 *تفاصيل الرحلة:*
- من: ${pickupLocation?.name}
- إلى: ${dropoffLocation?.name}
- تاريخ الانطلاق: ${new Date(bookingData.pickupDate).toLocaleString('ar')}
- تاريخ العودة: ${new Date(bookingData.dropoffDate).toLocaleString('ar')}

🚙 *تفاصيل السيارة:*
- نوع السيارة: ${car?.name}
${tourType ? `- نوع الجولة: ${tourType.name}` : ''}

👨‍✈️ *تفضيلات السائق:*
- الجنسية: ${driverNationality?.name}
- اللغات: ${bookingData.driverLanguages.map(lang => {
  const language = ['georgian', 'english', 'russian', 'arabic', 'turkish'].find(l => l === lang);
  const langNames = {
    'georgian': 'الجورجية',
    'english': 'الإنجليزية', 
    'russian': 'الروسية',
    'arabic': 'العربية',
    'turkish': 'التركية'
  };
  return langNames[language as keyof typeof langNames] || lang;
}).join(', ')}

👤 *بيانات العميل:*
- الاسم: ${bookingData.customerName}
- الهاتف: ${bookingData.customerPhone}
- البريد الإلكتروني: ${bookingData.customerEmail}
- عدد الركاب: ${bookingData.passengers}
${bookingData.specialRequests ? `- طلبات خاصة: ${bookingData.specialRequests}` : ''}

💰 *السعر الإجمالي: $${calculateFinalPrice()}*

نرجو تأكيد الحجز وإرسال التفاصيل النهائية.`;

    return encodeURIComponent(message);
  };

  const handleSubmit = () => {
    const finalPrice = calculateFinalPrice();
    const updatedBookingData = { ...bookingData, totalPrice: finalPrice };
    setBookingData(updatedBookingData);

    // Generate WhatsApp URL
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappURL = `https://wa.me/+995551234567?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    toast({
      title: "تم إنشاء الحجز بنجاح!",
      description: "تم توجيهك إلى واتساب لإرسال تفاصيل الحجز",
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
