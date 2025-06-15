
import React from 'react';
import { Button } from '../ui/button';
import { Car, Star, Award, Clock, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onBookNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBookNow }) => {
  const { data } = useCMS();
  const heroData = data.hero;

  const scrollToSearch = () => {
    const searchSection = document.querySelector('#search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      
      {/* Subtle Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right space-y-8"
          >
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm text-blue-100 px-6 py-3 rounded-full text-sm font-medium border border-blue-400/20"
              >
                <Star className="w-4 h-4 text-yellow-400" />
                الأفضل في جورجيا
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500">
                  {heroData.title}
                </span>
                <br />
                <span className="text-white">
                  {heroData.subtitle}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                {heroData.description}
              </motion.p>
            </div>

            {/* Professional Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="group bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Car className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">أسطول متنوع</h3>
                <p className="text-slate-400 text-sm">سيارات حديثة ومريحة</p>
              </div>
              <div className="group bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Award className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">سائقون محترفون</h3>
                <p className="text-slate-400 text-sm">خبرة واسعة في الطرق الجورجية</p>
              </div>
              <div className="group bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Clock className="w-10 h-10 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">خدمة 24/7</h3>
                <p className="text-slate-400 text-sm">دعم مستمر طوال رحلتك</p>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                onClick={onBookNow}
                size="lg"
                className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="mr-2">{heroData.primaryButtonText}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                onClick={scrollToSearch}
                variant="outline"
                size="lg"
                className="border-2 border-slate-300/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-lg backdrop-blur-lg transition-all duration-300 hover:border-white/50"
              >
                <Sparkles className="w-5 h-5 ml-2" />
                البحث المتقدم
              </Button>
            </motion.div>

            {/* Professional Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">
                  {heroData.statistics.customers.value}
                </div>
                <div className="text-slate-400 text-sm">{heroData.statistics.customers.label}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
                  {heroData.statistics.cities.value}
                </div>
                <div className="text-slate-400 text-sm">{heroData.statistics.cities.label}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
                  {heroData.statistics.experience.value}
                </div>
                <div className="text-slate-400 text-sm">{heroData.statistics.experience.label}</div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Visual Element - Without Prices */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">أفضل الرحلات</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">من تبليسي إلى باتومي</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">جولة في كازبيجي</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">رحلة إلى سفانيتي</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1 pt-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-white mr-3 font-medium">4.9 من 5</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
