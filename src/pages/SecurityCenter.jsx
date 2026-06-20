import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../hooks/useVault';
import { useSettings } from '../hooks/useSettings';
import { useNotifications } from '../hooks/useNotifications';

export default function SecurityCenter() {
  const navigate = useNavigate();
  const { vault, scanVault, scanHistory, latestScan } = useVault();
  const { settings, updateSetting } = useSettings();
  const { notify } = useNotifications();
  
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate scan delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    await scanVault();
    setIsScanning(false);
  };

  const handleResolveIdentity = () => {
    notify('Identity Alert Resolved', 'The credential stuffing risk has been mitigated and marked as resolved.');
  };

  const handleRotatePassword = () => {
    navigate('/vault?filter=weak');
  };

  return (
    <div className="space-y-lg">
      <header className="mb-xl">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-xs">Security Center</h1>
        <p className="text-on-surface-variant font-body-md text-body-md">Monitor and improve your overall password health.</p>
      </header>

      <section className="glass-panel p-xl rounded-2xl flex flex-col md:flex-row items-center justify-between gap-lg mb-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-1000"></div>
        <div className="relative z-10 flex items-center gap-lg w-full md:w-auto">
          <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center border border-white/10 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-surface-container-highest" />
              <circle 
                cx="40" 
                cy="40" 
                r="36" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="transparent" 
                strokeDasharray={`${latestScan.score * 2.26} 226`} 
                className={`transition-all duration-1000 ${latestScan.score < 50 ? 'text-error' : latestScan.score < 80 ? 'text-tertiary' : 'text-secondary'}`} 
              />
            </svg>
            <span className={`absolute font-headline-md font-bold ${latestScan.score < 50 ? 'text-error' : latestScan.score < 80 ? 'text-tertiary' : 'text-secondary'}`}>
              {latestScan.score}
            </span>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Overall Health Score</h2>
            <p className="text-on-surface-variant mt-1">
              {latestScan.score < 50 ? 'Critical vulnerabilities detected.' : 
               latestScan.score < 80 ? 'Room for improvement.' : 
               'Your vault is highly secure.'}
            </p>
          </div>
        </div>
        <button 
          onClick={handleScan}
          disabled={isScanning}
          className="w-full md:w-auto relative z-10 px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-sm disabled:opacity-70 disabled:active:scale-100"
        >
          {isScanning ? (
            <span className="material-symbols-outlined animate-spin" data-icon="sync">sync</span>
          ) : (
            <span className="material-symbols-outlined" data-icon="policy">policy</span>
          )}
          {isScanning ? 'SCANNING...' : 'SCAN NOW'}
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-xl">
        <div 
          onClick={() => navigate('/vault')}
          className="glass-card p-lg rounded-2xl flex flex-col gap-sm cursor-pointer hover:bg-surface-variant/10 transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-3xl">lock</span>
          <span className="text-3xl font-bold text-on-surface mt-2">{vault.length}</span>
          <span className="text-label-md text-on-surface-variant uppercase">Total Items</span>
        </div>
        <div 
          onClick={() => navigate('/vault?filter=strong')}
          className="glass-card p-lg rounded-2xl flex flex-col gap-sm cursor-pointer hover:bg-secondary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
          <span className="text-3xl font-bold text-secondary mt-2">{latestScan.strong}</span>
          <span className="text-label-md text-on-surface-variant uppercase">Strong Passwords</span>
        </div>
        <div 
          onClick={() => navigate('/vault?filter=weak')}
          className="glass-card p-lg rounded-2xl flex flex-col gap-sm cursor-pointer hover:bg-tertiary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-tertiary text-3xl">warning</span>
          <span className="text-3xl font-bold text-tertiary mt-2">{latestScan.weak}</span>
          <span className="text-label-md text-on-surface-variant uppercase">Weak Passwords</span>
        </div>
        <div 
          onClick={() => navigate('/vault?filter=reused')}
          className="glass-card p-lg rounded-2xl flex flex-col gap-sm cursor-pointer hover:bg-error/5 transition-colors"
        >
          <span className="material-symbols-outlined text-error text-3xl">error</span>
          <span className="text-3xl font-bold text-error mt-2">{latestScan.reused}</span>
          <span className="text-label-md text-on-surface-variant uppercase">Reused Passwords</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <section className="space-y-md">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Action Required</h3>
          <div className="flex flex-col gap-md">
            {latestScan.weak > 0 && (
              <div className="glass-panel p-lg rounded-xl border-l-4 border-l-tertiary flex flex-col sm:flex-row sm:items-center justify-between gap-md">
                <div>
                  <h4 className="font-bold text-on-surface">Weak Passwords Detected</h4>
                  <p className="text-body-md text-on-surface-variant mt-1">{latestScan.weak} accounts are using easily guessable passwords.</p>
                </div>
                <button onClick={handleRotatePassword} className="whitespace-nowrap px-4 py-2 border border-white/10 hover:bg-white/5 text-on-surface rounded-lg transition-colors font-label-md">
                  Rotate Now
                </button>
              </div>
            )}
            
            <div className="glass-panel p-lg rounded-xl border-l-4 border-l-error flex flex-col sm:flex-row sm:items-center justify-between gap-md">
              <div>
                <h4 className="font-bold text-on-surface">Credential Stuffing Risk</h4>
                <p className="text-body-md text-on-surface-variant mt-1">Multiple accounts share the exact same password.</p>
              </div>
              <button onClick={handleResolveIdentity} className="whitespace-nowrap px-4 py-2 border border-white/10 hover:bg-white/5 text-on-surface rounded-lg transition-colors font-label-md">
                Resolve
              </button>
            </div>
            
            {latestScan.weak === 0 && latestScan.reused === 0 && (
               <div className="glass-panel p-lg rounded-xl border-l-4 border-l-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-md">
                <div>
                  <h4 className="font-bold text-on-surface">All Clear</h4>
                  <p className="text-body-md text-on-surface-variant mt-1">No immediate security actions are required.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-md">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Monitoring Features</h3>
          <div className="flex flex-col gap-md">
            <div className="glass-card p-lg rounded-xl flex items-center justify-between group">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined" data-icon="fingerprint">fingerprint</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Biometric Unlock</h4>
                  <p className="text-body-md text-on-surface-variant mt-1">Require Windows Hello or TouchID.</p>
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

            <div className="glass-card p-lg rounded-xl flex items-center justify-between group">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined" data-icon="radar">radar</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Dark Web Monitor</h4>
                  <p className="text-body-md text-on-surface-variant mt-1">Scan for exposed email addresses.</p>
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
            
            <div className="mt-4">
              <h4 className="text-on-surface-variant text-label-md uppercase mb-2">Recent Scans</h4>
              {scanHistory.slice(0, 3).map(scan => (
                <div key={scan.id} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-body-md text-on-surface">{new Date(scan.timestamp).toLocaleString()}</span>
                  <span className="text-body-md font-bold text-primary">Score: {scan.score}%</span>
                </div>
              ))}
              {scanHistory.length === 0 && (
                <div className="text-body-md text-on-surface-variant">No scans performed yet.</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
