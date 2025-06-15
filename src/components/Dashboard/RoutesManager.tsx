
import React from 'react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Route, CarType, City, Airport } from '../../types/cms';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface RoutesManagerProps {
  routes: Route[];
  carTypes: CarType[];
  cities: City[];
  airports: Airport[];
  onUpdateRoutes: (routes: Route[]) => void;
}

const RoutesManager: React.FC<RoutesManagerProps> = ({ routes, carTypes, cities, airports, onUpdateRoutes }) => {
  const allLocations = [...cities, ...airports];

  const getLocationName = (id: string) => {
    return allLocations.find(loc => loc.id === id)?.name || 'غير معروف';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة مسارات الأسعار</CardTitle>
        <Button size="sm" disabled>
          <PlusCircle className="w-4 h-4 ml-2" />
          إضافة مسار جديد
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المسار</TableHead>
              <TableHead>من</TableHead>
              <TableHead>إلى</TableHead>
              {carTypes.filter(c => c.enabled).map(car => (
                <TableHead key={car.id} className="text-center">{car.name}</TableHead>
              ))}
              <TableHead>الحالة</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map(route => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">{route.name}</TableCell>
                <TableCell>{getLocationName(route.from)}</TableCell>
                <TableCell>{getLocationName(route.to)}</TableCell>
                {carTypes.filter(c => c.enabled).map(car => (
                  <TableCell key={car.id} className="text-center">
                    {route.prices[car.id] ? `$${route.prices[car.id]}` : '-'}
                  </TableCell>
                ))}
                <TableCell>{route.enabled ? 'مفعل' : 'معطل'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" disabled>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" disabled>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RoutesManager;
