
import { CMSData } from '../types/cms';

export const defaultCMSData: CMSData = {
  hero: {
    id: '1',
    title: 'استكشف',
    subtitle: 'جورجيا بأناقة',
    description: 'احجز سيارتك المثالية مع سائق محترف واستمتع برحلة لا تُنسى في أجمل مدن جورجيا',
    primaryButtonText: 'احجز الآن',
    secondaryButtonText: 'اعرف المزيد',
    statistics: {
      customers: { value: '500+', label: 'عميل راضٍ' },
      cities: { value: '50+', label: 'مدينة جورجية' },
      experience: { value: '5', label: 'سنوات خبرة' }
    }
  },
  services: [
    {
      id: '1',
      icon: '🚗',
      title: 'أسطول متنوع',
      description: 'سيارات حديثة ومريحة تناسب جميع احتياجاتك من السيدان إلى الفان الفاخرة',
      features: ['سيارات حديثة 2020+', 'صيانة دورية', 'تأمين شامل', 'GPS متقدم'],
      order: 1
    },
    {
      id: '2',
      icon: '👥',
      title: 'سائقون محترفون',
      description: 'فريق من السائقين المحترفين الذين يعرفون جورجيا كظهر اليد',
      features: ['خبرة +5 سنوات', 'يتحدثون العربية', 'معرفة بالمعالم', 'أمان تام'],
      order: 2
    },
    {
      id: '3',
      icon: '📍',
      title: 'جولات مخصصة',
      description: 'برامج سياحية مصممة خصيصاً لتستكشف أجمل ما في جورجيا',
      features: ['برامج مرنة', 'معالم سياحية', 'مطاعم مميزة', 'تجارب محلية'],
      order: 3
    },
    {
      id: '4',
      icon: '🕐',
      title: 'خدمة 24/7',
      description: 'دعم مستمر ومتاح على مدار الساعة لضمان راحتك',
      features: ['دعم فوري', 'طوارئ 24/7', 'تتبع الرحلة', 'مساعدة فورية'],
      order: 4
    },
    {
      id: '5',
      icon: '🛡️',
      title: 'أمان وثقة',
      description: 'تأمين شامل وضمانات للحفاظ على سلامتك وراحة بالك',
      features: ['تأمين شامل', 'رخص سارية', 'فحص دوري', 'أمان معتمد'],
      order: 5
    },
    {
      id: '6',
      icon: '⭐',
      title: 'تجربة مميزة',
      description: 'نهدف لتقديم أفضل تجربة سفر لا تُنسى في جورجيا',
      features: ['خدمة VIP', 'راحة فائقة', 'ذكريات جميلة', 'تقييم 5 نجوم'],
      order: 6
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'أحمد محمد',
      country: 'السعودية',
      rating: 5,
      text: 'تجربة رائعة! السائق كان محترف جداً ويعرف أفضل الأماكن في جورجيا. السيارة كانت نظيفة ومريحة. أنصح بهذه الخدمة بشدة!',
      trip: 'رحلة إلى تبليسي وباتومي',
      order: 1
    },
    {
      id: '2',
      name: 'فاطمة العلي',
      country: 'الإمارات',
      rating: 5,
      text: 'خدمة ممتازة من البداية للنهاية. الحجز كان سهل والسائق وصل في الموعد بالضبط. قضيت وقت رائع في استكشاف جورجيا!',
      trip: 'جولة في كازبيجي',
      order: 2
    },
    {
      id: '3',
      name: 'خالد إبراهيم',
      country: 'مصر',
      rating: 5,
      text: 'أفضل شركة تأجير سيارات جربتها في جورجيا. السائق يتحدث العربية بطلاقة وساعدنا كثيراً في التنقل والتسوق.',
      trip: 'رحلة عائلية لمدة أسبوع',
      order: 3
    },
    {
      id: '4',
      name: 'نورا الحمادي',
      country: 'الكويت',
      rating: 5,
      text: 'تجربة مذهلة! السيارة كانت جديدة والسائق كان ودود ومتعاون. شاهدت أجمل المناظر في جورجيا بفضل هذه الخدمة الرائعة.',
      trip: 'جولة في سفانيتي',
      order: 4
    },
    {
      id: '5',
      name: 'يوسف المنصوري',
      country: 'قطر',
      rating: 5,
      text: 'خدمة احترافية جداً! كل شيء كان منظم ومرتب. السائق كان دليل سياحي ممتاز وأخذنا لأماكن لم نكن نعرفها من قبل.',
      trip: 'رحلة استكشافية',
      order: 5
    },
    {
      id: '6',
      name: 'ريم الشمري',
      country: 'البحرين',
      rating: 5,
      text: 'لا أستطيع أن أكون أكثر سعادة بهذه الخدمة! كل التفاصيل كانت مثالية. بالتأكيد سأحجز معهم مرة أخرى في زيارتي القادمة.',
      trip: 'رحلة شهر العسل',
      order: 6
    }
  ],
  footer: {
    id: '1',
    companyName: 'تأجير السيارات جورجيا',
    companyDescription: 'نحن شركة رائدة في تأجير السيارات مع السائق في جورجيا، نقدم خدمات متميزة لضمان رحلة مريحة وآمنة.',
    contactInfo: {
      address: 'تبليسي، جورجيا',
      phone: '+995 551 234 567',
      email: 'info@georgiacarrental.com',
      hours: 'خدمة 24/7'
    },
    quickLinks: ['الرئيسية', 'خدماتنا', 'أسطول السيارات', 'الأسعار', 'آراء العملاء', 'اتصل بنا'],
    services: ['تأجير سيارات مع سائق', 'جولات سياحية', 'نقل من وإلى المطار', 'رحلات يومية', 'برامج مخصصة', 'خدمة VIP'],
    copyright: '© 2024 تأجير السيارات جورجيا. جميع الحقوق محفوظة.'
  },
  settings: {
    id: '1',
    siteName: 'حجز السيارات في جورجيا',
    siteDescription: 'احجز سيارتك المثالية لرحلة مميزة في جورجيا - خدمة حجز السيارات مع السائق',
    primaryColor: '#1e40af',
    secondaryColor: '#fbbf24',
    accentColor: '#10b981',
    fontFamily: 'Tajawal'
  }
};

// محاكاة قاعدة البيانات المحلية
let cmsData: CMSData = { ...defaultCMSData };

export const getCMSData = (): CMSData => {
  const stored = localStorage.getItem('cmsData');
  if (stored) {
    cmsData = JSON.parse(stored);
  }
  return cmsData;
};

export const updateCMSData = (newData: Partial<CMSData>): void => {
  cmsData = { ...cmsData, ...newData };
  localStorage.setItem('cmsData', JSON.stringify(cmsData));
};

export const resetCMSData = (): void => {
  cmsData = { ...defaultCMSData };
  localStorage.setItem('cmsData', JSON.stringify(cmsData));
};
