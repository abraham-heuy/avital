// ForgotPassword.tsx – clean, matches Login pattern
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/api.service';
import { BaseLayout } from '../../components/BaseLayout';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setSuccess('A password reset code has been sent to your email and WhatsApp.');
      setTimeout(() => navigate('/reset-password', { state: { email } }), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
            <p className="text-ink-soft text-sm mt-2 font-sketch">Forgot password?</p>
            <p className="text-ink-faint text-xs mt-1 font-sketch">Enter your email to receive a reset code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-ink-soft mb-1 font-sketch">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-2 bg-transparent border-b border-accent-lime/30 text-ink text-sm placeholder:text-ink-faint focus:border-accent-lime/80 focus:outline-none transition-all duration-200 font-sketch"
                placeholder="you@university.ac.ke"
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
              {isLoading ? 'Sending...' : 'Send reset code →'}
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
