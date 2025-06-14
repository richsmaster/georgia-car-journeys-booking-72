
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Save } from 'lucide-react';

interface TestimonialsEditorProps {
  data: any[];
  onSave: (data: any[]) => void;
}

const TestimonialsEditor: React.FC<TestimonialsEditorProps> = ({ data, onSave }) => {
  const [testimonials, setTestimonials] = useState(data);

  const updateTestimonial = (index: number, field: string, value: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(testimonials);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تحرير آراء العملاء</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium">رأي العميل {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>الاسم</Label>
                  <Input
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label>البلد</Label>
                  <Input
                    value={testimonial.country}
                    onChange={(e) => updateTestimonial(index, 'country', e.target.value)}
                  />
                </div>
                <div>
                  <Label>نوع الرحلة</Label>
                  <Input
                    value={testimonial.trip}
                    onChange={(e) => updateTestimonial(index, 'trip', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>نص الرأي</Label>
                <Textarea
                  value={testimonial.text}
                  onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
          
          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestimonialsEditor;
