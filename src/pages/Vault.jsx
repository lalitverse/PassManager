import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVault } from '../hooks/useVault';
import PasswordCard from '../components/PasswordCard';
import VaultItemModal from '../components/VaultItemModal';

export default function Vault() {
  const { vault, addPassword, editPassword, deletePassword, latestScan } = useVault();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter'); // 'strong', 'weak', 'reused'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    if (editingItem) {
      await editPassword(editingItem.id, formData);
    } else {
      await addPassword(formData);
    }
  };

  const handleDelete = async (id) => {
    await deletePassword(id);
  };

  const filteredItems = useMemo(() => {
    let items = vault;
    
    if (filterParam) {
      if (filterParam === 'strong') items = items.filter(i => i.status === 'SECURE');
      if (filterParam === 'weak') items = items.filter(i => i.status === 'WEAK');
      if (filterParam === 'reused') items = items.filter(i => i.status === 'REUSED');
    }

    if (searchTerm) {
      items = items.filter(item => 
        (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return items;
  }, [vault, filterParam, searchTerm]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg mb-xl">
        <div>
          <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-on-background mb-1">Password Vault</h2>
          <p className="text-on-surface-variant">
            {filterParam ? `Viewing ${filterParam} passwords.` : `Manage ${vault.length} secure entries across your enterprise.`}
          </p>
        </div>
        <div className="relative w-full md:w-96 group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="w-full bg-surface-container-lowest border-white/5 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
            placeholder="Search passwords, services..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {!filterParam && (
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

      <div className="space-y-4">
        {filteredItems.map(item => (
          <PasswordCard 
            key={item.id} 
            item={item} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant flex flex-col items-center gap-md">
            <span className="material-symbols-outlined text-6xl opacity-50">search_off</span>
            <p>{vault.length === 0 ? "Your vault is empty. Add a new password to get started." : `No items found matching "${searchTerm}"`}</p>
          </div>
        )}
      </div>

      <button 
        onClick={handleAddNew}
        className="fixed bottom-24 md:bottom-12 right-8 w-16 h-16 rounded-2xl bg-primary text-on-primary shadow-[0_0_32px_rgba(173,198,255,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 group"
      >
        <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">add</span>
        <div className="absolute right-20 bg-surface-container-high px-4 py-2 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Add New Entry
        </div>
      </button>

      <VaultItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        item={editingItem}
      />
    </>
  );
}
