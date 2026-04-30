// ResetPassword.tsx – clean, matches Login pattern, dotted code inputs
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../services/api.service';
import { BaseLayout } from '../../components/BaseLayout';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter the 6‑digit reset code');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await resetPassword(email, fullCode, password);
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid code or email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout>
      {/* Back button */}
      <div className="fixed top-4 left-4 z-20">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1 text-ink-soft hover:text-ink transition-colors text-sm font-sketch bg-fog-lime/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-accent-lime/30"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
      </div>

      {/* Centered form container */}
      <div className="flex items-center justify-center min-h-[80vh] w-full">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-3xl font-display font-bold text-ink">
              a<span className="text-accent-limeStrong">V</span>ital
            </div>
            <p className="text-ink-soft text-sm mt-2 font-sketch">Reset your password</p>
            <p className="text-ink-faint text-xs mt-1 font-sketch">Enter the code sent to {email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code inputs row – DOTTED BORDER, BLACK TEXT */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-ink-soft mb-2 font-sketch">
                Reset code
              </label>
              <div className="flex gap-2 justify-center">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`code-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                    className="w-12 h-12 text-center text-xl font-bold text-ink bg-transparent border-2 border-dotted border-ink/40 rounded-lg focus:border-ink/80 focus:outline-none transition-all font-sketch"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
            </div>

            {/* New password */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-ink-soft mb-1 font-sketch">
                New password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-0 py-2 bg-transparent border-b border-accent-lime/30 text-ink text-sm placeholder:text-ink-faint focus:border-accent-lime/80 focus:outline-none transition-all pr-10 font-sketch"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center text-ink-faint hover:text-accent-limeStrong transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-ink-soft mb-1 font-sketch">
                Confirm password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-0 py-2 bg-transparent border-b border-accent-lime/30 text-ink text-sm placeholder:text-ink-faint focus:border-accent-lime/80 focus:outline-none transition-all font-sketch"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs text-center bg-red-400/10 rounded-lg p-2 font-sketch">
                {error}
              </div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-400 text-xs text-center bg-green-400/10 rounded-lg p-2 font-sketch"
              >
                {success}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all duration-300 disabled:opacity-50 font-sketch"
            >
              {isLoading ? 'Resetting...' : 'Reset password →'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => navigate('/login')} className="text-xs text-ink-soft hover:text-accent-limeStrong transition-colors font-sketch">
              Back to login
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};