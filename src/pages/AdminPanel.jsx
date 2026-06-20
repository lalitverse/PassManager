import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedUsers = await storage.get('cv_admin_users_log');
      if (storedUsers) {
        setUsers(storedUsers.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin)));
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-lg h-full pb-xl">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline-lg text-headline-lg text-primary">Admin Control Panel</h2>
        <p className="text-on-surface-variant">System administration and global configurations.</p>
      </div>
      
      <div className="glass-panel p-lg rounded-2xl flex-1 flex flex-col">
        <div className="flex items-center gap-md mb-lg border-b border-white/5 pb-md">
          <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[28px]" data-icon="admin_panel_settings">admin_panel_settings</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Registered Users</h3>
            <p className="text-sm text-on-surface-variant">Monitor system access and login history</p>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-xl">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">group_off</span>
            <p className="text-on-surface-variant">No user data available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md overflow-y-auto pr-2 custom-scrollbar">
            {users.map((u, idx) => (
              <div key={idx} className="bg-surface-container border border-white/5 rounded-xl p-md hover:bg-surface-container-high transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">{u.name}</h4>
                      <p className="text-xs text-on-surface-variant">{u.email}</p>
                    </div>
                  </div>
                  <div className="bg-surface-variant text-on-surface-variant text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {u.totalLogins} Logins
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Created:</span>
                    <span className="text-on-surface">{new Date(u.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Last Login:</span>
                    <span className="text-on-surface text-right max-w-[150px] truncate" title={new Date(u.lastLogin).toLocaleString()}>{new Date(u.lastLogin).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
