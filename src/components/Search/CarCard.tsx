
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, Users, Fuel, Settings } from 'lucide-react';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    nameEn: string;
    basePrice: number;
    image: string;
    features: string[];
    rating?: number;
    reviews?: number;
  };
  currencySymbol: string;
  onBook: (carId: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, currencySymbol, onBook }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="text-6xl">{car.image}</div>
          <div className="text-left">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{car.rating || 4.5}</span>
              <span className="text-sm text-gray-500">({car.reviews || 124})</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              متوفر
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl">
          {car.name}
          <div className="text-sm text-gray-600 font-normal">{car.nameEn}</div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Features */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">المميزات:</h4>
          <div className="flex flex-wrap gap-2">
            {car.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {car.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{car.features.length - 3} أخرى
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>4-5 مقاعد</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>بنزين</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span>أوتوماتيك</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {currencySymbol}{car.basePrice}
            </div>
            <div className="text-sm text-gray-500">في اليوم</div>
          </div>
          <Button
            onClick={() => onBook(car.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            احجز الآن
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
