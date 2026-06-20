import { NavLink } from 'react-router-dom';
import { navigationLinks } from '../utils/navigation';
import { useAuth } from '../hooks/useAuth';

export default function BottomNav() {
  const { isAdmin } = useAuth();
  
  const links = [...navigationLinks];
  if (isAdmin) {
    links.push({
      name: 'Admin',
      path: '/admin',
      icon: 'admin_panel_settings'
    });
  }

  return (
    <nav className="fixed bottom-0 w-full md:hidden z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface-container/90 backdrop-blur-lg border-t border-white/5 shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 scale-90 duration-200 transition-all ${
              isActive
                ? 'bg-primary-container/20 text-primary rounded-xl'
                : 'text-on-surface-variant active:bg-white/5'
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
              <span className="font-label-md text-label-md">{link.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
