import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext);

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      const data = await storage.get('cv_activities');
      if (data) {
        setActivities(data);
      }
      setLoading(false);
    };
    loadActivities();

    // Auto Cleanup System - Every 10 minutes (600,000 ms)
    const cleanupInterval = setInterval(() => {
      setActivities([]);
      storage.set('cv_activities', []);
    }, 600000);

    return () => clearInterval(cleanupInterval);
  }, []);

  const logActivity = async (action, details = '') => {
    const newActivity = {
      id: Date.now().toString(),
      action,
      details,
      timestamp: new Date().toISOString()
    };
    
    setActivities(prev => {
      const updated = [newActivity, ...prev];
      storage.set('cv_activities', updated);
      return updated;
    });
  };

  const clearActivity = async () => {
    setActivities([]);
    await storage.set('cv_activities', []);
  };

  return (
    <ActivityContext.Provider value={{ activities, logActivity, clearActivity, loading }}>
      {children}
    </ActivityContext.Provider>
  );
}
