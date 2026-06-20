import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../hooks/useAuth';
import { useVault } from '../hooks/useVault';
import { useState } from 'react';

const THEMES = [
  { name: 'Dark Professional', color: '#4d8eff' },
  { name: 'Light Professional', color: '#005ac2' },
  { name: 'Cyber Blue', color: '#00e5ff' },
  { name: 'Emerald Green', color: '#66db8c' },
  { name: 'Midnight Purple', color: '#dcb8ff' },
  { name: 'Crimson Red', color: '#ffb3ae' },
  { name: 'Ocean Blue', color: '#8cd4e9' },
  { name: 'Sunset Orange', color: '#ffb68c' },
  { name: 'Matrix Green', color: '#00ff41' },
  { name: 'Monochrome', color: '#ffffff' }
];

export default function Settings() {
  const { settings, updateSetting } = useSettings();
  const { user } = useAuth();
  const { vault } = useVault();
  
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showMasterPasswords, setShowMasterPasswords] = useState(false);

  const strongPasswords = vault.filter(item => item.strength === 'Strong' || item.strength === 'Excellent' || item.score >= 3);

  return (
    <div className="max-w-4xl mx-auto space-y-lg pb-xl">
      <header className="mb-xl">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-xs">Settings</h1>
        <p className="text-on-surface-variant font-body-md text-body-md">Configure your vault security and application preferences.</p>
      </header>

      <div className="grid grid-cols-1 gap-lg">
        {/* Account Profile (Mobile specific) */}
        <section className="glass-card rounded-xl p-lg md:hidden">
          <div className="flex items-center gap-md">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary flex items-center justify-center bg-primary-container text-on-primary-container text-xl font-bold">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm">{user?.name}</h3>
              <span className="bg-secondary/10 text-secondary text-[10px] px-sm py-[2px] rounded-full border border-secondary/20 font-label-md uppercase">PRO TIER</span>
              <p className="text-xs text-on-surface-variant mt-xs">{user?.email}</p>
            </div>
          </div>
        </section>

        {/* Account Security */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-primary font-label-md mb-md px-xs">Account Security</h2>
          <div className="glass-card rounded-xl overflow-hidden divide-y divide-white/5">
            <div className="p-md flex items-center justify-between hover:bg-surface-variant/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                  <span className="material-symbols-outlined">authenticator</span>
                </div>
                <div>
                  <p className="font-body-lg text-body-lg">Two-Factor Authentication</p>
                  <p className="text-xs text-on-surface-variant">Recommended for maximum protection</p>
                </div>
              </div>
              <span className="text-secondary font-label-md text-xs bg-secondary/10 px-sm py-1 rounded-full">ACTIVE</span>
            </div>
            
            <div 
              className="p-md hover:bg-surface-variant/10 transition-colors cursor-pointer"
              onClick={() => setShowMasterPasswords(!showMasterPasswords)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                    <span className="material-symbols-outlined">password</span>
                  </div>
                  <div>
                    <p className="font-body-lg text-body-lg">Master Password Viewer</p>
                    <p className="text-xs text-on-surface-variant">View your strongest stored passwords</p>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${showMasterPasswords ? 'rotate-90' : ''}`}>chevron_right</span>
              </div>
              
              {showMasterPasswords && (
                <div className="mt-md pt-md border-t border-white/5 pl-14">
                  {vault.length === 0 ? (
                    <p className="text-sm text-on-surface-variant italic">Please add passwords to your vault first.</p>
                  ) : strongPasswords.length === 0 ? (
                    <p className="text-sm text-on-surface-variant italic">No strong passwords found. Add passwords to your vault.</p>
                  ) : (
                    <div className="space-y-sm max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {strongPasswords.map(pw => (
                        <div key={pw.id} className="flex justify-between items-center bg-surface-container-high p-sm rounded-lg">
                          <span className="text-sm font-medium">{pw.title}</span>
                          <span className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">Strong</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* App Settings */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-primary font-label-md mb-md px-xs">App Settings</h2>
          <div className="glass-card rounded-xl overflow-hidden divide-y divide-white/5">
            <div className="p-md flex items-center justify-between">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                  <span className="material-symbols-outlined">fingerprint</span>
                </div>
                <div>
                  <p className="font-body-lg text-body-lg">Biometric Unlock</p>
                  <p className="text-xs text-on-surface-variant">Use FaceID or TouchID</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.biometrics} 
                  onChange={(e) => updateSetting('biometrics', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="p-md flex items-center justify-between">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                  <span className="material-symbols-outlined">radar</span>
                </div>
                <div>
                  <p className="font-body-lg text-body-lg">Identity Monitoring</p>
                  <p className="text-xs text-on-surface-variant">Scan dark web for breaches</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.identityMonitoring} 
                  onChange={(e) => updateSetting('identityMonitoring', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="p-md flex items-center justify-between">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                  <span className="material-symbols-outlined">notifications</span>
                </div>
                <div>
                  <p className="font-body-lg text-body-lg">Notifications</p>
                  <p className="text-xs text-on-surface-variant">Receive alerts and updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.notifications} 
                  onChange={(e) => updateSetting('notifications', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-primary font-label-md mb-md px-xs">Preferences</h2>
          <div className="glass-card rounded-xl overflow-visible divide-y divide-white/5 relative">
            <div 
              className="p-md flex items-center justify-between hover:bg-surface-variant/10 transition-colors cursor-pointer"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
            >
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                  <span className="material-symbols-outlined">palette</span>
                </div>
                <div>
                  <p className="font-body-lg text-body-lg">Application Theme</p>
                  <p className="text-xs text-on-surface-variant">Customize your visual experience</p>
                </div>
              </div>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="text-sm font-medium text-primary">{settings.theme}</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
            
            {showThemeDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-white/10 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                {THEMES.map(theme => (
                  <div 
                    key={theme.name}
                    onClick={() => {
                      updateSetting('theme', theme.name);
                      setShowThemeDropdown(false);
                    }}
                    className={`p-md cursor-pointer hover:bg-white/5 flex items-center justify-between ${settings.theme === theme.name ? 'bg-primary/5 text-primary' : 'text-on-surface'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]" style={{ backgroundColor: theme.color }}></span>
                      <span>{theme.name}</span>
                    </div>
                    {settings.theme === theme.name && <span className="material-symbols-outlined text-sm">check</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
