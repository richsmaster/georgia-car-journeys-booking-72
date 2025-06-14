
import React from 'react';
import { Button } from '../ui/button';
import { Car, Star, Award, Clock } from 'lucide-react';

interface HeroSectionProps {
  onBookNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBookNow }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden font-tajawal">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content */}
          <div className="text-center lg:text-right space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="font-dancing text-yellow-400">استكشف</span>
                <br />
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  جورجيا بأناقة
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                احجز سيارتك المثالية مع سائق محترف واستمتع برحلة لا تُنسى في أجمل مدن جورجيا
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <Car className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">أسطول متنوع</h3>
                <p className="text-blue-200 text-sm">سيارات حديثة ومريحة</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">سائقون محترفون</h3>
                <p className="text-blue-200 text-sm">خبرة واسعة في الطرق الجورجية</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">خدمة 24/7</h3>
                <p className="text-blue-200 text-sm">دعم مستمر طوال رحلتك</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 lg:space-y-0 lg:space-x-4 lg:flex lg:flex-row-reverse">
              <Button 
                onClick={onBookNow}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105"
              >
                احجز الآن
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl rounded-full backdrop-blur-lg transition-all duration-300"
              >
                اعرف المزيد
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">500+</div>
                <div className="text-blue-200">عميل راضٍ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">50+</div>
                <div className="text-blue-200">مدينة جورجية</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">5</div>
                <div className="text-blue-200">سنوات خبرة</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-slide-up">
            <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="text-6xl mb-6">🚗</div>
                <h3 className="text-2xl font-bold text-white mb-4">رحلتك تبدأ هنا</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <span className="text-blue-200">من تبليسي إلى باتومي</span>
                    <span className="text-yellow-400 font-bold">$80</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <span className="text-blue-200">جولة في كازبيجي</span>
                    <span className="text-yellow-400 font-bold">$120</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                    <span className="text-blue-200">رحلة إلى سفانيتي</span>
                    <span className="text-yellow-400 font-bold">$200</span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 pt-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-white mr-2">4.9 من 5</span>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
