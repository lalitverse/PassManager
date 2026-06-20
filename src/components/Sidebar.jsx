import { NavLink, useNavigate } from 'react-router-dom';
import { navigationLinks } from '../utils/navigation';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const links = [...navigationLinks];
  if (isAdmin) {
    links.push({
      name: 'Admin Panel',
      path: '/admin',
      icon: 'admin_panel_settings'
    });
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] hidden md:flex flex-col py-xl bg-surface-container dark:bg-surface-container-low border-r border-white/5 shadow-xl z-50">
      <div className="px-lg mb-xl">
        <h1 className="font-headline-md text-headline-md text-primary font-bold">CipherVault</h1>
      </div>
      
      <nav className="flex-1 px-sm space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-md px-md py-sm rounded-lg transition-all ${
                isActive
                  ? 'bg-primary-container/10 text-primary border-l-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined"
                  data-icon={link.icon}
                  style={isActive && link.fillIcon ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {link.icon}
                </span>
                <span className="font-body-md text-body-md">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-lg pt-lg border-t border-white/5 flex flex-col gap-xs">
        <div 
          className="flex items-center gap-md cursor-pointer hover:bg-surface-container-high p-sm rounded-lg transition-colors -ml-sm"
          onClick={() => navigate('/profile')}
        >
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              getInitials(user?.name)
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-body-md text-on-surface font-semibold truncate w-32" title={user?.name}>{user?.name || 'Guest'}</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider truncate w-32" title={user?.email}>{user?.email || 'No email'}</span>
          </div>
        </div>
        <span className="text-[10px] text-on-surface-variant/60 mt-sm px-sm">
          Last login: {user?.lastLogin ? new Date(user.lastLogin).toLocaleTimeString() : 'N/A'}
        </span>
      </div>
    </aside>
  );
}
