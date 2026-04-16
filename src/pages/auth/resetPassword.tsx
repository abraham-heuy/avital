import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../services/api.service';

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
  const [particles, setParticles] = useState<{ x: number; y: number; life: number; size: number; id: number }[]>([]);
  const requestRef = useRef<number>(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

  // Particle trail (same as login)
  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.02 }))
          .filter((p) => p.life > 0)
      );
      requestRef.current = requestAnimationFrame(animateParticles);
    };
    requestRef.current = requestAnimationFrame(animateParticles);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const distance = Math.hypot(x - lastPositionRef.current.x, y - lastPositionRef.current.y);
    if (distance > 10) {
      const newParticles: { x: number; y: number; life: number; size: number; id: number; }[] = [];
      for (let i = 0; i < 3; i++) {
        newParticles.push({
          x: x + (Math.random() - 0.5) * 15,
          y: y + (Math.random() - 0.5) * 15,
          life: 1,
          size: Math.random() * 4 + 2,
          id: particleIdRef.current++,
        });
      }
      setParticles((prev) => [...prev, ...newParticles].slice(-200));
      lastPositionRef.current = { x, y };
    }
  };

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

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
    <div
      className="relative min-h-screen bg-rb-black overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background blobs (same as login) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/10 blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '5%', top: '10%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/10 blur-3xl"
          animate={{ x: [0, -70, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ right: '5%', bottom: '10%' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #ccc) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #ccc) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Particle trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed rounded-full bg-rb-blue pointer-events-none"
          style={{
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            opacity: p.life * 0.8,
            boxShadow: `0 0 ${p.size * 2}px rgba(167,199,231,0.8)`,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8"
          style={{ background: 'transparent' }}
        >
          <div className="text-center mb-8">
            <div className="text-3xl font-display font-bold text-rb-silver">
              a<span className="text-rb-blue">V</span>ital
            </div>
            <p className="text-rb-gray text-sm mt-2">Reset your password</p>
            <p className="text-rb-gray text-xs mt-1">Enter the code sent to {email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code inputs */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-rb-silver/50 mb-2">
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
                    className="w-12 h-12 text-center text-xl font-bold bg-transparent border-b border-rb-silver/30 text-rb-silver focus:border-rb-blue focus:outline-none transition-all"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
            </div>

            {/* New password */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-rb-silver/50 mb-2">
                New password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-0 py-2 bg-transparent border-b border-rb-silver/30 text-rb-silver text-sm placeholder:text-rb-gray/40 focus:border-rb-blue focus:outline-none transition-all pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center text-rb-gray hover:text-rb-blue transition-colors"
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
              <label className="block text-xs font-semibold tracking-widest uppercase text-rb-silver/50 mb-2">
                Confirm password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-0 py-2 bg-transparent border-b border-rb-silver/30 text-rb-silver text-sm placeholder:text-rb-gray/40 focus:border-rb-blue focus:outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs text-center bg-red-400/10 rounded-lg p-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-400 text-xs text-center bg-green-400/10 rounded-lg p-2">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm hover:opacity-90 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Resetting...' : 'Reset password →'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => navigate('/login')} className="text-xs text-rb-gray hover:text-rb-blue transition-colors">
              Back to login
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};