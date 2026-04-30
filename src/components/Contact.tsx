// Contact.tsx 
import { motion} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const navigate = useNavigate()

 

  const stats = [
    { value: '< 1hr', label: 'Average response time' },
    { value: '95%', label: 'Match satisfaction' },
    { value: '100+', label: 'Projects completed' },
    { value: '50+', label: 'Active consultants' },
  ]

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* No background blobs – inherits BaseLayout canvas */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block px-3 py-1 rounded-full border border-accent-lime/40 bg-fog-lime text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase mb-4 font-sketch"
          >
            Get Started
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight"
          >
            Your project deserves
            <br />
            <span className="text-accent-limeStrong">the right support</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-0.5 bg-gradient-to-r from-accent-lime to-accent-limeStrong mx-auto mt-4"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-ink-soft mt-4 max-w-xl mx-auto text-sm sm:text-base font-sketch"
          >
            Fill in a short brief — takes two minutes — and we'll match you with the right consultant and get back to you within the hour.
          </motion.p>
        </motion.div>

        {/* Stats row – lime accents */}
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
              className="rounded-organic border border-accent-lime/30 bg-fog-lime/5 backdrop-blur-sm p-4 text-center"
            >
              <div className="text-2xl font-bold text-accent-limeStrong font-display">{stat.value}</div>
              <div className="text-[10px] text-ink-faint font-sketch mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA card – dotted artistic border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-organic border-2 border-dashed border-accent-lime/50 bg-fog-lime/10 backdrop-blur-sm p-6 md:p-8 text-center shadow-soft hover:shadow-glow transition-all duration-300">
            {/* Decorative floating corner elements (optional) */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border border-accent-lime/30" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full border border-accent-lime/20" />

            <div className="relative z-10">
              <p className="text-ink-soft text-sm mb-2 font-sketch">No commitment. No credit card.</p>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink mb-3">Ready to get started?</h3>
              <p className="text-ink-soft text-sm max-w-md mx-auto mb-6 font-sketch">
                Tell us what you're working on. We handle the matching, scheduling, and everything in between. You just show up and build.
              </p>

              {/* Animated CTA button with pulse glow */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(166,226,0,0.4)',
                    '0 0 20px rgba(166,226,0,0.8)',
                    '0 0 0px rgba(166,226,0,0.4)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                onClick={() => navigate('/apply')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all duration-300 font-sketch"
              >
                Submit your brief
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  →
                </motion.span>
              </motion.button>

              <p className="text-ink-faint text-[10px] mt-4 font-sketch">
                We respond within 1 hour during working hours
              </p>

              {/* Secondary links */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 pt-6 border-t border-accent-lime/20">
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-ink-soft text-xs hover:text-accent-limeStrong transition-colors font-sketch"
                >
                  Browse services first →
                </button>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-accent-lime/30" />
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-ink-soft text-xs hover:text-accent-limeStrong transition-colors font-sketch"
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