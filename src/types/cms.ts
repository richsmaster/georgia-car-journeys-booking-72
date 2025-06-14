
export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  statistics: {
    customers: { value: string; label: string; };
    cities: { value: string; label: string; };
    experience: { value: string; label: string; };
  };
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  order: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  trip: string;
  order: number;
}

export interface FooterContent {
  id: string;
  companyName: string;
  companyDescription: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  quickLinks: string[];
  services: string[];
  copyright: string;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

// New booking-related interfaces
export interface City {
  id: string;
  name: string;
  nameEn: string;
  factor: number;
  enabled: boolean;
  order: number;
}

export interface Airport {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  factor: number;
  enabled: boolean;
  order: number;
}

export interface CarType {
  id: string;
  name: string;
  nameEn: string;
  basePrice: number;
  features: string[];
  image: string;
  enabled: boolean;
  order: number;
  rating?: number;
  reviews?: number;
}

export interface DriverNationality {
  id: string;
  name: string;
  factor: number;
  enabled: boolean;
  order: number;
}

export interface Language {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export interface TourType {
  id: string;
  name: string;
  factor: number;
  enabled: boolean;
  order: number;
}

export interface BookingSettings {
  id: string;
  whatsappNumber: string;
  confirmationMessage: string;
  currencySymbol: string;
  defaultLanguage: string;
  minBookingDays: number;
  maxBookingDays: number;
}

export interface BookingData {
  cities: City[];
  airports: Airport[];
  carTypes: CarType[];
  driverNationalities: DriverNationality[];
  languages: Language[];
  tourTypes: TourType[];
  settings: BookingSettings;
}

export interface CMSData {
  hero: HeroContent;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  footer: FooterContent;
  settings: SiteSettings;
  booking: BookingData;
}
