import { useState } from 'react';
import { useActivity } from '../hooks/useActivity';

export default function PasswordCard({ item, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { logActivity } = useActivity();

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.password);
      logActivity('Password Copied', `Copied password for ${item.title}`);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="vault-item group">
      <div 
        className="glass-card p-md md:p-lg rounded-2xl flex items-center gap-lg cursor-pointer relative"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>
            {item.icon || 'public'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.title}</h3>
          <p className="text-on-surface-variant truncate">{item.subtitle}</p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-2 pr-4">
          <span className={`px-3 py-1 rounded-full text-label-md border ${
            item.status === 'SECURE' ? 'bg-secondary/10 text-secondary border-secondary/20' : 
            item.status === 'WEAK' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' : 
            item.status === 'REUSED' ? 'bg-error/10 text-error border-error/20' :
            'bg-surface-variant text-on-surface-variant border-outline/20'
          }`}>
            {item.status}
          </span>
          <p className="text-[10px] text-on-surface-variant">Last updated {new Date(item.updatedAt).toLocaleDateString()}</p>
        </div>
        <span 
          className="material-symbols-outlined text-outline group-hover:text-on-surface transition-transform duration-300" 
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          expand_more
        </span>
      </div>

      <div 
        className={`overflow-hidden transition-all duration-300 px-md ${expanded ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
      >
        <div className="pt-4 pb-6 border-x border-b border-white/5 rounded-b-2xl bg-surface-container-low/30 backdrop-blur-md">
          {showConfirmDelete ? (
            <div className="px-lg flex flex-col items-center justify-center text-center gap-md py-md">
              <span className="material-symbols-outlined text-error text-4xl">warning</span>
              <p className="text-body-md text-on-surface">Are you sure you want to delete this password permanently?</p>
              <div className="flex gap-md w-full max-w-xs mt-sm">
                <button onClick={() => setShowConfirmDelete(false)} className="flex-1 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-on-surface font-bold">Cancel</button>
                <button onClick={() => onDelete(item.id)} className="flex-1 py-2 rounded-xl bg-error text-on-error hover:brightness-110 transition-all font-bold shadow-lg">Delete</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg px-lg">
              <div className="space-y-4">
                {(item.status === 'WEAK' || item.status === 'REUSED') ? (
                  <div className={`p-4 rounded-xl flex gap-3 ${item.status === 'REUSED' ? 'bg-error-container/10 border-error/20' : 'bg-tertiary/10 border-tertiary/20'} border`}>
                    <span className={`material-symbols-outlined ${item.status === 'REUSED' ? 'text-error' : 'text-tertiary'}`}>warning</span>
                    <div>
                      <p className={`text-xs font-bold ${item.status === 'REUSED' ? 'text-error' : 'text-tertiary'}`}>
                        {item.status === 'REUSED' ? 'Reused Password Detected' : 'Weak Password Detected'}
                      </p>
                      <p className="text-[10px] text-on-surface-variant mt-1">Change it to improve security score.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs text-on-surface-variant uppercase block mb-1">Password Status</label>
                    <p className="text-sm text-secondary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified_user</span> Secure
                    </p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button onClick={handleCopy} className="flex-1 bg-primary text-on-primary py-2.5 rounded-xl font-label-md flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg">
                    <span className="material-symbols-outlined text-sm">content_copy</span> Copy Password
                  </button>
                  <button onClick={() => onEdit(item)} className="flex-1 border border-white/10 hover:bg-white/5 py-2.5 rounded-xl font-label-md flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-sm">edit</span> Edit
                  </button>
                  <button onClick={() => setShowConfirmDelete(true)} className="flex-1 bg-error/10 text-error hover:bg-error/20 py-2.5 rounded-xl font-label-md flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-sm">delete</span> Delete
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                  <span className="text-xs text-on-surface-variant">URL</span>
                  <span className="text-xs text-primary truncate ml-4">{item.url || 'N/A'}</span>
                </div>
                {item.notes && (
                  <div className="flex flex-col p-3 rounded-lg bg-black/20">
                    <span className="text-xs text-on-surface-variant mb-1">Notes</span>
                    <span className="text-xs text-on-surface">{item.notes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
