import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useVault } from '../hooks/useVault';

export default function Dashboard() {
  const { user } = useAuth();
  const { vault, latestScan } = useVault();

  const isEmpty = vault.length === 0;

  return (
    <div className="space-y-lg">
      <header className="mb-xl">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-xs">Dashboard</h1>
        <p className="text-on-surface-variant font-body-md text-body-md">Welcome back, {user?.name || 'User'}. Here is your overview.</p>
      </header>

      {isEmpty ? (
        <div className="glass-card p-xl rounded-2xl flex flex-col items-center justify-center text-center space-y-md border-dashed border-white/20">
          <div className="w-20 h-20 rounded-full bg-surface-variant/20 flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-5xl">inventory_2</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">No Data Available</h2>
          <p className="text-on-surface-variant max-w-md">Your vault is completely empty. Start by adding a password or generating a secure one.</p>
          <Link to="/vault" className="px-6 py-2 bg-primary text-on-primary rounded-xl font-bold mt-4 shadow-lg hover:brightness-110 active:scale-95 transition-all">
            Go to Vault
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
          <div className="glass-card p-lg rounded-2xl flex flex-col justify-between">
            <p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Security Score</p>
            <div className="flex items-end justify-between">
              <span className={`text-4xl font-bold ${latestScan.score < 50 ? 'text-error' : latestScan.score < 80 ? 'text-tertiary' : 'text-secondary'}`}>
                {latestScan.score}%
              </span>
              <div className="flex gap-1 items-end h-8">
                <div className="w-1.5 h-4 bg-secondary/30 rounded-full"></div>
                <div className="w-1.5 h-6 bg-secondary/50 rounded-full"></div>
                <div className="w-1.5 h-8 bg-secondary rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-lg rounded-2xl flex flex-col justify-between">
            <p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Reused Passwords</p>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-on-surface">{latestScan.reused}</span>
              <span className={`material-symbols-outlined text-4xl ${latestScan.reused > 0 ? 'text-error' : 'text-secondary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {latestScan.reused > 0 ? 'warning' : 'check_circle'}
              </span>
            </div>
          </div>
          
          <div className="glass-card p-lg rounded-2xl flex flex-col justify-between bg-primary/5 border-primary/20">
            <p className="text-label-md text-primary uppercase tracking-wider mb-4">Total Items</p>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-on-surface">{vault.length}</span>
              <span className="material-symbols-outlined text-primary text-4xl">inventory_2</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <Link to="/vault" className="glass-card rounded-xl p-xl flex flex-col items-center justify-center text-center space-y-md group hover:bg-surface-variant/10">
          <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center text-primary border border-primary/30 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">lock</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Access Vault</h3>
            <p className="text-body-md text-on-surface-variant mt-2">Manage your saved passwords and secure notes.</p>
          </div>
        </Link>
        
        <Link to="/generator" className="glass-card rounded-xl p-xl flex flex-col items-center justify-center text-center space-y-md group hover:bg-surface-variant/10">
          <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary border border-secondary/30 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">key</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Generate Password</h3>
            <p className="text-body-md text-on-surface-variant mt-2">Create strong, complex passwords for new accounts.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
