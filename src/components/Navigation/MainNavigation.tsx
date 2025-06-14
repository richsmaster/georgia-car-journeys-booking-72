
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  Car, 
  MapPin, 
  Compass,
  Phone,
  User,
  Gift,
  Info,
  BookOpen,
  Smartphone,
  Menu,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainNavigationProps {
  className?: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    {
      title: 'الصفحة الرئيسية',
      href: '/',
      icon: Home,
    },
    {
      title: 'البحث والحجز',
      icon: Search,
      items: [
        { title: 'البحث عن السيارات', href: '/search' },
        { title: 'نتائج البحث', href: '/search-results' },
        { title: 'نموذج الحجز', href: '/booking' },
        { title: 'الحجوزات السريعة', href: '/quick-booking' },
      ]
    },
    {
      title: 'الخدمات',
      icon: Car,
      items: [
        { title: 'تأجير السيارات', href: '/services/car-rental' },
        { title: 'السائق مع السيارة', href: '/services/with-driver' },
        { title: 'الجولات السياحية', href: '/services/tours' },
        { title: 'خدمة المطار', href: '/services/airport' },
        { title: 'الرحلات الطويلة', href: '/services/long-trips' },
      ]
    },
    {
      title: 'وجهات جورجيا',
      icon: MapPin,
      items: [
        { title: 'تبليسي', href: '/destinations/tbilisi' },
        { title: 'باتومي', href: '/destinations/batumi' },
        { title: 'كازبيجي', href: '/destinations/kazbegi' },
        { title: 'سفانيتي', href: '/destinations/svaneti' },
        { title: 'كوتايسي', href: '/destinations/kutaisi' },
        { title: 'جوري', href: '/destinations/gori' },
      ]
    },
    {
      title: 'أسطول السيارات',
      icon: Compass,
      items: [
        { title: 'السيارات الاقتصادية', href: '/fleet/economy' },
        { title: 'السيارات المتوسطة', href: '/fleet/midsize' },
        { title: 'السيارات الفاخرة', href: '/fleet/luxury' },
        { title: 'السيارات الرياضية', href: '/fleet/sports' },
        { title: 'الحافلات الصغيرة', href: '/fleet/minibus' },
      ]
    },
    {
      title: 'دعم العملاء',
      icon: Phone,
      items: [
        { title: 'اتصل بنا', href: '/support/contact' },
        { title: 'الأسئلة الشائعة', href: '/support/faq' },
        { title: 'البحث عن حجز', href: '/support/find-booking' },
        { title: 'الشكاوى والاقتراحات', href: '/support/feedback' },
        { title: 'المساعدة الطارئة', href: '/support/emergency' },
      ]
    },
  ];

  const secondaryItems = [
    {
      title: 'العروض والخصومات',
      icon: Gift,
      items: [
        { title: 'العروض الحالية', href: '/offers/current' },
        { title: 'باقات خاصة', href: '/offers/packages' },
        { title: 'برنامج الولاء', href: '/offers/loyalty' },
        { title: 'عروض المواسم', href: '/offers/seasonal' },
      ]
    },
    {
      title: 'معلومات الشركة',
      icon: Info,
      items: [
        { title: 'من نحن', href: '/about' },
        { title: 'فريق العمل', href: '/about/team' },
        { title: 'شهادات الجودة', href: '/about/certificates' },
        { title: 'التقييمات', href: '/about/reviews' },
      ]
    },
    {
      title: 'المدونة',
      icon: BookOpen,
      items: [
        { title: 'نصائح السفر', href: '/blog/travel-tips' },
        { title: 'أماكن سياحية', href: '/blog/destinations' },
        { title: 'تجارب العملاء', href: '/blog/experiences' },
        { title: 'دليل المطاعم', href: '/blog/restaurants' },
      ]
    },
  ];

  return (
    <nav className={cn("bg-white shadow-lg border-b border-slate-200", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">جورجيا كار</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="text-slate-700 hover:text-blue-600 font-medium">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-64 gap-3 p-4">
                            {item.items.map((subItem) => (
                              <NavigationMenuLink key={subItem.title} asChild>
                                <Link
                                  to={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href || '/'}
                          className="text-slate-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-colors"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Secondary Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-slate-700 hover:text-blue-600 font-medium">
                  المزيد
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {secondaryItems.map((item, index) => (
                  <div key={item.title}>
                    <DropdownMenuItem className="font-medium text-slate-900 cursor-default">
                      <item.icon className="ml-2 h-4 w-4" />
                      {item.title}
                    </DropdownMenuItem>
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.title} asChild>
                        <Link to={subItem.href} className="pr-6">
                          {subItem.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    {index < secondaryItems.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <User className="w-4 h-4 ml-2" />
              حسابي
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              احجز الآن
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-2">
              {[...navigationItems, ...secondaryItems].map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between text-right">
                          <span className="flex items-center">
                            <item.icon className="ml-2 h-4 w-4" />
                            {item.title}
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {item.items.map((subItem) => (
                          <DropdownMenuItem key={subItem.title} asChild>
                            <Link to={subItem.href} onClick={() => setIsMobileMenuOpen(false)}>
                              {subItem.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      to={'href' in item ? item.href : '/'}
                      className="flex items-center px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="ml-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const navigationItems = [
  {
    title: 'الصفحة الرئيسية',
    href: '/',
    icon: Home,
  },
  {
    title: 'البحث والحجز',
    icon: Search,
    items: [
      { title: 'البحث عن السيارات', href: '/search' },
      { title: 'نتائج البحث', href: '/search-results' },
      { title: 'نموذج الحجز', href: '/booking' },
      { title: 'الحجوزات السريعة', href: '/quick-booking' },
    ]
  },
  {
    title: 'الخدمات',
    icon: Car,
    items: [
      { title: 'تأجير السيارات', href: '/services/car-rental' },
      { title: 'السائق مع السيارة', href: '/services/with-driver' },
      { title: 'الجولات السياحية', href: '/services/tours' },
      { title: 'خدمة المطار', href: '/services/airport' },
      { title: 'الرحلات الطويلة', href: '/services/long-trips' },
    ]
  },
  {
    title: 'وجهات جورجيا',
    icon: MapPin,
    items: [
      { title: 'تبليسي', href: '/destinations/tbilisi' },
      { title: 'باتومي', href: '/destinations/batumi' },
      { title: 'كازبيجي', href: '/destinations/kazbegi' },
      { title: 'سفانيتي', href: '/destinations/svaneti' },
      { title: 'كوتايسي', href: '/destinations/kutaisi' },
      { title: 'جوري', href: '/destinations/gori' },
    ]
  },
  {
    title: 'أسطول السيارات',
    icon: Compass,
    items: [
      { title: 'السيارات الاقتصادية', href: '/fleet/economy' },
      { title: 'السيارات المتوسطة', href: '/fleet/midsize' },
      { title: 'السيارات الفاخرة', href: '/fleet/luxury' },
      { title: 'السيارات الرياضية', href: '/fleet/sports' },
      { title: 'الحافلات الصغيرة', href: '/fleet/minibus' },
    ]
  },
  {
    title: 'دعم العملاء',
    icon: Phone,
    items: [
      { title: 'اتصل بنا', href: '/support/contact' },
      { title: 'الأسئلة الشائعة', href: '/support/faq' },
      { title: 'البحث عن حجز', href: '/support/find-booking' },
      { title: 'الشكاوى والاقتراحات', href: '/support/feedback' },
      { title: 'المساعدة الطارئة', href: '/support/emergency' },
    ]
  },
];

const secondaryItems = [
  {
    title: 'العروض والخصومات',
    icon: Gift,
    items: [
      { title: 'العروض الحالية', href: '/offers/current' },
      { title: 'باقات خاصة', href: '/offers/packages' },
      { title: 'برنامج الولاء', href: '/offers/loyalty' },
      { title: 'عروض المواسم', href: '/offers/seasonal' },
    ]
  },
  {
    title: 'معلومات الشركة',
    icon: Info,
    items: [
      { title: 'من نحن', href: '/about' },
      { title: 'فريق العمل', href: '/about/team' },
      { title: 'شهادات الجودة', href: '/about/certificates' },
      { title: 'التقييمات', href: '/about/reviews' },
    ]
  },
  {
    title: 'المدونة',
    icon: BookOpen,
    items: [
      { title: 'نصائح السفر', href: '/blog/travel-tips' },
      { title: 'أماكن سياحية', href: '/blog/destinations' },
      { title: 'تجارب العملاء', href: '/blog/experiences' },
      { title: 'دليل المطاعم', href: '/blog/restaurants' },
    ]
  },
];

export default MainNavigation;
