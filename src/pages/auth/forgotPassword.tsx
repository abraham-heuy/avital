import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/api.service';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; life: number; size: number; id: number }[]>([]);
  const requestRef = useRef<number>(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

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
    <div
      className="relative min-h-screen bg-rb-black overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background blobs (same) */}
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

      {/* Particles */}
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
            <p className="text-rb-gray text-sm mt-2">Forgot password?</p>
            <p className="text-rb-gray text-xs mt-1">Enter your email to receive a reset code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-rb-silver/50 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-2 bg-transparent border-b border-rb-silver/30 text-rb-silver text-sm placeholder:text-rb-gray/40 focus:border-rb-blue focus:outline-none transition-all"
                placeholder="you@university.ac.ke"
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
              {isLoading ? 'Sending...' : 'Send reset code →'}
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