import { useState } from 'react';
import { useActivity } from '../hooks/useActivity';
import { useNotifications } from '../hooks/useNotifications';

export default function Activity() {
  const { activities, clearActivity } = useActivity();
  const { clearNotifications } = useNotifications();
  const [showClearModal, setShowClearModal] = useState(false);

  const getIconForAction = (action) => {
    const act = action.toLowerCase();
    if (act.includes('login')) return 'login';
    if (act.includes('logout')) return 'logout';
    if (act.includes('delete')) return 'delete';
    if (act.includes('edit')) return 'edit';
    if (act.includes('add')) return 'add_circle';
    if (act.includes('scan')) return 'policy';
    if (act.includes('setting') || act.includes('enable') || act.includes('disable')) return 'settings';
    if (act.includes('generat')) return 'key';
    if (act.includes('cop')) return 'content_copy';
    return 'history';
  };

  const getColorClass = (action) => {
    const act = action.toLowerCase();
    if (act.includes('delete')) return 'bg-error/10 text-error';
    if (act.includes('scan')) return 'bg-secondary/10 text-secondary';
    if (act.includes('add') || act.includes('login')) return 'bg-primary/10 text-primary';
    if (act.includes('edit') || act.includes('generat')) return 'bg-tertiary/10 text-tertiary';
    return 'bg-surface-variant/20 text-on-surface-variant';
  };

  const handleClearActivity = async () => {
    await clearActivity();
    await clearNotifications();
    setShowClearModal(false);
  };

  return (
    <div className="space-y-lg relative">
      <header className="mb-xl flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-xs">Activity</h1>
          <p className="text-on-surface-variant font-body-md text-body-md">Review your recent vault activity and access logs.</p>
        </div>
        {activities.length > 0 && (
          <button 
            onClick={() => setShowClearModal(true)}
            className="px-4 py-2 bg-error/10 text-error hover:bg-error/20 rounded-xl font-bold transition-colors flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
            Clear All
          </button>
        )}
      </header>

      <div className="glass-card rounded-xl overflow-hidden divide-y divide-white/5">
        {activities.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-4xl opacity-50">history_toggle_off</span>
            <p>No recent activity found.</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="p-md flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-md">
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${getColorClass(activity.action)}`}>
                  <span className="material-symbols-outlined">{getIconForAction(activity.action)}</span>
                </div>
                <div>
                  <p className="font-body-lg text-body-lg text-on-surface">{activity.action}</p>
                  <p className="text-xs text-on-surface-variant">{activity.details}</p>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant text-right max-w-[80px]">
                {new Date(activity.timestamp).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Clear Activity Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-surface-container-high border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">Clear History</h3>
              <p className="text-on-surface-variant text-sm mb-6">Are you sure you want to clear all activity history?</p>
              <div className="flex items-center gap-3 w-full">
                <button 
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 py-3 bg-surface-variant text-on-surface rounded-xl font-semibold hover:bg-surface-variant/80 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClearActivity}
                  className="flex-1 py-3 bg-error text-on-error rounded-xl font-semibold hover:brightness-110 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
