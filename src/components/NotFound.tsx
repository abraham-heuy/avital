import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const NotFound = () => {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative bg-rb-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - matching all other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '5%', top: '10%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ right: '5%', bottom: '10%' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-rb-blue/3 blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{ left: '40%', top: '50%' }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #c9ced6) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #c9ced6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Mouse-following glow */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full bg-rb-blue/8 blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 blur-3xl bg-rb-blue/20 rounded-full" />
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-display font-bold text-rb-silver tracking-tighter relative z-10">
            4
            <span className="text-rb-blue">0</span>
            4
          </h1>
        </motion.div>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
          className="h-[2px] bg-gradient-to-r from-transparent via-rb-blue to-transparent mx-auto"
          style={{ width: '120px' }}
        />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-rb-silver mt-6"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-rb-gray mt-4 max-w-md mx-auto text-base sm:text-lg leading-relaxed"
        >
          The page you are looking for does not exist or has been moved.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <button
            onClick={() => navigate('/main')}
            className="px-6 sm:px-8 py-2.5 bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold rounded-full shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Go to Homepage →
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 sm:px-8 py-2.5 border border-rb-blue/50 text-rb-blue font-semibold rounded-full hover:bg-rb-blue/10 transition-all duration-300"
          >
            Go Back
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-rb-silver/10"
        >
          <p className="text-xs text-rb-gray/60 mb-3">Quick Links</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {['Services', 'Projects', 'Blogs', 'Community', 'Events'].map((link) => (
              <button
                key={link}
                onClick={() => navigate(link === 'Services' || link === 'Projects' ? '/main' : `/${link.toLowerCase()}`)}
                className="text-xs text-rb-gray hover:text-rb-blue transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}






