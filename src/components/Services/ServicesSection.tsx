
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { MapPin, Clock, Shield, Star, Users, Car } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Car className="w-12 h-12 text-blue-600" />,
      title: "أسطول متنوع",
      description: "سيارات حديثة ومريحة تناسب جميع احتياجاتك من السيدان إلى الفان الفاخرة",
      features: ["سيارات حديثة 2020+", "صيانة دورية", "تأمين شامل", "GPS متقدم"]
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "سائقون محترفون",
      description: "فريق من السائقين المحترفين الذين يعرفون جورجيا كظهر اليد",
      features: ["خبرة +5 سنوات", "يتحدثون العربية", "معرفة بالمعالم", "أمان تام"]
    },
    {
      icon: <MapPin className="w-12 h-12 text-blue-600" />,
      title: "جولات مخصصة",
      description: "برامج سياحية مصممة خصيصاً لتستكشف أجمل ما في جورجيا",
      features: ["برامج مرنة", "معالم سياحية", "مطاعم مميزة", "تجارب محلية"]
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "خدمة 24/7",
      description: "دعم مستمر ومتاح على مدار الساعة لضمان راحتك",
      features: ["دعم فوري", "طوارئ 24/7", "تتبع الرحلة", "مساعدة فورية"]
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "أمان وثقة",
      description: "تأمين شامل وضمانات للحفاظ على سلامتك وراحة بالك",
      features: ["تأمين شامل", "رخص سارية", "فحص دوري", "أمان معتمد"]
    },
    {
      icon: <Star className="w-12 h-12 text-blue-600" />,
      title: "تجربة مميزة",
      description: "نهدف لتقديم أفضل تجربة سفر لا تُنسى في جورجيا",
      features: ["خدمة VIP", "راحة فائقة", "ذكريات جميلة", "تقييم 5 نجوم"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white font-tajawal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="font-dancing text-blue-600">خدماتنا</span> المميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم لك أفضل خدمات تأجير السيارات في جورجيا مع سائقين محترفين وتجربة لا تُنسى
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-400 rounded-full ml-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
