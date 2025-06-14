
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Bell, AlertTriangle, Info, CheckCircle, X, Settings } from 'lucide-react';

interface Notification {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

interface NotificationCenterProps {
  data?: any;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ data }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  useEffect(() => {
    // Load existing notifications
    const stored = localStorage.getItem('cmsNotifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotifications(parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) })));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Check for issues and create notifications
    if (data) {
      checkForIssues();
    }
  }, [data]);

  const checkForIssues = () => {
    const newNotifications: Omit<Notification, 'id' | 'timestamp'>[] = [];

    // Check for data validation issues
    if (data?.cities) {
      const inactiveCities = data.cities.filter((city: any) => !city.enabled);
      if (inactiveCities.length > data.cities.length / 2) {
        newNotifications.push({
          type: 'warning',
          title: 'مدن غير مفعلة',
          message: `يوجد ${inactiveCities.length} مدينة غير مفعلة من أصل ${data.cities.length}`,
          read: false,
          actionRequired: true
        });
      }
    }

    if (data?.carTypes) {
      const inactiveCarTypes = data.carTypes.filter((car: any) => !car.enabled);
      if (inactiveCarTypes.length === data.carTypes.length) {
        newNotifications.push({
          type: 'error',
          title: 'جميع أنواع السيارات معطلة',
          message: 'لا توجد أنواع سيارات مفعلة للحجز',
          read: false,
          actionRequired: true
        });
      }

      // Check for pricing issues
      const lowPricedCars = data.carTypes.filter((car: any) => car.basePrice < 20);
      if (lowPricedCars.length > 0) {
        newNotifications.push({
          type: 'warning',
          title: 'أسعار منخفضة',
          message: `يوجد ${lowPricedCars.length} نوع سيارة بأسعار قد تكون منخفضة جداً`,
          read: false
        });
      }
    }

    if (data?.settings) {
      if (!data.settings.whatsappNumber) {
        newNotifications.push({
          type: 'error',
          title: 'رقم واتساب مفقود',
          message: 'لم يتم تعيين رقم واتساب للتواصل',
          read: false,
          actionRequired: true
        });
      }
    }

    // Add new notifications
    if (newNotifications.length > 0) {
      const existingNotifications = [...notifications];
      newNotifications.forEach(notif => {
        // Check if similar notification already exists
        const exists = existingNotifications.some(existing => 
          existing.title === notif.title && existing.type === notif.type
        );
        
        if (!exists) {
          const fullNotification: Notification = {
            ...notif,
            id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date()
          };
          existingNotifications.unshift(fullNotification);
        }
      });

      setNotifications(existingNotifications.slice(0, 50)); // Keep only latest 50
      localStorage.setItem('cmsNotifications', JSON.stringify(existingNotifications.slice(0, 50)));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('cmsNotifications', JSON.stringify(updated));
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('cmsNotifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('cmsNotifications', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (!confirm('هل أنت متأكد من حذف جميع التنبيهات؟')) return;
    
    setNotifications([]);
    localStorage.removeItem('cmsNotifications');
  };

  const filteredNotifications = showOnlyUnread 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            مركز التنبيهات
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowOnlyUnread(!showOnlyUnread)}
              size="sm"
              variant="outline"
            >
              {showOnlyUnread ? 'عرض الكل' : 'غير المقروءة فقط'}
            </Button>
            {notifications.length > 0 && (
              <>
                <Button onClick={markAllAsRead} size="sm" variant="outline">
                  تحديد الكل كمقروء
                </Button>
                <Button
                  onClick={clearAll}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  مسح الكل
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>{showOnlyUnread ? 'لا توجد تنبيهات غير مقروءة' : 'لا توجد تنبيهات'}</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        {notification.actionRequired && (
                          <Badge variant="destructive" className="text-xs">
                            يتطلب إجراء
                          </Badge>
                        )}
                        {!notification.read && (
                          <Badge variant="secondary" className="text-xs">
                            جديد
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">
                        {notification.timestamp.toLocaleString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        onClick={() => markAsRead(notification.id)}
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        تحديد كمقروء
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteNotification(notification.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
