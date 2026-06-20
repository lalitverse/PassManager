import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    navigate('/login', { replace: true });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        updateProfile({ avatar: dataUrl });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const startEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const saveEdit = async () => {
    if (editValue.trim() !== '') {
      await updateProfile({ [editingField]: editValue.trim() });
    }
    setEditingField(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-lg relative pb-xl">
      <header className="mb-xl flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-xs">Profile</h1>
          <p className="text-on-surface-variant font-body-md text-body-md">Manage your personal information and account details.</p>
        </div>
        <button 
          onClick={() => setShowLogoutModal(true)}
          className="px-6 py-2 bg-error/10 text-error hover:bg-error/20 rounded-xl font-bold transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </header>

      {/* Hidden File Input for Avatar Upload */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
      />

      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
        <ProfileCard />
        <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-white text-3xl mb-1">photo_camera</span>
          <span className="text-white text-sm font-medium">Change Photo</span>
        </div>
      </div>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-primary font-label-md mb-md px-xs">Personal Details</h2>
        <div className="glass-card rounded-xl overflow-hidden divide-y divide-white/5">
          <div className="p-md flex items-center justify-between hover:bg-surface-variant/10 transition-colors">
            <div className="flex items-center gap-md w-full">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg flex-shrink-0">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="flex-grow">
                <p className="font-body-lg text-body-lg">Full Name</p>
                {editingField === 'name' ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input 
                      type="text" 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)}
                      className="bg-surface-container border border-outline/30 rounded px-2 py-1 text-sm w-full text-on-surface focus:border-primary focus:outline-none"
                      autoFocus
                    />
                    <button onClick={saveEdit} className="text-primary hover:text-primary-container p-1"><span className="material-symbols-outlined text-sm">check</span></button>
                    <button onClick={() => setEditingField(null)} className="text-on-surface-variant hover:text-error p-1"><span className="material-symbols-outlined text-sm">close</span></button>
                  </div>
                ) : (
                  <p className="text-xs text-on-surface-variant">{user?.name}</p>
                )}
              </div>
            </div>
            {editingField !== 'name' && (
              <button onClick={() => startEdit('name', user?.name)} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            )}
          </div>
          
          <div className="p-md flex items-center justify-between hover:bg-surface-variant/10 transition-colors">
            <div className="flex items-center gap-md w-full">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg flex-shrink-0">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="flex-grow">
                <p className="font-body-lg text-body-lg">Email Address</p>
                {editingField === 'email' ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input 
                      type="email" 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)}
                      className="bg-surface-container border border-outline/30 rounded px-2 py-1 text-sm w-full text-on-surface focus:border-primary focus:outline-none"
                      autoFocus
                    />
                    <button onClick={saveEdit} className="text-primary hover:text-primary-container p-1"><span className="material-symbols-outlined text-sm">check</span></button>
                    <button onClick={() => setEditingField(null)} className="text-on-surface-variant hover:text-error p-1"><span className="material-symbols-outlined text-sm">close</span></button>
                  </div>
                ) : (
                  <p className="text-xs text-on-surface-variant">{user?.email}</p>
                )}
              </div>
            </div>
            {editingField !== 'email' && (
              <button onClick={() => startEdit('email', user?.email)} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-primary font-label-md mb-md px-xs">Account Meta</h2>
        <div className="glass-card rounded-xl overflow-hidden divide-y divide-white/5">
          <div className="p-md flex items-center justify-between">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 flex items-center justify-center bg-surface-variant/20 text-on-surface-variant rounded-lg">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="font-body-lg text-body-lg">Account Creation</p>
                <p className="text-xs text-on-surface-variant">{new Date(user?.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="p-md flex items-center justify-between">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 flex items-center justify-center bg-surface-variant/20 text-on-surface-variant rounded-lg">
                <span className="material-symbols-outlined">login</span>
              </div>
              <div>
                <p className="font-body-lg text-body-lg">Last Login</p>
                <p className="text-xs text-on-surface-variant">{new Date(user?.lastLogin).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-surface-container-high border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-on-surface mb-6">Are you sure you want to logout?</h3>
              <div className="flex items-center gap-3 w-full">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 bg-surface-variant text-on-surface rounded-xl font-semibold hover:bg-surface-variant/80 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmLogout}
                  className="flex-1 py-3 bg-error text-on-error rounded-xl font-semibold hover:brightness-110 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
