
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Download, Upload, Clock, Shield, Trash2, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Backup {
  id: string;
  name: string;
  date: Date;
  size: string;
  dataCount: number;
}

interface BackupManagerProps {
  onCreateBackup: () => void;
  onRestoreBackup: (backupId: string) => void;
  onDeleteBackup: (backupId: string) => void;
}

const BackupManager: React.FC<BackupManagerProps> = ({
  onCreateBackup,
  onRestoreBackup,
  onDeleteBackup
}) => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string>('');

  useEffect(() => {
    // Load existing backups from localStorage
    const storedBackups = localStorage.getItem('cmsBackups');
    if (storedBackups) {
      try {
        const parsed = JSON.parse(storedBackups);
        setBackups(parsed.map((b: any) => ({ ...b, date: new Date(b.date) })));
      } catch (error) {
        console.error('Error loading backups:', error);
      }
    }
  }, []);

  const saveBackupsToStorage = (newBackups: Backup[]) => {
    localStorage.setItem('cmsBackups', JSON.stringify(newBackups));
    setBackups(newBackups);
  };

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    try {
      const cmsData = localStorage.getItem('cmsData');
      if (!cmsData) throw new Error('لا توجد بيانات للنسخ الاحتياطي');

      const data = JSON.parse(cmsData);
      const backupId = `backup_${Date.now()}`;
      const backupName = `نسخة احتياطية ${format(new Date(), 'dd/MM/yyyy HH:mm', { locale: ar })}`;
      
      const newBackup: Backup = {
        id: backupId,
        name: backupName,
        date: new Date(),
        size: `${(cmsData.length / 1024).toFixed(1)} KB`,
        dataCount: Object.keys(data).length
      };

      // Store backup data
      localStorage.setItem(`backup_${backupId}`, cmsData);
      
      const updatedBackups = [newBackup, ...backups].slice(0, 10); // Keep only latest 10 backups
      saveBackupsToStorage(updatedBackups);
      
      onCreateBackup();
    } catch (error) {
      console.error('Error creating backup:', error);
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const handleRestoreBackup = (backupId: string) => {
    if (!confirm('هل أنت متأكد من استعادة هذه النسخة الاحتياطية؟ سيتم فقدان البيانات الحالية.')) {
      return;
    }

    try {
      const backupData = localStorage.getItem(`backup_${backupId}`);
      if (!backupData) throw new Error('لم يتم العثور على بيانات النسخة الاحتياطية');

      localStorage.setItem('cmsData', backupData);
      onRestoreBackup(backupId);
    } catch (error) {
      console.error('Error restoring backup:', error);
      alert('خطأ في استعادة النسخة الاحتياطية');
    }
  };

  const handleDeleteBackup = (backupId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه النسخة الاحتياطية؟')) {
      return;
    }

    try {
      localStorage.removeItem(`backup_${backupId}`);
      const updatedBackups = backups.filter(b => b.id !== backupId);
      saveBackupsToStorage(updatedBackups);
      onDeleteBackup(backupId);
    } catch (error) {
      console.error('Error deleting backup:', error);
    }
  };

  const downloadBackup = (backup: Backup) => {
    try {
      const backupData = localStorage.getItem(`backup_${backup.id}`);
      if (!backupData) throw new Error('لم يتم العثور على بيانات النسخة الاحتياطية');

      const blob = new Blob([backupData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${backup.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading backup:', error);
      alert('خطأ في تحميل النسخة الاحتياطية');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          إدارة النسخ الاحتياطية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Create Backup Section */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div>
            <h3 className="font-medium text-blue-900">إنشاء نسخة احتياطية جديدة</h3>
            <p className="text-sm text-blue-700">احفظ حالة البيانات الحالية</p>
          </div>
          <Button 
            onClick={handleCreateBackup} 
            disabled={isCreatingBackup}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Shield className="w-4 h-4 ml-2" />
            {isCreatingBackup ? 'جاري الإنشاء...' : 'إنشاء نسخة'}
          </Button>
        </div>

        {/* Backups List */}
        <div>
          <h3 className="text-lg font-medium mb-4">النسخ الاحتياطية المتاحة</h3>
          {backups.length === 0 ? (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                لا توجد نسخ احتياطية. قم بإنشاء نسخة احتياطية أولاً.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {backups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{backup.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(backup.date, 'dd/MM/yyyy HH:mm', { locale: ar })}
                      </span>
                      <span>الحجم: {backup.size}</span>
                      <span>العناصر: {backup.dataCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => downloadBackup(backup)}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleRestoreBackup(backup.id)}
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteBackup(backup.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            يتم الاحتفاظ بآخر 10 نسخ احتياطية تلقائياً. النسخ الأقدم سيتم حذفها تلقائياً.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default BackupManager;
