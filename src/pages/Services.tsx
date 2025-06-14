
import React from 'react';
import MainNavigation from '../components/Navigation/MainNavigation';
import Footer from '../components/Footer/Footer';
import { Car, Users, MapPin, Plane, Route } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      icon: Car,
      title: 'تأجير السيارات',
      description: 'احجز من مجموعة واسعة من السيارات الحديثة والمريحة',
      features: ['سيارات حديثة ومعتمدة', 'أسعار تنافسية', 'تأمين شامل', 'صيانة دورية'],
      price: 'من 50 لاري/اليوم',
      href: '/services/car-rental'
    },
    {
      icon: Users,
      title: 'السائق مع السيارة',
      description: 'استمتع برحلتك مع سائق محترف يعرف جميع المعالم السياحية',
      features: ['سائقون محترفون', 'معرفة بالمعالم السياحية', 'خدمة 24/7', 'أمان تام'],
      price: 'من 120 لاري/اليوم',
      href: '/services/with-driver'
    },
    {
      icon: MapPin,
      title: 'الجولات السياحية',
      description: 'اكتشف جمال جورجيا مع جولاتنا السياحية المنظمة',
      features: ['برامج سياحية متنوعة', 'دليل سياحي مختص', 'وجبات مشمولة', 'مواقع أثرية وتاريخية'],
      price: 'من 80 لاري/الشخص',
      href: '/services/tours'
    },
    {
      icon: Plane,
      title: 'خدمة المطار',
      description: 'نقل مريح وآمن من وإلى المطار في أي وقت',
      features: ['استقبال في المطار', 'نقل مباشر', 'خدمة على مدار الساعة', 'سيارات مكيفة'],
      price: 'من 30 لاري/الرحلة',
      href: '/services/airport'
    },
    {
      icon: Route,
      title: 'الرحلات الطويلة',
      description: 'رحلات مريحة بين المدن الجورجية والدول المجاورة',
      features: ['سيارات مريحة للرحلات الطويلة', 'استراحات منتظمة', 'خدمة الطعام', 'مرافق للأطفال'],
      price: 'من 200 لاري/الرحلة',
      href: '/services/long-trips'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">خدماتنا المتميزة</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              نقدم مجموعة شاملة من خدمات النقل والسياحة في جورجيا لضمان رحلة مميزة وآمنة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg ml-4">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                      <p className="text-blue-600 font-semibold">{service.price}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">المميزات:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.location.href = service.href}
                  >
                    احجز الآن
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">هل تحتاج خدمة مخصصة؟</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            تواصل معنا لتصميم برنامج سياحي يناسب احتياجاتك الخاصة
          </p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            تواصل معنا
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
