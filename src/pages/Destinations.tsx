
import React from 'react';
import MainNavigation from '../components/Navigation/MainNavigation';
import Footer from '../components/Footer/Footer';
import { MapPin, Clock, Star, Camera } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const Destinations = () => {
  const destinations = [
    {
      id: 'tbilisi',
      name: 'تبليسي',
      nameEn: 'Tbilisi',
      description: 'العاصمة الجميلة التي تجمع بين التاريخ العريق والحداثة المعاصرة',
      image: '/placeholder.svg',
      highlights: ['البلدة القديمة', 'قلعة ناريكالا', 'الحمامات الكبريتية', 'شارع روستافيلي'],
      duration: '2-3 أيام',
      distance: '0 كم من المطار',
      rating: 4.8,
      price: 'من 80 لاري/اليوم',
      href: '/destinations/tbilisi'
    },
    {
      id: 'batumi',
      name: 'باتومي',
      nameEn: 'Batumi',
      description: 'مدينة البحر الأسود الساحرة مع شواطئها الذهبية ومعمارها المميز',
      image: '/placeholder.svg',
      highlights: ['الشاطئ الذهبي', 'برج الأبجدية', 'الحديقة النباتية', 'البلفار'],
      duration: '2-4 أيام',
      distance: '380 كم من تبليسي',
      rating: 4.7,
      price: 'من 100 لاري/اليوم',
      href: '/destinations/batumi'
    },
    {
      id: 'kazbegi',
      name: 'كازبيجي',
      nameEn: 'Kazbegi',
      description: 'منطقة جبلية خلابة مع قمم مغطاة بالثلوج وطبيعة بكر',
      image: '/placeholder.svg',
      highlights: ['كنيسة الثالوث المقدس', 'جبل كازبيك', 'نهر تيريكي', 'قرية ستيبانتسميندا'],
      duration: '1-2 أيام',
      distance: '160 كم من تبليسي',
      rating: 4.9,
      price: 'من 120 لاري/اليوم',
      href: '/destinations/kazbegi'
    },
    {
      id: 'svaneti',
      name: 'سفانيتي',
      nameEn: 'Svaneti',
      description: 'منطقة جبلية نائية مع أبراج سفانية تاريخية وطبيعة ساحرة',
      image: '/placeholder.svg',
      highlights: ['أبراج سفانية', 'قرية أوشغولي', 'جبل شخارا', 'متحف سفانيتي'],
      duration: '3-5 أيام',
      distance: '450 كم من تبليسي',
      rating: 4.9,
      price: 'من 150 لاري/اليوم',
      href: '/destinations/svaneti'
    },
    {
      id: 'kutaisi',
      name: 'كوتايسي',
      nameEn: 'Kutaisi',
      description: 'مدينة تاريخية عريقة وبوابة إلى الكهوف والمناظر الطبيعية الخلابة',
      image: '/placeholder.svg',
      highlights: ['كهف بروميثيوس', 'دير جيلاتي', 'كهف ساتابليا', 'نافورة كولخيس'],
      duration: '2-3 أيام',
      distance: '230 كم من تبليسي',
      rating: 4.6,
      price: 'من 90 لاري/اليوم',
      href: '/destinations/kutaisi'
    },
    {
      id: 'gori',
      name: 'جوري',
      nameEn: 'Gori',
      description: 'مدينة تاريخية مهمة مع قلعة أثرية ومتاحف مثيرة للاهتمام',
      image: '/placeholder.svg',
      highlights: ['قلعة جوري', 'متحف ستالين', 'مدينة أوبليستسيخي الصخرية', 'كنيسة أتينيس سيوني'],
      duration: '1-2 أيام',
      distance: '80 كم من تبليسي',
      rating: 4.5,
      price: 'من 70 لاري/اليوم',
      href: '/destinations/gori'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">اكتشف جمال جورجيا</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              رحلة عبر أجمل المدن والمناطق الطبيعية في جورجيا مع دليلك الشامل للوجهات السياحية المميزة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.nameEn}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                      <Star className="inline w-4 h-4 ml-1" />
                      {destination.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-600 mb-4 leading-relaxed">{destination.description}</p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-slate-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 ml-1" />
                      {destination.duration}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 ml-1" />
                      {destination.distance}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                      <Camera className="w-4 h-4 ml-2" />
                      أهم المعالم:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 2).map((highlight, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 2 && (
                        <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded-full text-xs">
                          +{destination.highlights.length - 2} أكثر
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">{destination.price}</span>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.location.href = destination.href}
                    >
                      اكتشف المزيد
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">جاهز لاستكشاف جورجيا؟</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            احجز رحلتك الآن واستمتع بأجمل الوجهات السياحية مع خدماتنا المتميزة
          </p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            احجز رحلتك الآن
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
