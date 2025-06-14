
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Download, Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';

interface DataImportExportProps {
  data: any[];
  onImport: (data: any[]) => void;
  onClose: () => void;
  dataType: string;
}

const DataImportExport: React.FC<DataImportExportProps> = ({
  data,
  onImport,
  onClose,
  dataType
}) => {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportToCSV = () => {
    if (!data || data.length === 0) {
      setImportStatus('error');
      setImportMessage('لا توجد بيانات للتصدير');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (Array.isArray(value)) return `"${value.join('; ')}"`;
          if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${dataType}_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setImportStatus('success');
    setImportMessage('تم تصدير البيانات بنجاح');
  };

  const exportToJSON = () => {
    if (!data || data.length === 0) {
      setImportStatus('error');
      setImportMessage('لا توجد بيانات للتصدير');
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${dataType}_export_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setImportStatus('success');
    setImportMessage('تم تصدير البيانات بنجاح');
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedData: any[] = [];

        if (file.name.endsWith('.json')) {
          importedData = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n').filter(line => line.trim());
          if (lines.length < 2) throw new Error('ملف CSV غير صحيح');
          
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          importedData = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = values[index] || '';
            });
            return obj;
          });
        }

        if (importedData.length === 0) {
          throw new Error('لا توجد بيانات صالحة في الملف');
        }

        onImport(importedData);
        setImportStatus('success');
        setImportMessage(`تم استيراد ${importedData.length} عنصر بنجاح`);
        
      } catch (error) {
        setImportStatus('error');
        setImportMessage(`خطأ في استيراد الملف: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
      }
    };

    reader.readAsText(file);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5" />
          استيراد وتصدير البيانات - {dataType}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">تصدير البيانات</h3>
          <div className="flex gap-3">
            <Button onClick={exportToCSV} variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير CSV
            </Button>
            <Button onClick={exportToJSON} variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير JSON
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">استيراد البيانات</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">اختر ملف (CSV أو JSON)</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.json"
                onChange={handleFileImport}
                ref={fileInputRef}
                className="mt-2"
              />
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                تأكد من أن ملف CSV يحتوي على عناوين الأعمدة في السطر الأول.
                ملف JSON يجب أن يكون مصفوفة من الكائنات.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {importStatus !== 'idle' && (
          <Alert className={importStatus === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            {importStatus === 'success' ? 
              <CheckCircle className="h-4 w-4 text-green-600" /> : 
              <AlertCircle className="h-4 w-4 text-red-600" />
            }
            <AlertDescription className={importStatus === 'success' ? 'text-green-800' : 'text-red-800'}>
              {importMessage}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataImportExport;
