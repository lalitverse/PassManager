import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { storage } from '../utils/storage';

export default function Login() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login, registerLocalUser, validateLocalLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await storage.get('cv_onboarding_completed');
      if (completed) {
        setStep(3);
      }
      setIsLoading(false);
    };
    checkOnboarding();
  }, []);

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const skipToAuth = async (mode) => {
    await storage.set('cv_onboarding_completed', true);
    setIsLoginMode(mode === 'login');
    setStep(3);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim() || (!isLoginMode && !name.trim())) {
      setError('Please fill in all fields');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLoginMode) {
        // Handle Login
        const localUser = await validateLocalLogin(email, password);
        await login(localUser.name, localUser.email);
        await storage.set('cv_onboarding_completed', true);
        navigate('/dashboard', { replace: true });
      } else {
        // Handle Register
        await registerLocalUser(name, email, password);
        setSuccessMsg('Registration successful! You can now log in.');
        setIsLoginMode(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen w-full flex-1 flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      {step === 1 && (
        <div className="w-full max-w-md h-screen md:h-auto md:min-h-[700px] md:rounded-3xl glass-card flex flex-col relative z-10 animate-[fadeIn_0.5s_ease-out] border-none md:border-solid border-white/5">
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
            
            {/* Shield Illustration */}
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
              <span className="material-symbols-outlined text-[120px] text-primary relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>local_police</span>
              <span className="material-symbols-outlined text-[48px] text-background absolute z-20" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              
              <div className="absolute top-0 -left-4 w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center backdrop-blur-md animate-bounce" style={{animationDuration: '3s'}}>
                <span className="material-symbols-outlined text-secondary text-sm">fingerprint</span>
              </div>
              <div className="absolute bottom-4 -right-4 w-12 h-12 bg-tertiary/20 rounded-full flex items-center justify-center backdrop-blur-md animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
                <span className="material-symbols-outlined text-tertiary text-lg">key</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-4 leading-tight">
              <span className="text-primary">Secure.</span> <span className="text-secondary">Store.</span> <span className="text-tertiary">Simplify.</span>
            </h1>
            <p className="text-on-surface-variant text-center text-body-lg">
              Your all-in-one password manager to keep your digital life safe and simple.
            </p>
          </div>

          <div className="p-8 flex flex-col items-center gap-6">
            <div className="flex gap-2">
              <div className="w-6 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>

            <button 
              onClick={handleNextStep}
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              Get Started
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            <button onClick={() => skipToAuth('login')} className="text-on-surface-variant hover:text-primary transition-colors text-sm">
              Already have an account? <span className="font-bold text-primary">Log in</span>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-md h-screen md:h-auto md:min-h-[700px] md:rounded-3xl glass-card flex flex-col relative z-10 animate-[fadeIn_0.5s_ease-out] border-none md:border-solid border-white/5">
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent"></div>
            
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full"></div>
              <span className="material-symbols-outlined text-[140px] text-secondary relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>door_sliding</span>
              <div className="absolute inset-0 border-[4px] border-dashed border-secondary/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
              
              <div className="absolute top-4 -right-4 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-md animate-bounce" style={{animationDuration: '3.5s'}}>
                <span className="material-symbols-outlined text-primary text-sm">cloud_done</span>
              </div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-tertiary/20 rounded-full flex items-center justify-center backdrop-blur-md animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}>
                <span className="material-symbols-outlined text-tertiary text-lg">sync</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-4 leading-tight">
              All Your Passwords,<br/>Always <span className="text-secondary">Protected</span>
            </h1>
            <p className="text-on-surface-variant text-center text-body-lg mb-8">
              Store, manage and protect your passwords with top-notch encryption.
            </p>

            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="flex flex-col items-center gap-2 text-center p-2 rounded-xl bg-surface/50 border border-white/5">
                <span className="material-symbols-outlined text-primary">encrypted</span>
                <span className="text-[10px] text-on-surface-variant font-medium">End-to-End Encryption</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center p-2 rounded-xl bg-surface/50 border border-white/5">
                <span className="material-symbols-outlined text-secondary">cloud</span>
                <span className="text-[10px] text-on-surface-variant font-medium">Secure Cloud Backup</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center p-2 rounded-xl bg-surface/50 border border-white/5">
                <span className="material-symbols-outlined text-tertiary">devices</span>
                <span className="text-[10px] text-on-surface-variant font-medium">Sync Across Devices</span>
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-col items-center gap-6">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-6 h-2 rounded-full bg-secondary"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>

            <button 
              onClick={() => skipToAuth('register')}
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              Continue
            </button>

            <button onClick={() => skipToAuth('login')} className="text-on-surface-variant hover:text-primary transition-colors text-sm">
              Already have an account? <span className="font-bold text-primary">Log in</span>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-md p-8 md:p-10 md:rounded-3xl glass-card flex flex-col justify-center relative z-10 animate-[fadeIn_0.5s_ease-out] border-none md:border-solid border-white/5 min-h-[500px] h-screen md:h-auto overflow-y-auto">
          
          <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">security</span>
          </div>

          <div className="mb-8 text-center mt-8">
            <h1 className="text-3xl font-bold text-on-surface mb-2">
              {isLoginMode ? 'Welcome Back 👋' : 'Create Account ✨'}
            </h1>
            <p className="text-on-surface-variant text-body-lg">
              {isLoginMode ? 'Log in to access your secure vault' : 'Sign up to start securing your passwords'}
            </p>
          </div>

          {error && (
            <div className="w-full bg-error/10 border border-error/20 text-error p-3 rounded-xl mb-6 text-center text-sm font-medium animate-pulse">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="w-full bg-success/10 border border-success/20 text-success p-3 rounded-xl mb-6 text-center text-sm font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="w-full flex flex-col gap-5">
            {!isLoginMode && (
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">person</span>
                <input
                  type="text"
                  className="w-full bg-surface-container-lowest border border-white/5 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            )}

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

            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
              <input
                type="password"
                className="w-full bg-surface-container-lowest border border-white/5 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            
            {isLoginMode && (
              <div className="flex justify-end w-full -mt-2 pr-1">
                <span 
                  className="text-sm text-primary font-bold cursor-pointer hover:underline"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-4 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:active:scale-100"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                isLoginMode ? "Log In" : "Sign Up"
              )}
            </button>
            
            <div className="text-center mt-4">
               <p className="text-sm text-on-surface-variant">
                 {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                 <span 
                   className="font-bold text-primary cursor-pointer hover:underline ml-1" 
                   onClick={() => {
                     setIsLoginMode(!isLoginMode);
                     setError('');
                     setSuccessMsg('');
                   }}
                 >
                   {isLoginMode ? "Sign up" : "Log in"}
                 </span>
               </p>
            </div>
          </form>
        </div>
      )}

      {/* Helper animation style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
