import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useActivity } from './useActivity';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    theme: 'Dark Professional',
    notifications: true,
    identityMonitoring: false,
    biometrics: false,
  });
  const [loading, setLoading] = useState(true);
  const { logActivity } = useActivity();

  useEffect(() => {
    const loadSettings = async () => {
      const stored = await storage.get('cv_settings');
      if (stored) {
        // Validation to prevent broken themes from older versions
        const validThemes = ['Dark Professional', 'Light Professional', 'Cyber Blue', 'Emerald Green', 'Midnight Purple', 'Crimson Red', 'Ocean Blue', 'Sunset Orange', 'Matrix Green', 'Monochrome'];
        if (stored.theme && !validThemes.includes(stored.theme)) {
          stored.theme = 'Dark Professional';
        }
        setSettings(prev => ({ ...prev, ...stored }));
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    // Remove all existing theme classes
    const classesToRemove = Array.from(document.documentElement.classList).filter(c => c.startsWith('theme-'));
    document.documentElement.classList.remove(...classesToRemove);
    
    // Apply new theme
    const themeClass = `theme-${settings.theme.toLowerCase().replace(/\s+/g, '-')}`;
    document.documentElement.classList.add(themeClass);
  }, [settings.theme]);

  const updateSetting = async (key, value) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value };
      storage.set('cv_settings', updated);
      return updated;
    });

    let actionName = 'Settings Changed';
    if (key === 'notifications') actionName = `Notifications ${value ? 'Enabled' : 'Disabled'}`;
    if (key === 'identityMonitoring') actionName = `Identity Monitoring ${value ? 'Enabled' : 'Disabled'}`;
    if (key === 'biometrics') actionName = `Biometrics ${value ? 'Enabled' : 'Disabled'}`;
    
    await logActivity(actionName, `Set ${key} to ${value}`);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}
