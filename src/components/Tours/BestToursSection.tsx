
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MapPin, Camera, Mountain, TreePine, Waves } from 'lucide-react';
import { motion } from 'framer-motion';

const BestToursSection: React.FC = () => {
  const tours = [
    { name: 'جولة في باتومي', icon: Waves },
    { name: 'جولة في شلالات باتومي', icon: Mountain },
    { name: 'جولة على الحدود التركية', icon: MapPin },
    { name: 'جولة على حديقة النباتات في باتومي', icon: TreePine },
    { name: 'جولة الى وادي كانيون في كوتايسي', icon: Camera }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            أفضل الجولات السياحية
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            اكتشف أجمل الأماكن في جورجيا مع جولاتنا المميزة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border border-slate-200/50 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tour.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-slate-900">
                    {tour.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 text-sm">
                    استمتع بتجربة لا تُنسى في هذه الجولة المميزة
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestToursSection;
