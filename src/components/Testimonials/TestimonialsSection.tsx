
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Star, Quote } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

const TestimonialsSection: React.FC = () => {
  const { data } = useCMS();
  const testimonials = data.testimonials.sort((a, b) => a.order - b.order);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            ماذا يقول <span className="font-dancing text-blue-600">عملاؤنا</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            آراء حقيقية من عملائنا الكرام الذين استمتعوا برحلاتهم المميزة في جورجيا
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-200" />
                
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-center mb-6 italic">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="border-t pt-6 text-center">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-2">
                    {testimonial.country}
                  </p>
                  <p className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                    {testimonial.trip}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 inline-block shadow-xl">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.9</div>
                <div className="flex justify-center mb-2">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-gray-600">متوسط التقييم</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">عميل سعيد</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">نسبة الرضا</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
