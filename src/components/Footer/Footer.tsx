
import React from 'react';
import { MapPin, Phone, Mail, Clock, Car } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white font-tajawal">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Car className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold">تأجير السيارات جورجيا</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              نحن شركة رائدة في تأجير السيارات مع السائق في جورجيا، نقدم خدمات متميزة لضمان رحلة مريحة وآمنة.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <span className="text-sm font-bold">w</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-yellow-400">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                'الرئيسية',
                'خدماتنا', 
                'أسطول السيارات',
                'الأسعار',
                'آراء العملاء',
                'اتصل بنا'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-yellow-400">خدماتنا</h4>
            <ul className="space-y-3">
              {[
                'تأجير سيارات مع سائق',
                'جولات سياحية',
                'نقل من وإلى المطار',
                'رحلات يومية',
                'برامج مخصصة',
                'خدمة VIP'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-yellow-400">معلومات التواصل</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">تبليسي، جورجيا</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300" dir="ltr">+995 551 234 567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">info@georgiacarrental.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">خدمة 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-right">
              © 2024 تأجير السيارات جورجيا. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
