
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

export interface CMSData {
  hero: HeroContent;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  footer: FooterContent;
  settings: SiteSettings;
}
