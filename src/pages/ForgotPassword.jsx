import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { resetLocalPassword } = useAuth();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock sending an email
      await new Promise(resolve => setTimeout(resolve, 500));
      setStep(2);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      await resetLocalPassword(email, password);
      setSuccess('Password successfully reset.');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden p-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full max-w-md p-8 md:p-10 md:rounded-3xl glass-card flex flex-col justify-center relative z-10 border border-white/5 shadow-2xl">
        <button 
          onClick={() => step === 1 ? navigate('/login') : setStep(1)}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center hover:bg-surface-variant transition-colors group"
        >
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface transition-colors">arrow_back</span>
        </button>

        <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{step === 1 ? 'lock_reset' : 'password'}</span>
        </div>

        <div className="mb-8 text-center mt-8">
          <h1 className="text-3xl font-bold text-on-surface mb-2">
            {step === 1 ? 'Reset Password' : 'Set New Password'}
          </h1>
          <p className="text-on-surface-variant text-body-lg">
            {step === 1 
              ? 'Enter your account email address to continue.' 
              : 'Please enter a strong new password below.'}
          </p>
        </div>

        {error && (
          <div className="w-full bg-error/10 border border-error/20 text-error p-3 rounded-xl mb-6 text-center text-sm font-medium animate-pulse">
            {error}
          </div>
        )}

        {success && (
          <div className="w-full bg-success/10 border border-success/20 text-success p-3 rounded-xl mb-6 text-center text-sm font-medium">
            {success}
            <p className="mt-1 opacity-80">Redirecting to login...</p>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="w-full flex flex-col gap-5">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
              <input
                type="email"
                className="w-full bg-surface-container-lowest border border-white/5 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-4 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:active:scale-100"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-5">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
              <input
                type="password"
                className="w-full bg-surface-container-lowest border border-white/5 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting || success}
              />
            </div>

            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock_check</span>
              <input
                type="password"
                className="w-full bg-surface-container-lowest border border-white/5 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting || success}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full mt-2 py-4 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:active:scale-100"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
