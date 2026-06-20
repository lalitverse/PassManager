import { useEffect, useState } from 'react';

export default function SecurityStats({ score }) {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if(current >= score) {
        clearInterval(interval);
      } else {
        current++;
        setCurrentPercent(current);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
      <div className="lg:col-span-2 glass-card rounded-xl p-xl flex flex-col md:flex-row items-center gap-xl relative overflow-hidden group">
        <div className="relative z-10">
          <div 
            className="circular-progress flex items-center justify-center shadow-[0_0_20px_rgba(77,142,255,0.15)]"
            style={{ '--percentage': currentPercent }}
          >
            <div className="text-center">
              <span className="font-headline-lg text-headline-lg text-on-surface block">{currentPercent}</span>
              <span className="font-label-md text-on-surface-variant uppercase tracking-widest">Score</span>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-md relative z-10 text-center md:text-left">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Your Identity is Well Protected</h2>
          <p className="font-body-md text-on-surface-variant max-w-md">Your overall security score has increased by 12% since last month. Keep up the good work by resolving pending alerts.</p>
          <div className="flex flex-wrap gap-sm justify-center md:justify-start">
            <button className="px-md py-2 bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all">Scan Now</button>
            <button className="px-md py-2 border border-outline-variant text-on-surface rounded-lg font-label-md hover:bg-surface-variant/20 active:scale-95 transition-all">View History</button>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
      </div>
      <div className="glass-card rounded-xl p-xl flex flex-col justify-between border-primary/20">
        <div className="space-y-sm">
          <div className="w-12 h-12 bg-secondary-container/20 text-secondary rounded-lg flex items-center justify-center mb-md">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm">Vault Health</h3>
          <p className="font-body-md text-on-surface-variant">All enterprise nodes are synchronized and secured with TLS 1.3 encryption.</p>
        </div>
        <div className="pt-xl flex items-center justify-between">
          <span className="text-secondary font-label-md flex items-center gap-xs">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Healthy
          </span>
          <span className="text-on-surface-variant font-mono-code">v4.2.1-stable</span>
        </div>
      </div>
    </div>
  );
}
