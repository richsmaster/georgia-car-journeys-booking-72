
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
  },
  booking: {
    cities: [
      { id: 'tbilisi', name: 'تبليسي', nameEn: 'Tbilisi', factor: 1.0, enabled: true, order: 1 },
      { id: 'batumi', name: 'باتومي', nameEn: 'Batumi', factor: 1.2, enabled: true, order: 2 },
      { id: 'kutaisi', name: 'كوتايسي', nameEn: 'Kutaisi', factor: 0.9, enabled: true, order: 3 },
      { id: 'mtskheta', name: 'متسخيتا', nameEn: 'Mtskheta', factor: 0.8, enabled: true, order: 4 },
      { id: 'gori', name: 'جوري', nameEn: 'Gori', factor: 0.7, enabled: true, order: 5 },
      { id: 'zugdidi', name: 'زوجديدي', nameEn: 'Zugdidi', factor: 0.8, enabled: true, order: 6 },
      { id: 'telavi', name: 'تيلافي', nameEn: 'Telavi', factor: 0.7, enabled: true, order: 7 },
      { id: 'akhalkalaki', name: 'أخالكالاكي', nameEn: 'Akhalkalaki', factor: 0.6, enabled: true, order: 8 },
    ],
    airports: [
      { id: 'tbilisi-airport', name: 'مطار تبليسي الدولي', nameEn: 'Tbilisi International Airport', city: 'tbilisi', factor: 1.3, enabled: true, order: 1 },
      { id: 'batumi-airport', name: 'مطار باتومي الدولي', nameEn: 'Batumi International Airport', city: 'batumi', factor: 1.4, enabled: true, order: 2 },
      { id: 'kutaisi-airport', name: 'مطار كوتايسي الدولي', nameEn: 'Kutaisi International Airport', city: 'kutaisi', factor: 1.2, enabled: true, order: 3 },
    ],
    carTypes: [
      {
        id: 'economy',
        name: 'اقتصادية',
        nameEn: 'Economy',
        basePrice: 50,
        features: ['تكييف', 'راديو', '4 مقاعد'],
        image: '🚗',
        enabled: true,
        order: 1
      },
      {
        id: 'comfort',
        name: 'مريحة',
        nameEn: 'Comfort',
        basePrice: 70,
        features: ['تكييف', 'راديو', 'GPS', '5 مقاعد'],
        image: '🚙',
        enabled: true,
        order: 2
      },
      {
        id: 'luxury',
        name: 'فاخرة',
        nameEn: 'Luxury',
        basePrice: 120,
        features: ['تكييف', 'راديو', 'GPS', 'جلد', '5 مقاعد فاخرة'],
        image: '🚗',
        enabled: true,
        order: 3
      },
      {
        id: 'suv',
        name: 'دفع رباعي',
        nameEn: 'SUV',
        basePrice: 100,
        features: ['دفع رباعي', 'تكييف', 'GPS', '7 مقاعد'],
        image: '🚙',
        enabled: true,
        order: 4
      },
      {
        id: 'minibus',
        name: 'ميني باص',
        nameEn: 'Minibus',
        basePrice: 150,
        features: ['تكييف', 'GPS', '14 مقعد', 'مساحة كبيرة'],
        image: '🚐',
        enabled: true,
        order: 5
      }
    ],
    driverNationalities: [
      { id: 'georgian', name: 'جورجي', factor: 1.0, enabled: true, order: 1 },
      { id: 'armenian', name: 'أرمني', factor: 1.1, enabled: true, order: 2 },
      { id: 'azerbaijani', name: 'أذربيجاني', factor: 1.1, enabled: true, order: 3 },
      { id: 'russian', name: 'روسي', factor: 1.2, enabled: true, order: 4 },
      { id: 'turkish', name: 'تركي', factor: 1.3, enabled: true, order: 5 },
    ],
    languages: [
      { id: 'georgian', name: 'الجورجية', enabled: true, order: 1 },
      { id: 'english', name: 'الإنجليزية', enabled: true, order: 2 },
      { id: 'russian', name: 'الروسية', enabled: true, order: 3 },
      { id: 'arabic', name: 'العربية', enabled: true, order: 4 },
      { id: 'turkish', name: 'التركية', enabled: true, order: 5 },
    ],
    tourTypes: [
      { id: 'city', name: 'جولة في المدينة', factor: 1.0, enabled: true, order: 1 },
      { id: 'mountain', name: 'جولة جبلية', factor: 1.5, enabled: true, order: 2 },
      { id: 'wine', name: 'جولة النبيذ', factor: 1.3, enabled: true, order: 3 },
      { id: 'historical', name: 'جولة تاريخية', factor: 1.2, enabled: true, order: 4 },
      { id: 'nature', name: 'جولة طبيعية', factor: 1.4, enabled: true, order: 5 },
      { id: 'beach', name: 'جولة شاطئية', factor: 1.1, enabled: true, order: 6 },
    ],
    settings: {
      id: '1',
      whatsappNumber: '+995551234567',
      confirmationMessage: 'شكراً لك! تم استلام طلب الحجز وسنتواصل معك قريباً.',
      currencySymbol: '$',
      defaultLanguage: 'ar',
      minBookingDays: 1,
      maxBookingDays: 30
    }
  }
};

// محاكاة قاعدة البيانات المحلية
let cmsData: CMSData = { ...defaultCMSData };

export const getCMSData = (): CMSData => {
  const stored = localStorage.getItem('cmsData');
  if (stored) {
    try {
      cmsData = JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored CMS data:', error);
      cmsData = { ...defaultCMSData };
    }
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
