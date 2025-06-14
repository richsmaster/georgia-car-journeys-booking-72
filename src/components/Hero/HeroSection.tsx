
import React from 'react';
import { Button } from '../ui/button';
import { Car, Star, Award, Clock, ArrowRight, MapPin, Users } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

interface HeroSectionProps {
  onBookNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBookNow }) => {
  const { data } = useCMS();
  const heroData = data.hero;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-32 animate-float delay-300">
        <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-32 right-20 animate-float delay-700">
        <div className="w-4 h-4 bg-blue-400 rounded-full opacity-50"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Enhanced Content */}
          <div className="text-center lg:text-right space-y-8 animate-slide-up">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-400/30">
                <Star className="w-4 h-4" />
                الأفضل في جورجيا
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-yellow-400 drop-shadow-lg">{heroData.title}</span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                  {heroData.subtitle}
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {heroData.description}
              </p>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <Car className="w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-white mb-2">أسطول متنوع</h3>
                <p className="text-blue-200 text-sm">سيارات حديثة ومريحة</p>
              </div>
              <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-white mb-2">سائقون محترفون</h3>
                <p className="text-blue-200 text-sm">خبرة واسعة في الطرق الجورجية</p>
              </div>
              <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-white mb-2">خدمة 24/7</h3>
                <p className="text-blue-200 text-sm">دعم مستمر طوال رحلتك</p>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="space-y-4 lg:space-y-0 lg:space-x-4 lg:flex lg:flex-row-reverse">
              <Button 
                onClick={onBookNow}
                size="lg"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="mr-2">{heroData.primaryButtonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl rounded-full backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:border-white/50"
              >
                {heroData.secondaryButtonText}
              </Button>
            </div>

            {/* Enhanced Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/20">
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {heroData.statistics.customers.value}
                </div>
                <div className="text-blue-200">{heroData.statistics.customers.label}</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {heroData.statistics.cities.value}
                </div>
                <div className="text-blue-200">{heroData.statistics.cities.label}</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {heroData.statistics.experience.value}
                </div>
                <div className="text-blue-200">{heroData.statistics.experience.label}</div>
              </div>
            </div>
          </div>

          {/* Enhanced Visual Element */}
          <div className="relative animate-slide-up delay-300">
            <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="text-center space-y-6">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">🚗</div>
                <h3 className="text-2xl font-bold text-white mb-4">رحلتك تبدأ هنا</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group/item">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">من تبليسي إلى باتومي</span>
                    </div>
                    <span className="text-yellow-400 font-bold group-hover/item:scale-110 transition-transform duration-300">$80</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group/item">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">جولة في كازبيجي</span>
                    </div>
                    <span className="text-yellow-400 font-bold group-hover/item:scale-110 transition-transform duration-300">$120</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group/item">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">رحلة إلى سفانيتي</span>
                    </div>
                    <span className="text-yellow-400 font-bold group-hover/item:scale-110 transition-transform duration-300">$200</span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 pt-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current hover:scale-125 transition-transform duration-200" />
                  ))}
                  <span className="text-white mr-2 font-semibold">4.9 من 5</span>
                </div>
              </div>
            </div>
            {/* Enhanced Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">انتقل للأسفل</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
