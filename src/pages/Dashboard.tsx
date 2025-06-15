
import React, { useState } from 'react';
import { useCMS } from '../hooks/useCMS';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Settings, ArrowLeft, RefreshCcw, Calculator } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedBookingEditor from '../components/Dashboard/EnhancedBookingEditor';
import HeroEditor from '../components/Dashboard/HeroEditor';
import ServicesEditor from '../components/Dashboard/ServicesEditor';
import TestimonialsEditor from '../components/Dashboard/TestimonialsEditor';
import FooterEditor from '../components/Dashboard/FooterEditor';
import SettingsEditor from '../components/Dashboard/SettingsEditor';
import PricingDashboard from '../components/Dashboard/PricingDashboard';

const Dashboard = () => {
  const { data, updateData, resetData, isLoading } = useCMS();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('hero');

  const handleSave = async (section: string, newData: any) => {
    try {
      await updateData({ [section]: newData });
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ التغييرات بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive",
      });
    }
  };

  const handleReset = async () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات؟')) {
      await resetData();
      toast({
        title: "تم إعادة التعيين",
        description: "تم إعادة تعيين جميع البيانات للوضع الافتراضي",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للموقع
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Settings className="w-6 h-6 ml-2" />
                لوحة التحكم المتقدمة
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                disabled={isLoading}
              >
                <RefreshCcw className="w-4 h-4 ml-2" />
                إعادة تعيين
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero">الصفحة الرئيسية</TabsTrigger>
            <TabsTrigger value="services">الخدمات</TabsTrigger>
            <TabsTrigger value="testimonials">آراء العملاء</TabsTrigger>
            <TabsTrigger value="footer">تذييل الصفحة</TabsTrigger>
            <TabsTrigger value="booking">إعدادات الحجز</TabsTrigger>
            <TabsTrigger value="pricing">إدارة الأسعار</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroEditor data={data.hero} onSave={(newData) => handleSave('hero', newData)} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesEditor data={data.services} onSave={(newData) => handleSave('services', newData)} />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsEditor data={data.testimonials} onSave={(newData) => handleSave('testimonials', newData)} />
          </TabsContent>

          <TabsContent value="footer">
            <FooterEditor data={data.footer} onSave={(newData) => handleSave('footer', newData)} />
          </TabsContent>

          <TabsContent value="booking">
            <EnhancedBookingEditor data={data.booking} onSave={(newData) => handleSave('booking', newData)} />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingDashboard />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsEditor data={data.settings} onSave={(newData) => handleSave('settings', newData)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
