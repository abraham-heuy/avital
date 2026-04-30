// VerifyCode.tsx – clean, matches Login pattern, dotted code inputs
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyCode, resendVerificationCode } from '../../services/api.service';
import { BaseLayout } from '../../components/BaseLayout';

export const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

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
      setError('Please enter the 6‑digit code');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await verifyCode(email, fullCode);
      setSuccess('Account verified! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError('');
    try {
      await resendVerificationCode(email);
      setSuccess('A new code has been sent to your email and WhatsApp.');
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend code.');
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
            <p className="text-ink-soft text-sm mt-2 font-sketch">Verify your account</p>
            <p className="text-ink-faint text-xs mt-1 font-sketch">Enter the 6‑digit code sent to {email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code inputs row – DOTTED BORDER, BLACK TEXT */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-ink-soft mb-2 font-sketch">
                Verification code
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
              {isLoading ? 'Verifying...' : 'Verify →'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="text-xs text-ink-soft hover:text-accent-limeStrong transition-colors disabled:opacity-50 font-sketch"
            >
              {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};