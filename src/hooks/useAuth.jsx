import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useActivity } from './useActivity';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logActivity } = useActivity();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await storage.get('cv_user');
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const getLocalUsers = async () => {
    return (await storage.get('cv_users')) || [];
  };

  const setLocalUsers = async (users) => {
    await storage.set('cv_users', users);
  };

  const registerLocalUser = async (name, email, password) => {
    const users = await getLocalUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    await setLocalUsers([...users, newUser]);
  };

  const validateLocalLogin = async (email, password) => {
    const users = await getLocalUsers();
    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    return user;
  };

  const resetLocalPassword = async (email, newPassword) => {
    const users = await getLocalUsers();
    const index = users.findIndex(u => u.email === email);
    if (index === -1) {
      throw new Error('User not found');
    }
    users[index].password = newPassword;
    await setLocalUsers(users);
  };

  const login = async (name, email) => {
    const newUser = {
      name,
      email,
      avatar: null,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    const existingUser = await storage.get('cv_user');
    if (existingUser && existingUser.email === email) {
      newUser.createdAt = existingUser.createdAt;
      if (existingUser.avatar) newUser.avatar = existingUser.avatar;
    }

    setUser(newUser);
    await storage.set('cv_user', newUser);
    await logActivity('Login', `User ${email} logged in`);

    const allUsers = await storage.get('cv_admin_users_log') || [];
    const userIndex = allUsers.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
      allUsers[userIndex].lastLogin = new Date().toISOString();
      allUsers[userIndex].totalLogins = (allUsers[userIndex].totalLogins || 1) + 1;
      allUsers[userIndex].name = name;
    } else {
      allUsers.push({
        name,
        email,
        createdAt: newUser.createdAt,
        lastLogin: newUser.lastLogin,
        totalLogins: 1
      });
    }
    await storage.set('cv_admin_users_log', allUsers);
  };

  const updateProfile = async (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      storage.set('cv_user', updated);
      return updated;
    });
    await logActivity('Profile Updated', 'User profile information updated');
  };

  const logout = async () => {
    await logActivity('Logout', `User ${user?.email} logged out`);
    setUser(null);
    await storage.remove('cv_user');
  };

  const isAdmin = user?.email === 'lalithirvey6@gmail.com';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading, updateProfile, registerLocalUser, validateLocalLogin, resetLocalPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
