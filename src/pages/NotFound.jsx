import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 rounded-full bg-error/10 text-error flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-6xl">error_outline</span>
      </div>
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">404 - Page Not Found</h1>
      <p className="text-on-surface-variant max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
