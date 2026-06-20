import { useAuth } from '../hooks/useAuth';

export default function ProfileCard() {
  const { user } = useAuth();
  
  return (
    <div className="glass-card rounded-xl p-lg flex items-center gap-md">
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary flex items-center justify-center bg-primary-container text-on-primary-container text-4xl font-bold">
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
  );
}
