
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
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
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [tokenError, setTokenError] = useState<string>('');
  const { data } = useCMS();

  // Georgia cities coordinates
  const georgianCities = [
    { name: 'تبليسي', nameEn: 'Tbilisi', lng: 44.7939, lat: 41.7151, cars: 12 },
    { name: 'باتومي', nameEn: 'Batumi', lng: 41.6168, lat: 41.6168, cars: 8 },
    { name: 'كوتايسي', nameEn: 'Kutaisi', lng: 42.6954, lat: 42.2679, cars: 5 },
    { name: 'متسخيتا', nameEn: 'Mtskheta', lng: 44.7193, lat: 41.8458, cars: 3 },
    { name: 'جوري', nameEn: 'Gori', lng: 44.1085, lat: 41.9847, cars: 4 },
  ];

  const loadMapbox = async () => {
    if (!mapboxToken) {
      setTokenError('يرجى إدخال رمز Mapbox الخاص بك');
      return;
    }

    try {
      // Dynamically import mapbox-gl
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');

      if (!mapContainer.current || map.current) return;

      // Set Mapbox token
      mapboxgl.default.accessToken = mapboxToken;

      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [44.7939, 41.7151], // Tbilisi
        zoom: 7,
        pitch: 30,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      // Add markers for cities with available cars
      georgianCities.forEach((city) => {
        if (!map.current) return;

        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white hover:bg-blue-700 transition-colors cursor-pointer">
            <span class="text-xs font-bold">${city.cars}</span>
          </div>
        `;

        // Create popup
        const popup = new mapboxgl.default.Popup({
          offset: 25,
          closeButton: false,
        }).setHTML(`
          <div class="text-center p-2">
            <h3 class="font-bold text-slate-900">${city.name}</h3>
            <p class="text-sm text-slate-600">${city.cars} سيارة متاحة</p>
            <button 
              onclick="window.selectCity('${city.nameEn}')" 
              class="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
            >
              عرض السيارات
            </button>
          </div>
        `);

        // Add marker to map
        new mapboxgl.default.Marker(markerElement)
          .setLngLat([city.lng, city.lat])
          .setPopup(popup)
          .addTo(map.current);
      });

      // Global function for city selection
      (window as any).selectCity = (cityName: string) => {
        if (onCarSelect) {
          onCarSelect('available', cityName);
        }
      };

      setIsMapLoaded(true);
      setTokenError('');
    } catch (error) {
      console.error('Error loading Mapbox:', error);
      setTokenError('خطأ في تحميل الخريطة. تأكد من صحة الرمز المميز.');
    }
  };

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
          <h3 className="text-xl font-bold text-slate-900 mb-4">إعداد الخريطة التفاعلية</h3>
          <p className="text-slate-600 mb-6 text-sm">
            للاستمتاع بميزة الخريطة التفاعلية، يرجى إدخال رمز Mapbox الخاص بك.
            يمكنك الحصول عليه مجاناً من <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
          </p>
          
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="أدخل رمز Mapbox الخاص بك"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
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
              disabled={!mapboxToken.trim()}
            >
              تحميل الخريطة
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-slate-600">
            <p className="font-medium mb-2">كيفية الحصول على رمز Mapbox:</p>
            <ol className="text-right space-y-1">
              <li>1. انتقل إلى mapbox.com</li>
              <li>2. أنشئ حساباً مجانياً</li>
              <li>3. انسخ الرمز من لوحة التحكم</li>
              <li>4. الصقه هنا لتفعيل الخريطة</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map overlay info */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="font-medium">السيارات المتاحة في جورجيا</span>
        </div>
        <div className="text-xs text-slate-600 mt-1">
          انقر على الأرقام لعرض السيارات المتاحة
        </div>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>سيارات متاحة</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
