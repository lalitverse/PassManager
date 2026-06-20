import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useSettings } from './useSettings';

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { settings } = useSettings();

  useEffect(() => {
    const load = async () => {
      const data = await storage.get('cv_notifications');
      if (data) setNotifications(data);
    };
    load();
  }, []);

  const notify = async (title, message) => {
    if (!settings.notifications) return;

    const newNotif = {
      id: Date.now().toString(),
      title,
      message,
      read: false,
      timestamp: new Date().toISOString()
    };

    setNotifications(prev => {
      const updated = [newNotif, ...prev].slice(0, 50); // Keep last 50
      storage.set('cv_notifications', updated);
      return updated;
    });
  };

  const clearNotifications = async () => {
    setNotifications([]);
    await storage.remove('cv_notifications');
  };

  const markAsRead = async () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      storage.set('cv_notifications', updated);
      return updated;
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, notify, clearNotifications, markAsRead, unreadCount }}>
      {children}
    </NotificationsContext.Provider>
  );
}
