import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Vault from '../pages/Vault';
import PasswordGenerator from '../pages/PasswordGenerator';
import SecurityCenter from '../pages/SecurityCenter';
import Activity from '../pages/Activity';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import AdminPanel from '../pages/AdminPanel';
import ForgotPassword from '../pages/ForgotPassword';

function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or a loader
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();
  
  if (loading) return null;
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />

      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <AuthRoute>
            <DashboardLayout />
          </AuthRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="vault" element={<Vault />} />
        <Route path="generator" element={<PasswordGenerator />} />
        <Route path="security" element={<SecurityCenter />} />
        <Route path="activity" element={<Activity />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        
        {/* Admin Route */}
        <Route 
          path="admin" 
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } 
        />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
