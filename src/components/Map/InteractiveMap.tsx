
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle, Car, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCMS } from '../../hooks/useCMS';

interface InteractiveMapProps {
  onCarSelect?: (carId: string, location: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onCarSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [tokenError, setTokenError] = useState<string>('');
  const [manualToken, setManualToken] = useState<string>('');
  const { data: cmsData } = useCMS();

  // Get Mapbox token from settings or use manual input
  const mapboxToken = cmsData.settings?.mapboxToken || manualToken;

  // Generate dynamic city data from CMS
  const georgianCities = React.useMemo(() => {
    if (!cmsData.booking?.cities) return [];
    
    return cmsData.booking.cities
      .filter(city => city.enabled)
      .map(city => {
        // Calculate available cars for this city
        const availableCars = cmsData.booking?.carTypes?.filter(car => car.enabled).length || 0;
        
        // Default coordinates for Georgian cities
        const coordinates: Record<string, {lng: number, lat: number}> = {
          'tbilisi': { lng: 44.7939, lat: 41.7151 },
          'batumi': { lng: 41.6168, lat: 41.6168 },
          'kutaisi': { lng: 42.6954, lat: 42.2679 },
          'mtskheta': { lng: 44.7193, lat: 41.8458 },
          'gori': { lng: 44.1085, lat: 41.9847 },
          'zugdidi': { lng: 41.8708, lat: 42.5088 },
          'rustavi': { lng: 44.9939, lat: 41.5492 },
          'poti': { lng: 41.6716, lat: 42.1508 }
        };
        
        const coords = coordinates[city.nameEn?.toLowerCase()] || coordinates['tbilisi'];
        
        return {
          name: city.name,
          nameEn: city.nameEn,
          lng: coords.lng,
          lat: coords.lat,
          cars: availableCars,
          hasAirport: city.hasAirport
        };
      });
  }, [cmsData.booking]);

  const loadMapbox = async () => {
    if (!mapboxToken) {
      setTokenError('يرجى إدخال رمز Mapbox أو حفظه في إعدادات لوحة التحكم');
      return;
    }

    try {
      if (typeof window === 'undefined') return;

      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.onload = () => {
        const link = document.createElement('link');
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        initializeMap();
      };
      script.onerror = () => {
        setTokenError('خطأ في تحميل مكتبة Mapbox');
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error loading Mapbox:', error);
      setTokenError('خطأ في تحميل الخريطة. تأكد من صحة الرمز المميز.');
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    const mapboxgl = (window as any).mapboxgl;
    if (!mapboxgl) {
      setTokenError('خطأ في تحميل مكتبة Mapbox');
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [44.7939, 41.7151],
      zoom: 7,
      pitch: 30,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for cities with available cars
    georgianCities.forEach((city) => {
      if (!map.current || city.cars === 0) return;

      // Create custom marker element with car info
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border-2 border-white hover:bg-blue-700 transition-all duration-300 cursor-pointer relative">
          <span class="text-xs font-bold">${city.cars}</span>
          ${city.hasAirport ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>' : ''}
        </div>
      `;

      // Create enhanced popup with car types
      const carTypesHtml = cmsData.booking?.carTypes
        ?.filter(car => car.enabled)
        ?.slice(0, 3)
        ?.map(car => `
          <div class="flex items-center justify-between text-xs bg-slate-50 p-2 rounded">
            <span>${car.name}</span>
            <span class="text-blue-600">${car.capacity.min}-${car.capacity.max} أشخاص</span>
          </div>
        `).join('') || '';

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(`
        <div class="p-3 min-w-48">
          <div class="flex items-center gap-2 mb-2">
            <h3 class="font-bold text-slate-900">${city.name}</h3>
            ${city.hasAirport ? '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">مطار</span>' : ''}
          </div>
          <p class="text-sm text-slate-600 mb-3">${city.cars} سيارة متاحة</p>
          
          ${carTypesHtml ? `
            <div class="space-y-1 mb-3">
              <p class="text-xs font-medium text-slate-700">أنواع السيارات المتاحة:</p>
              ${carTypesHtml}
            </div>
          ` : ''}
          
          <button 
            onclick="window.selectCity('${city.nameEn}')" 
            class="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            عرض السيارات
          </button>
        </div>
      `);

      new mapboxgl.Marker(markerElement)
        .setLngLat([city.lng, city.lat])
        .setPopup(popup)
        .addTo(map.current);
    });

    (window as any).selectCity = (cityName: string) => {
      if (onCarSelect) {
        onCarSelect('available', cityName);
      }
    };

    setIsMapLoaded(true);
    setTokenError('');
  };

  // Auto-load map if token is available
  useEffect(() => {
    if (mapboxToken && !isMapLoaded) {
      loadMapbox();
    }
  }, [mapboxToken]);

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapLoaded) {
    return (
      <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-4">الخريطة التفاعلية</h3>
          
          {cmsData.settings?.mapboxToken ? (
            <div>
              <p className="text-slate-600 mb-4">جاري تحميل الخريطة...</p>
              <Button onClick={loadMapbox} className="bg-blue-600 hover:bg-blue-700">
                تحميل الخريطة
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-slate-600 mb-6 text-sm">
                لم يتم العثور على رمز Mapbox في الإعدادات. يمكنك إدخاله مؤقتاً هنا أو حفظه في لوحة التحكم.
              </p>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="أدخل رمز Mapbox"
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  className="text-center"
                />
                
                {tokenError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{tokenError}</span>
                  </div>
                )}
                
                <Button 
                  onClick={loadMapbox}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!manualToken.trim()}
                >
                  تحميل الخريطة
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-slate-600">
                <p className="font-medium mb-2">لحفظ الرمز بشكل دائم:</p>
                <p>انتقل إلى لوحة التحكم &gt; الإعدادات &gt; إعدادات الخريطة</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Enhanced map overlay info */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm mb-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="font-medium">السيارات المتاحة في جورجيا</span>
        </div>
        <div className="text-xs text-slate-600 space-y-1">
          <div>المجموع: {georgianCities.reduce((sum, city) => sum + city.cars, 0)} سيارة</div>
          <div>المدن: {georgianCities.length} مدينة</div>
        </div>
      </div>

      {/* Enhanced legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>سيارات متاحة</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>يحتوي على مطار</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
