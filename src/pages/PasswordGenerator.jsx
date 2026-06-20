import { useState, useEffect } from 'react';
import StrengthMeter from '../components/StrengthMeter';
import { useActivity } from '../hooks/useActivity';
import { useNotifications } from '../hooks/useNotifications';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [hasGeneratedInitially, setHasGeneratedInitially] = useState(false);

  const { logActivity } = useActivity();
  const { notify } = useNotifications();

  useEffect(() => {
    generatePassword(hasGeneratedInitially);
    if (!hasGeneratedInitially) {
      setHasGeneratedInitially(true);
    }
  }, [length, options]);

  const generatePassword = async (shouldLog = true) => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (options.upper) charset += upper;
    if (options.lower) charset += lower;
    if (options.numbers) charset += numbers;
    if (options.symbols) charset += symbols;

    if (charset === '') {
      setPassword('Select at least one option');
      setScore(0);
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);

    let newScore = 0;
    if (length >= 12) newScore++;
    if (length >= 20) newScore++;
    if (options.upper && options.lower) newScore++;
    if (options.numbers && options.symbols) newScore++;
    
    // Clamp score to max 4 and min 1 (if valid characters exist)
    if (newScore === 0) newScore = 1;
    setScore(newScore);

    if (shouldLog && hasGeneratedInitially) {
      await logActivity('Generated New Password', `Length: ${length}, Score: ${newScore}/4`);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      await logActivity('Password Copied', `Copied generated password to clipboard`);
      await notify('Password Copied', 'The generated password is ready to use.');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
      <section className="md:col-span-12 glass-panel rounded-xl p-xl flex flex-col gap-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-primary uppercase tracking-widest">Generated Password</label>
          <div className="flex items-center justify-between gap-md group/field">
            <input
              className="bg-transparent border-none p-0 font-mono-code text-[28px] md:text-[42px] leading-tight text-on-surface focus:ring-0 w-full selection:bg-primary/30"
              readOnly
              type="text"
              value={password}
            />
            <button
              className="flex items-center justify-center p-md bg-primary-container text-on-primary-container rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
              onClick={copyToClipboard}
            >
              <span className="material-symbols-outlined" data-icon={copied ? "check" : "content_copy"}>
                {copied ? "check" : "content_copy"}
              </span>
            </button>
          </div>
        </div>
        <StrengthMeter score={score} />
      </section>

      <section className="md:col-span-7 glass-panel rounded-xl p-lg flex flex-col justify-between">
        <div className="flex flex-col gap-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Length</h3>
            <div className="bg-surface-container-high px-md py-sm rounded-lg border border-white/10">
              <span className="font-mono-code text-primary text-headline-sm">{length}</span>
            </div>
          </div>
          <div className="py-md">
            <input
              max="64"
              min="8"
              onChange={(e) => setLength(Number(e.target.value))}
              step="1"
              type="range"
              value={length}
            />
            <div className="flex justify-between mt-sm">
              <span className="font-label-md text-label-md text-on-surface-variant">8</span>
              <span className="font-label-md text-label-md text-on-surface-variant">64</span>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-xl py-md bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-md hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
          onClick={() => generatePassword(true)}
        >
          <span className="material-symbols-outlined" data-icon="refresh">refresh</span>
          GENERATE NEW PASSWORD
        </button>
      </section>

      <section className="md:col-span-5 glass-panel rounded-xl p-lg flex flex-col gap-md">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Parameters</h3>
        <div className="space-y-sm">
          {[
            { id: 'upper', label: 'Uppercase (A-Z)' },
            { id: 'lower', label: 'Lowercase (a-z)' },
            { id: 'numbers', label: 'Numbers (0-9)' },
            { id: 'symbols', label: 'Symbols (!@#$)' }
          ].map((opt) => (
            <label key={opt.id} className="flex items-center justify-between p-md rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <span className="font-body-md text-on-surface">{opt.label}</span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={options[opt.id]}
                  onChange={() => toggleOption(opt.id)}
                  className="sr-only peer"
                  type="checkbox"
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className="md:col-span-12 glass-panel rounded-xl p-lg flex items-center gap-lg border-primary/20 bg-primary/5">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined" data-icon="lightbulb">lightbulb</span>
        </div>
        <div className="flex flex-col gap-xs">
          <h4 className="font-body-md text-on-surface font-bold">Pro Tip: Character Diversity</h4>
          <p className="text-body-md text-on-surface-variant">Mixing symbols, numbers, and cases creates exponential complexity for brute-force attacks. Aim for at least 16 characters for maximum security.</p>
        </div>
      </section>
    </div>
  );
}
