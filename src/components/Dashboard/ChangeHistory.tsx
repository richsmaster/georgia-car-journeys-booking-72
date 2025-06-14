import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, User, Edit3, Trash2, Plus, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface ChangeRecord {
  id: string;
  timestamp: Date;
  action: 'create' | 'update' | 'delete' | 'bulk_update' | 'bulk_delete';
  entityType: string;
  entityId: string;
  entityName: string;
  changes: any;
  previousData?: any;
}

interface ChangeHistoryProps {
  onRestoreChange?: (record: ChangeRecord) => void;
}

const ChangeHistory: React.FC<ChangeHistoryProps> = ({ onRestoreChange }) => {
  const [changeHistory, setChangeHistory] = useState<ChangeRecord[]>([]);
  const [selectedEntityType, setSelectedEntityType] = useState<string>('all');

  useEffect(() => {
    // Load change history from localStorage
    const storedHistory = localStorage.getItem('cmsChangeHistory');
    if (storedHistory) {
      try {
        const parsed = JSON.parse(storedHistory);
        setChangeHistory(parsed.map((record: any) => ({
          ...record,
          timestamp: new Date(record.timestamp)
        })));
      } catch (error) {
        console.error('Error loading change history:', error);
      }
    }
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'update':
        return <Edit3 className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'bulk_update':
        return <Edit3 className="w-4 h-4 text-purple-600" />;
      case 'bulk_delete':
        return <Trash2 className="w-4 h-4 text-red-700" />;
      default:
        return <Edit3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'create':
        return 'إنشاء';
      case 'update':
        return 'تعديل';
      case 'delete':
        return 'حذف';
      case 'bulk_update':
        return 'تعديل جماعي';
      case 'bulk_delete':
        return 'حذف جماعي';
      default:
        return 'تغيير';
    }
  };

  const getEntityTypeText = (entityType: string) => {
    switch (entityType) {
      case 'cities':
        return 'المدن';
      case 'carTypes':
        return 'أنواع السيارات';
      case 'services':
        return 'الخدمات';
      case 'testimonials':
        return 'آراء العملاء';
      case 'settings':
        return 'الإعدادات';
      default:
        return entityType;
    }
  };

  const filteredHistory = selectedEntityType === 'all' 
    ? changeHistory 
    : changeHistory.filter(record => record.entityType === selectedEntityType);

  const entityTypes = [...new Set(changeHistory.map(record => record.entityType))];

  const handleRestoreChange = (record: ChangeRecord) => {
    if (!confirm('هل أنت متأكد من استعادة هذا التغيير؟')) {
      return;
    }

    if (onRestoreChange) {
      onRestoreChange(record);
    }
  };

  const clearHistory = () => {
    if (!confirm('هل أنت متأكد من حذف جميع سجلات التغييرات؟')) {
      return;
    }

    localStorage.removeItem('cmsChangeHistory');
    setChangeHistory([]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            تاريخ التغييرات
          </CardTitle>
          <div className="flex items-center gap-2">
            <select
              value={selectedEntityType}
              onChange={(e) => setSelectedEntityType(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">جميع الأنواع</option>
              {entityTypes.map(type => (
                <option key={type} value={type}>
                  {getEntityTypeText(type)}
                </option>
              ))}
            </select>
            {changeHistory.length > 0 && (
              <Button
                onClick={clearHistory}
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                مسح السجل
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>لا توجد سجلات تغييرات</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredHistory.map((record) => (
              <div key={record.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getActionIcon(record.action)}
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {getActionText(record.action)}
                        </Badge>
                        <Badge variant="secondary">
                          {getEntityTypeText(record.entityType)}
                        </Badge>
                      </div>
                      <h4 className="font-medium mt-1">{record.entityName}</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(record.timestamp, 'dd/MM/yyyy HH:mm:ss', { locale: ar })}
                      </p>
                    </div>
                  </div>
                  
                  {(record.action === 'update' || record.action === 'delete') && record.previousData && (
                    <Button
                      onClick={() => handleRestoreChange(record)}
                      size="sm"
                      variant="outline"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <RotateCcw className="w-4 h-4 ml-2" />
                      استعادة
                    </Button>
                  )}
                </div>

                {record.changes && Object.keys(record.changes).length > 0 && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <h5 className="text-sm font-medium mb-2">التغييرات:</h5>
                    <div className="space-y-1">
                      {Object.entries(record.changes).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="font-medium">{key}:</span>
                          <span className="text-gray-600 mr-2">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChangeHistory;

// Helper function to add change record
export const addChangeRecord = (record: Omit<ChangeRecord, 'id' | 'timestamp'>) => {
  const fullRecord: ChangeRecord = {
    ...record,
    id: `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date()
  };

  const existingHistory = localStorage.getItem('cmsChangeHistory');
  let history: ChangeRecord[] = [];
  
  if (existingHistory) {
    try {
      history = JSON.parse(existingHistory);
    } catch (error) {
      console.error('Error parsing change history:', error);
    }
  }

  // Keep only the latest 100 records
  history = [fullRecord,  ...history].slice(0, 100);
  localStorage.setItem('cmsChangeHistory', JSON.stringify(history));
};
