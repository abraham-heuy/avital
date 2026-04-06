import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const navigate = useNavigate()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const stats = [
    { value: '< 1hr', label: 'Average response time' },
    { value: '95%', label: 'Match satisfaction rate' },
    { value: '100+', label: 'Projects completed' },
    { value: '50+', label: 'Active consultants' },
  ]

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative bg-rb-black pt-0 pb-20 md:pb-32 overflow-hidden"
    >
      {/* ── Background ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-blue/8 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '-10%', top: '0%' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-steel/8 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{ right: '-10%', bottom: '0%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-rb-blue/5 blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ left: '40%', top: '30%' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #ccc) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #ccc) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          className="text-center mb-14 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-6"
          >
            Get Started
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rb-silver leading-tight"
          >
            Your project deserves
            <br />
            <span className="text-rb-blue">the right support</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="w-24 h-0.5 bg-gradient-to-r from-rb-blue to-rb-steel mx-auto mt-6 origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="text-rb-gray mt-5 max-w-xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            Fill in a short brief — takes two minutes — and we will match you with the right consultant and get back to you within the hour.
          </motion.p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-rb-silver/10 bg-rb-dark/30 backdrop-blur-sm p-5 text-center"
            >
              <div className="text-2xl font-bold text-rb-blue mb-1">{stat.value}</div>
              <div className="text-xs text-rb-gray leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main CTA card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-rb-blue/25 bg-rb-dark/50 backdrop-blur-md p-8 md:p-12 text-center">

            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-rb-blue/10 via-transparent to-rb-steel/8 pointer-events-none" />

            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-rb-blue/60 to-transparent"
            />

            <div className="relative z-10">
              <p className="text-rb-gray text-sm mb-2 tracking-wide">
                No commitment. No credit card.
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rb-silver mb-4 leading-tight">
                Ready to get started?
              </h3>
              <p className="text-rb-gray text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                Tell us what you are working on. We handle the matching, the scheduling, and everything in between. You just show up and build.
              </p>

              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/apply')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-base hover:opacity-90 transition-all duration-300 shadow-lg mb-4"
              >
                Submit your brief
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>

              <p className="text-rb-gray/40 text-xs mt-4">
                We respond within 1 hour during working hours
              </p>

              {/* Secondary links */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-8 border-t border-rb-silver/10">
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-rb-gray text-sm hover:text-rb-blue transition-colors"
                >
                  Browse services first →
                </button>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-rb-silver/20" />
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-rb-gray text-sm hover:text-rb-blue transition-colors"
                >
                  See student projects →
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}