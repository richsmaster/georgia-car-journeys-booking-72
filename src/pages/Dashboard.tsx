
import React, { useState } from 'react';
import { useCMS } from '../hooks/useCMS';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Settings, Home, ArrowLeft, Save, RefreshCcw } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import BookingEditor from '../components/Dashboard/BookingEditor';

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
                لوحة التحكم
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">الصفحة الرئيسية</TabsTrigger>
            <TabsTrigger value="services">الخدمات</TabsTrigger>
            <TabsTrigger value="testimonials">آراء العملاء</TabsTrigger>
            <TabsTrigger value="footer">تذييل الصفحة</TabsTrigger>
            <TabsTrigger value="booking">إعدادات الحجز</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <HeroEditor data={data.hero} onSave={(newData) => handleSave('hero', newData)} />
          </TabsContent>

          {/* Services Section */}
          <TabsContent value="services">
            <ServicesEditor data={data.services} onSave={(newData) => handleSave('services', newData)} />
          </TabsContent>

          {/* Testimonials Section */}
          <TabsContent value="testimonials">
            <TestimonialsEditor data={data.testimonials} onSave={(newData) => handleSave('testimonials', newData)} />
          </TabsContent>

          {/* Footer Section */}
          <TabsContent value="footer">
            <FooterEditor data={data.footer} onSave={(newData) => handleSave('footer', newData)} />
          </TabsContent>

          {/* Booking Section */}
          <TabsContent value="booking">
            <BookingEditor data={data.booking} onSave={(newData) => handleSave('booking', newData)} />
          </TabsContent>

          {/* Settings Section */}
          <TabsContent value="settings">
            <SettingsEditor data={data.settings} onSave={(newData) => handleSave('settings', newData)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Hero Editor Component
const HeroEditor = ({ data, onSave }: { data: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحرير القسم الرئيسي</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">العنوان الأول</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">العنوان الثاني</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryButton">نص الزر الأساسي</Label>
              <Input
                id="primaryButton"
                value={formData.primaryButtonText}
                onChange={(e) => setFormData({...formData, primaryButtonText: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="secondaryButton">نص الزر الثانوي</Label>
              <Input
                id="secondaryButton"
                value={formData.secondaryButtonText}
                onChange={(e) => setFormData({...formData, secondaryButtonText: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">الإحصائيات</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>عدد العملاء</Label>
                <Input
                  value={formData.statistics.customers.value}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      customers: { ...formData.statistics.customers, value: e.target.value }
                    }
                  })}
                />
                <Input
                  className="mt-2"
                  placeholder="تسمية"
                  value={formData.statistics.customers.label}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      customers: { ...formData.statistics.customers, label: e.target.value }
                    }
                  })}
                />
              </div>
              <div>
                <Label>عدد المدن</Label>
                <Input
                  value={formData.statistics.cities.value}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      cities: { ...formData.statistics.cities, value: e.target.value }
                    }
                  })}
                />
                <Input
                  className="mt-2"
                  placeholder="تسمية"
                  value={formData.statistics.cities.label}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      cities: { ...formData.statistics.cities, label: e.target.value }
                    }
                  })}
                />
              </div>
              <div>
                <Label>سنوات الخبرة</Label>
                <Input
                  value={formData.statistics.experience.value}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      experience: { ...formData.statistics.experience, value: e.target.value }
                    }
                  })}
                />
                <Input
                  className="mt-2"
                  placeholder="تسمية"
                  value={formData.statistics.experience.label}
                  onChange={(e) => setFormData({
                    ...formData,
                    statistics: {
                      ...formData.statistics,
                      experience: { ...formData.statistics.experience, label: e.target.value }
                    }
                  })}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Services Editor Component
const ServicesEditor = ({ data, onSave }: { data: any[]; onSave: (data: any[]) => void }) => {
  const [services, setServices] = useState(data);

  const updateService = (index: number, field: string, value: any) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(services);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحرير الخدمات</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {services.map((service, index) => (
            <div key={service.id} className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium">خدمة {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>الأيقونة (Emoji)</Label>
                  <Input
                    value={service.icon}
                    onChange={(e) => updateService(index, 'icon', e.target.value)}
                  />
                </div>
                <div>
                  <Label>العنوان</Label>
                  <Input
                    value={service.title}
                    onChange={(e) => updateService(index, 'title', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>الوصف</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label>المميزات (مفصولة بفواصل)</Label>
                <Input
                  value={service.features.join(', ')}
                  onChange={(e) => updateService(index, 'features', e.target.value.split(', '))}
                />
              </div>
            </div>
          ))}
          
          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Testimonials Editor Component
const TestimonialsEditor = ({ data, onSave }: { data: any[]; onSave: (data: any[]) => void }) => {
  const [testimonials, setTestimonials] = useState(data);

  const updateTestimonial = (index: number, field: string, value: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(testimonials);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحرير آراء العملاء</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium">رأي العميل {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>الاسم</Label>
                  <Input
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label>البلد</Label>
                  <Input
                    value={testimonial.country}
                    onChange={(e) => updateTestimonial(index, 'country', e.target.value)}
                  />
                </div>
                <div>
                  <Label>نوع الرحلة</Label>
                  <Input
                    value={testimonial.trip}
                    onChange={(e) => updateTestimonial(index, 'trip', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>نص الرأي</Label>
                <Textarea
                  value={testimonial.text}
                  onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
          
          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Footer Editor Component
const FooterEditor = ({ data, onSave }: { data: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحرير تذييل الصفحة</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>اسم الشركة</Label>
            <Input
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
          
          <div>
            <Label>وصف الشركة</Label>
            <Textarea
              value={formData.companyDescription}
              onChange={(e) => setFormData({...formData, companyDescription: e.target.value})}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">معلومات التواصل</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>العنوان</Label>
                <Input
                  value={formData.contactInfo.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, address: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label>رقم الهاتف</Label>
                <Input
                  value={formData.contactInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, phone: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label>البريد الإلكتروني</Label>
                <Input
                  value={formData.contactInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, email: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label>ساعات العمل</Label>
                <Input
                  value={formData.contactInfo.hours}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, hours: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div>
            <Label>الروابط السريعة (مفصولة بفواصل)</Label>
            <Input
              value={formData.quickLinks.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                quickLinks: e.target.value.split(', ')
              })}
            />
          </div>

          <div>
            <Label>الخدمات (مفصولة بفواصل)</Label>
            <Input
              value={formData.services.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                services: e.target.value.split(', ')
              })}
            />
          </div>

          <div>
            <Label>نص حقوق النشر</Label>
            <Input
              value={formData.copyright}
              onChange={(e) => setFormData({...formData, copyright: e.target.value})}
            />
          </div>

          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Settings Editor Component
const SettingsEditor = ({ data, onSave }: { data: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات الموقع</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>اسم الموقع</Label>
            <Input
              value={formData.siteName}
              onChange={(e) => setFormData({...formData, siteName: e.target.value})}
            />
          </div>
          
          <div>
            <Label>وصف الموقع</Label>
            <Textarea
              value={formData.siteDescription}
              onChange={(e) => setFormData({...formData, siteDescription: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>اللون الأساسي</Label>
              <Input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
              />
            </div>
            <div>
              <Label>اللون الثانوي</Label>
              <Input
                type="color"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
              />
            </div>
            <div>
              <Label>لون التمييز</Label>
              <Input
                type="color"
                value={formData.accentColor}
                onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
