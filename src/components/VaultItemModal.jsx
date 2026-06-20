import { useState, useEffect } from 'react';

export default function VaultItemModal({ isOpen, onClose, onSave, item }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    password: '',
    url: '',
    notes: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        subtitle: item.subtitle || '',
        password: item.password || '',
        url: item.url || '',
        notes: item.notes || ''
      });
    } else {
      setFormData({ title: '', subtitle: '', password: '', url: '', notes: '' });
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-xl shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-lg">
          {item ? 'Edit Password' : 'Add New Password'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="text-label-md text-on-surface-variant uppercase tracking-widest pl-2">App / Website Name *</label>
            <input 
              required
              className="bg-surface-container-lowest border-white/5 rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none w-full"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Google Workspace"
            />
          </div>
          
          <div className="flex flex-col gap-xs">
            <label className="text-label-md text-on-surface-variant uppercase tracking-widest pl-2">Username / Email *</label>
            <input 
              required
              className="bg-surface-container-lowest border-white/5 rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none w-full"
              value={formData.subtitle}
              onChange={e => setFormData({...formData, subtitle: e.target.value})}
              placeholder="user@example.com"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-label-md text-on-surface-variant uppercase tracking-widest pl-2">Password *</label>
            <input 
              required
              type="text"
              className="bg-surface-container-lowest border-white/5 rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none w-full font-mono-code"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••••••"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-label-md text-on-surface-variant uppercase tracking-widest pl-2">URL (Optional)</label>
            <input 
              className="bg-surface-container-lowest border-white/5 rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none w-full"
              value={formData.url}
              onChange={e => setFormData({...formData, url: e.target.value})}
              placeholder="https://"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-label-md text-on-surface-variant uppercase tracking-widest pl-2">Notes (Optional)</label>
            <textarea 
              className="bg-surface-container-lowest border-white/5 rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none w-full min-h-[80px]"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              placeholder="Secret questions..."
            />
          </div>

          <div className="flex justify-end gap-md mt-md">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors font-bold"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-primary text-on-primary rounded-xl hover:brightness-110 active:scale-[0.98] transition-all font-bold shadow-lg"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
