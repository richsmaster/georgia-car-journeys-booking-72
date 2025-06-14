
export const cities = [
  { id: 'tbilisi', name: 'تبليسي', nameEn: 'Tbilisi', factor: 1.0 },
  { id: 'batumi', name: 'باتومي', nameEn: 'Batumi', factor: 1.2 },
  { id: 'kutaisi', name: 'كوتايسي', nameEn: 'Kutaisi', factor: 0.9 },
  { id: 'mtskheta', name: 'متسخيتا', nameEn: 'Mtskheta', factor: 0.8 },
  { id: 'gori', name: 'جوري', nameEn: 'Gori', factor: 0.7 },
  { id: 'zugdidi', name: 'زوجديدي', nameEn: 'Zugdidi', factor: 0.8 },
  { id: 'telavi', name: 'تيلافي', nameEn: 'Telavi', factor: 0.7 },
  { id: 'akhalkalaki', name: 'أخالكالاكي', nameEn: 'Akhalkalaki', factor: 0.6 },
];

export const airports = [
  { id: 'tbilisi-airport', name: 'مطار تبليسي الدولي', nameEn: 'Tbilisi International Airport', city: 'tbilisi', factor: 1.3 },
  { id: 'batumi-airport', name: 'مطار باتومي الدولي', nameEn: 'Batumi International Airport', city: 'batumi', factor: 1.4 },
  { id: 'kutaisi-airport', name: 'مطار كوتايسي الدولي', nameEn: 'Kutaisi International Airport', city: 'kutaisi', factor: 1.2 },
];

export const carTypes = [
  {
    id: 'economy',
    name: 'اقتصادية',
    nameEn: 'Economy',
    basePrice: 50,
    features: ['تكييف', 'راديو', '4 مقاعد'],
    image: '🚗'
  },
  {
    id: 'comfort',
    name: 'مريحة',
    nameEn: 'Comfort',
    basePrice: 70,
    features: ['تكييف', 'راديو', 'GPS', '5 مقاعد'],
    image: '🚙'
  },
  {
    id: 'luxury',
    name: 'فاخرة',
    nameEn: 'Luxury',
    basePrice: 120,
    features: ['تكييف', 'راديو', 'GPS', 'جلد', '5 مقاعد فاخرة'],
    image: '🚗'
  },
  {
    id: 'suv',
    name: 'دفع رباعي',
    nameEn: 'SUV',
    basePrice: 100,
    features: ['دفع رباعي', 'تكييف', 'GPS', '7 مقاعد'],
    image: '🚙'
  },
  {
    id: 'minibus',
    name: 'ميني باص',
    nameEn: 'Minibus',
    basePrice: 150,
    features: ['تكييف', 'GPS', '14 مقعد', 'مساحة كبيرة'],
    image: '🚐'
  }
];

export const driverNationalities = [
  { id: 'georgian', name: 'جورجي', factor: 1.0 },
  { id: 'armenian', name: 'أرمني', factor: 1.1 },
  { id: 'azerbaijani', name: 'أذربيجاني', factor: 1.1 },
  { id: 'russian', name: 'روسي', factor: 1.2 },
  { id: 'turkish', name: 'تركي', factor: 1.3 },
];

export const languages = [
  { id: 'georgian', name: 'الجورجية' },
  { id: 'english', name: 'الإنجليزية' },
  { id: 'russian', name: 'الروسية' },
  { id: 'arabic', name: 'العربية' },
  { id: 'turkish', name: 'التركية' },
];

export const tourTypes = [
  { id: 'city', name: 'جولة في المدينة', factor: 1.0 },
  { id: 'mountain', name: 'جولة جبلية', factor: 1.5 },
  { id: 'wine', name: 'جولة النبيذ', factor: 1.3 },
  { id: 'historical', name: 'جولة تاريخية', factor: 1.2 },
  { id: 'nature', name: 'جولة طبيعية', factor: 1.4 },
  { id: 'beach', name: 'جولة شاطئية', factor: 1.1 },
];
