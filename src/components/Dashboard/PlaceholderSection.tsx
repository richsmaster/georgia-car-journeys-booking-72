
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PlaceholderSectionProps {
  title: string;
  description: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default PlaceholderSection;
