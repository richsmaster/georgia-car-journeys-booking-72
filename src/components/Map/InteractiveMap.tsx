
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Car, MapPin } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

interface InteractiveMapProps {
  onCarSelect?: (carId: string, location: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onCarSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const { data } = useCMS();

  // Georgia cities coordinates
  const georgianCities = [
    { name: 'تبليسي', nameEn: 'Tbilisi', lng: 44.7939, lat: 41.7151, cars: 12 },
    { name: 'باتومي', nameEn: 'Batumi', lng: 41.6168, lat: 41.6168, cars: 8 },
    { name: 'كوتايسي', nameEn: 'Kutaisi', lng: 42.6954, lat: 42.2679, cars: 5 },
    { name: 'متسخيتا', nameEn: 'Mtskheta', lng: 44.7193, lat: 41.8458, cars: 3 },
    { name: 'جوري', nameEn: 'Gori', lng: 44.1085, lat: 41.9847, cars: 4 },
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Set your Mapbox token here - user should replace with their own
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazVxeWE1aGcxMXAzM21wbHJzeGQ4bDJkIn0.example';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [44.7939, 41.7151], // Tbilisi
      zoom: 7,
      pitch: 30,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

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
      const popup = new mapboxgl.Popup({
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
      new mapboxgl.Marker(markerElement)
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

    return () => {
      map.current?.remove();
    };
  }, [onCarSelect]);

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
