import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main')
    }, 3200)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-rb-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.08,
        transition: { duration: 0.7, ease: [0.36, 0.66, 0.6, 1] }
      }}
    >
      {/* ── Background with grid overlay (matching Hero section) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Slow-drifting blobs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ left: '5%', top: '15%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ right: '5%', bottom: '10%' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-rb-blue/3 blur-2xl"
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{ left: '45%', top: '40%' }}
        />

        {/* Subtle grid overlay - matching Hero section exactly */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #c9ced6) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #c9ced6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="text-center relative z-10 px-4">
        {/* Animated background glow behind logo */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.2, 0],
            scale: [0.8, 1.5, 2]
          }}
          transition={{ 
            duration: 2.5,
            times: [0, 0.5, 1],
            repeat: 0
          }}
        >
          <div className="w-64 h-64 rounded-full bg-rb-blue blur-3xl mx-auto" />
        </motion.div>

        {/* Main logo with scale and blur animation */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-display font-bold tracking-tight text-rb-silver mb-4"
          initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: "blur(0px)"
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          AVITAL
        </motion.h1>

        {/* Animated underline with gradient */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
          className="h-[2px] bg-gradient-to-r from-transparent via-rb-blue to-transparent origin-center mx-auto"
          style={{ width: '60%' }}
        />

        {/* Tagline with staggered animation */}
        <div className="mt-6 overflow-hidden">
          <motion.p
            className="text-rb-light text-base sm:text-lg md:text-xl tracking-wide font-light"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          >
            student tech consultation
          </motion.p>
        </div>

        {/* Secondary text */}
        <motion.p
          className="text-rb-gray text-sm md:text-base mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          for complex projects
        </motion.p>

        {/* Loading dots with blue color matching theme */}
        <motion.div
          className="flex justify-center gap-2.5 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-rb-blue"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}