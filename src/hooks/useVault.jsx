import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useActivity } from './useActivity';
import { useNotifications } from './useNotifications';

const VaultContext = createContext();

export const useVault = () => useContext(VaultContext);

// Helper to determine strength
const calculateStrength = (password) => {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 16) score++;
  return score >= 3 ? 'SECURE' : 'WEAK';
};

export function VaultProvider({ children }) {
  const [vault, setVault] = useState([]);
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { logActivity } = useActivity();
  const { notify } = useNotifications();

  useEffect(() => {
    const load = async () => {
      const vData = await storage.get('cv_vault');
      const sData = await storage.get('cv_scan_history');
      if (vData) setVault(vData);
      if (sData) setScanHistory(sData);
      setLoading(false);
    };
    load();
  }, []);

  const saveVault = async (newVault) => {
    setVault(newVault);
    await storage.set('cv_vault', newVault);
  };

  const addPassword = async (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      icon: 'key',
      status: 'UNKNOWN' // Requires scan to update
    };
    const newVault = [newEntry, ...vault];
    await saveVault(newVault);
    await logActivity('Password Added', `Added entry for ${entry.title}`);
    await notify('Vault Updated', `Password for ${entry.title} added successfully.`);
  };

  const editPassword = async (id, updates) => {
    const entryIndex = vault.findIndex(v => v.id === id);
    if (entryIndex === -1) return;
    
    const updatedVault = [...vault];
    updatedVault[entryIndex] = {
      ...updatedVault[entryIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
      status: 'UNKNOWN' // Requires re-scan
    };
    await saveVault(updatedVault);
    await logActivity('Password Edited', `Edited entry for ${updatedVault[entryIndex].title}`);
  };

  const deletePassword = async (id) => {
    const entry = vault.find(v => v.id === id);
    if (!entry) return;
    const newVault = vault.filter(v => v.id !== id);
    await saveVault(newVault);
    await logActivity('Password Deleted', `Deleted entry for ${entry.title}`);
    await notify('Vault Updated', `Password for ${entry.title} deleted.`);
  };

  const scanVault = async () => {
    const passCounts = {};
    vault.forEach(v => {
      passCounts[v.password] = (passCounts[v.password] || 0) + 1;
    });

    const updatedVault = vault.map(v => {
      let status = calculateStrength(v.password);
      if (passCounts[v.password] > 1) {
        status = 'REUSED';
      }
      return { ...v, status };
    });

    await saveVault(updatedVault);

    // Compute stats
    const strong = updatedVault.filter(v => v.status === 'SECURE').length;
    const weak = updatedVault.filter(v => v.status === 'WEAK').length;
    const reused = updatedVault.filter(v => v.status === 'REUSED').length;

    let totalScore = 100;
    totalScore -= (weak * 10);
    totalScore -= (reused * 20);
    if (totalScore < 0) totalScore = 0;
    if (vault.length === 0) totalScore = 100;

    const newScan = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      total: vault.length,
      strong,
      weak,
      reused,
      score: totalScore
    };

    const newHistory = [newScan, ...scanHistory];
    setScanHistory(newHistory);
    await storage.set('cv_scan_history', newHistory);

    await logActivity('Security Scan', `Scan completed. Score: ${totalScore}`);
    await notify('Scan Complete', `Security scan found ${weak} weak and ${reused} reused passwords.`);
  };

  const latestScan = scanHistory[0] || { total: 0, strong: 0, weak: 0, reused: 0, score: 100 };

  return (
    <VaultContext.Provider value={{
      vault,
      loading,
      addPassword,
      editPassword,
      deletePassword,
      scanVault,
      scanHistory,
      latestScan
    }}>
      {children}
    </VaultContext.Provider>
  );
}
