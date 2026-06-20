import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { navigationLinks } from '../utils/navigation';
import { useNotifications } from '../hooks/useNotifications';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../hooks/useAuth';

export default function TopAppBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { notifications, unreadCount, clearNotifications, markAsRead } = useNotifications();
  const { settings, updateSetting } = useSettings();
  const { user } = useAuth();

  const currentRoute = navigationLinks.find(link => currentPath.startsWith(link.path)) || { name: 'Dashboard' };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen && unreadCount > 0) {
      markAsRead();
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-xl dark:bg-background/80 text-primary w-full sticky top-0 z-50 border-b border-white/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16">
      <div className="flex items-center gap-sm md:hidden">
        <span className="material-symbols-outlined text-primary" data-icon="security">security</span>
        <span className="text-headline-md font-headline-md font-bold">CipherVault</span>
      </div>
      <div className="hidden md:block">
        <h2 className="font-headline-sm text-headline-sm text-primary">{currentRoute.name}</h2>
      </div>
      
      <div className="flex items-center gap-md">
        <div className="relative" ref={dropdownRef}>
          <button 
            className="relative material-symbols-outlined p-2 hover:bg-surface-variant/20 rounded-full transition-colors active:scale-95 duration-100" 
            onClick={handleDropdownOpen}
          >
            notifications
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full animate-pulse"></span>
            )}
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-xl shadow-2xl overflow-hidden flex flex-col z-50">
              <div className="p-md border-b border-white/10 flex justify-between items-center bg-surface-container">
                <span className="font-headline-sm text-headline-sm text-on-surface">Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => updateSetting('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-lg text-center text-on-surface-variant text-body-md">
                    No recent notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-md border-b border-white/5 hover:bg-white/5 transition-colors">
                      <div className="font-bold text-on-surface text-label-md mb-1">{notif.title}</div>
                      <div className="text-on-surface-variant text-body-md">{notif.message}</div>
                      <div className="text-[10px] text-outline mt-2">{new Date(notif.timestamp).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <button 
                  onClick={clearNotifications}
                  className="p-md text-center text-primary hover:bg-primary/10 transition-colors font-label-md w-full"
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>

        <Link to="/profile" className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all">
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            user?.name?.charAt(0)?.toUpperCase() || 'U'
          )}
        </Link>
      </div>
    </header>
  );
}
