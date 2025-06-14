
import React from 'react';
import { BookingData } from '../../types/booking';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User } from 'lucide-react';

interface Step4PersonalInfoProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onSubmit: () => void;
  onPrev: () => void;
}

const Step4PersonalInfo: React.FC<Step4PersonalInfoProps> = ({
  bookingData,
  updateBookingData,
  onSubmit,
  onPrev
}) => {
  const isFormValid = () => {
    return bookingData.customerName && 
           bookingData.customerPhone && 
           bookingData.customerEmail && 
           bookingData.passengers;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-blue-600 flex items-center justify-center gap-2">
          <User className="w-6 h-6" />
          البيانات الشخصية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
            <input
              type="text"
              value={bookingData.customerName}
              onChange={(e) => updateBookingData({ customerName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="أدخل اسمك الكامل"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
            <input
              type="tel"
              value={bookingData.customerPhone}
              onChange={(e) => updateBookingData({ customerPhone: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+995 XXX XXX XXX"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
            <input
              type="email"
              value={bookingData.customerEmail}
              onChange={(e) => updateBookingData({ customerEmail: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">عدد الركاب *</label>
            <input
              type="number"
              min="1"
              max="20"
              value={bookingData.passengers}
              onChange={(e) => updateBookingData({ passengers: parseInt(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">طلبات خاصة (اختياري)</label>
          <textarea
            value={bookingData.specialRequests}
            onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="أي طلبات خاصة أو ملاحظات..."
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            onClick={onPrev}
            variant="outline"
            className="px-8 py-2"
          >
            السابق
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={!isFormValid()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
          >
            إتمام الحجز
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4PersonalInfo;
