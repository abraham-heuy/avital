import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyCode, resendVerificationCode } from '../../services/api.service';

export const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [particles, setParticles] = useState<{ x: number; y: number; life: number; size: number; id: number }[]>([]);
  const requestRef = useRef<number>(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

  // Particle trail effect
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
            <p className="text-rb-gray text-sm mt-2">Verify your account</p>
            <p className="text-rb-gray text-xs mt-1">Enter the 6‑digit code sent to {email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-rb-silver/50 mb-2">
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
                    className="w-12 h-12 text-center text-xl font-bold bg-transparent border-b border-rb-silver/30 text-rb-silver focus:border-rb-blue focus:outline-none transition-all"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
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
              {isLoading ? 'Verifying...' : 'Verify →'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="text-xs text-rb-gray hover:text-rb-blue transition-colors disabled:opacity-50"
            >
              {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};