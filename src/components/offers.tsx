import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef } from 'react'

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    badge: null,
    flash: null,
    solo: {
      original: 29,
      price: 19,
      discount: 34,
      period: 'one-time',
    },
    group: {
      original: 12,
      price: 8,
      discount: 33,
      period: 'per student',
      minStudents: 3,
      maxStudents: 5,
    },
    description: 'Perfect for a single stuck point — a bug, a concept, or a quick code review.',
    features: [
      '1 x 45-minute consultation session',
      'Pre-session brief form so we come prepared',
      'Session summary and action points after',
      'Follow-up Q&A via chat for 48 hours',
    ],
    accentFrom: 'from-rb-blue/15',
    accentTo: 'to-transparent',
    borderIdle: 'border-rb-silver/15',
    borderHover: 'hover:border-rb-blue/35',
  },
  {
    id: 'builder',
    name: 'Builder',
    badge: 'Most Popular',
    flash: { label: 'Flash Deal', expiresHours: 11, expiresMinutes: 47 },
    solo: {
      original: 79,
      price: 49,
      discount: 38,
      period: 'one-time',
    },
    group: {
      original: 32,
      price: 19,
      discount: 41,
      period: 'per student',
      minStudents: 3,
      maxStudents: 8,
    },
    description: 'Ideal for students building a semester project or preparing for an upcoming deadline.',
    features: [
      '4 x 45-minute consultation sessions',
      'Project architecture review (written report)',
      'Code review with annotated inline feedback',
      'Priority matching to domain-relevant consultant',
      '7-day chat support between sessions',
      'Resume or LinkedIn review included',
    ],
    accentFrom: 'from-rb-blue/20',
    accentTo: 'to-rb-steel/10',
    borderIdle: 'border-rb-blue/30',
    borderHover: 'hover:border-rb-blue/60',
  },
  {
    id: 'capstone',
    name: 'Capstone',
    badge: 'Best Value',
    flash: null,
    solo: {
      original: 149,
      price: 99,
      discount: 34,
      period: 'full project',
    },
    group: {
      original: 59,
      price: 39,
      discount: 34,
      period: 'per student',
      minStudents: 2,
      maxStudents: 6,
    },
    description: 'End-to-end guidance for final year projects, dissertations, and capstone submissions.',
    features: [
      '8 x 45-minute sessions across your project timeline',
      'Topic selection and feasibility review',
      'Full architecture and tech stack planning',
      'Weekly milestone check-ins',
      'Report writing and documentation coaching',
      'Presentation and mock defense preparation',
      'Dedicated consultant for the full engagement',
      '30-day post-submission support',
    ],
    accentFrom: 'from-rb-steel/20',
    accentTo: 'to-rb-blue/10',
    borderIdle: 'border-rb-steel/30',
    borderHover: 'hover:border-rb-steel/60',
  },
]

// Countdown timer component
const Countdown = ({ hours, minutes }: { hours: number; minutes: number }) => {
  const [time, setTime] = useState({ h: hours, m: minutes, s: 59 })

  useState(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 }
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 }
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(interval)
  })

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1">
      {[pad(time.h), pad(time.m), pad(time.s)].map((unit, i) => (
        <span key={i} className="flex items-center gap-1">
          <motion.span
            key={unit}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block w-7 text-center text-sm font-bold text-rb-black bg-rb-blue rounded px-1 py-0.5 tabular-nums"
          >
            {unit}
          </motion.span>
          {i < 2 && <span className="text-rb-blue font-bold text-sm">:</span>}
        </span>
      ))}
    </div>
  )
}

// Toggle switch
const Toggle = ({
  value,
  onChange,
}: {
  value: 'solo' | 'group'
  onChange: (v: 'solo' | 'group') => void
}) => (
  <div className="flex items-center gap-1 p-1 rounded-full bg-rb-dark/60 border border-rb-silver/15 backdrop-blur-sm">
    {(['solo', 'group'] as const).map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`
          relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
          ${value === opt
            ? 'text-rb-black'
            : 'text-rb-gray hover:text-rb-silver'
          }
        `}
      >
        {value === opt && (
          <motion.div
            layoutId="toggle-pill"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 capitalize">
          {opt === 'solo' ? 'Solo Student' : 'Group (3–8)'}
        </span>
      </button>
    ))}
  </div>
)

// Individual package card
const PackageCard = ({
  pkg,
  mode,
  index,
  inView,
}: {
  pkg: typeof packages[0]
  mode: 'solo' | 'group'
  index: number
  inView: boolean
}) => {
  const price = mode === 'solo' ? pkg.solo : pkg.group
  const isPopular = pkg.badge === 'Most Popular'

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`
        relative flex flex-col rounded-2xl overflow-hidden
        bg-gradient-to-br ${pkg.accentFrom} ${pkg.accentTo}
        bg-rb-dark/50 backdrop-blur-md
        border ${isPopular ? 'border-rb-blue/50' : pkg.borderIdle} ${pkg.borderHover}
        transition-all duration-300
        shadow-xl
        ${isPopular ? 'ring-1 ring-rb-blue/20' : ''}
      `}
    >
      {/* Popular glow */}
      {isPopular && (
        <div className="absolute inset-0 bg-gradient-to-b from-rb-blue/8 to-transparent pointer-events-none rounded-2xl" />
      )}

      {/* Flash deal banner */}
      {pkg.flash && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.14 }}
          className="relative z-10 bg-gradient-to-r from-rb-blue to-rb-steel px-4 py-2 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="w-2 h-2 rounded-full bg-rb-black"
            />
            <span className="text-rb-black text-xs font-bold tracking-widest uppercase">
              {pkg.flash.label}
            </span>
          </div>
          <Countdown hours={pkg.flash.expiresHours} minutes={pkg.flash.expiresMinutes} />
        </motion.div>
      )}

      {/* Card body */}
      <div className="relative z-10 flex flex-col flex-1 p-6">

        {/* Badge row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-rb-silver/50">
            {pkg.name}
          </span>
          {pkg.badge && (
            <span className={`
              text-xs font-bold tracking-wide px-3 py-1 rounded-full
              ${isPopular
                ? 'bg-rb-blue/20 text-rb-blue border border-rb-blue/30'
                : 'bg-rb-steel/20 text-rb-silver border border-rb-silver/20'
              }
            `}>
              {pkg.badge}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-1">
          <div className="flex items-end gap-2">
            <motion.span
              key={`${pkg.id}-${mode}-price`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-4xl sm:text-5xl font-bold text-rb-silver"
            >
              ${price.price}
            </motion.span>
            <div className="mb-2">
              <span className="text-rb-gray/50 line-through text-sm block">${price.original}</span>
              <span className="text-rb-gray text-xs">{price.period}</span>
            </div>
          </div>
          <motion.div
            key={`${pkg.id}-${mode}-discount`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-green-500/15 border border-green-500/25"
          >
            <span className="text-green-400 text-xs font-bold">{price.discount}% off</span>
          </motion.div>
        </div>

        {/* Group note */}
        {mode === 'group' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rb-blue/70 text-xs mt-2 mb-3"
          >
            {pkg.group.minStudents}–{pkg.group.maxStudents} students share one booking — everyone saves
          </motion.p>
        )}

        {/* Description */}
        <p className="text-rb-gray text-sm leading-relaxed mt-3 mb-5">
          {pkg.description}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 flex-1">
          {pkg.features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
              className="flex items-start gap-2.5 text-sm text-rb-gray"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rb-blue flex-shrink-0" />
              {f}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className={`
            mt-7 w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300
            ${isPopular
              ? 'bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black hover:opacity-90 shadow-lg'
              : 'border border-rb-silver/25 text-rb-silver hover:border-rb-blue/50 hover:text-rb-blue hover:bg-rb-blue/5'
            }
          `}
        >
          Get {pkg.name} →
        </motion.button>
      </div>
    </motion.div>
  )
}

export const Pricing = () => {
  const [mode, setMode] = useState<'solo' | 'group'>('solo')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-rb-black overflow-hidden"
    >
      {/* ── Background — same as Hero & Services ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '0%', top: '10%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ right: '0%', bottom: '5%' }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-rb-blue/3 blur-2xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ left: '40%', top: '45%' }}
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
          className="text-center mb-10 md:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-6"
          >
            Student Packages
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rb-silver leading-tight"
          >
            Transparent pricing,
            <br />
            <span className="text-rb-blue">built for students</span>
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
            One student or a whole study group — every package has a group rate so the more you share, the less everyone pays.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55 }}
            className="flex justify-center mt-8"
          >
            <Toggle value={mode} onChange={setMode} />
          </motion.div>

          {/* Group savings callout */}
          {mode === 'group' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 rounded-full bg-green-400 inline-block"
              />
              Group mode — each student saves an extra 30–40% vs solo pricing
            </motion.div>
          )}
        </motion.div>

        {/* ── Cards grid ── */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} mode={mode} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
        >
          {[
            { stat: 'No subscription', sub: 'Pay once, use it fully — no recurring charges' },
            { stat: 'Money-back', sub: 'Not happy after your first session? Full refund, no questions' },
            { stat: 'Student verified', sub: 'All consultants are current or recent students themselves' },
          ].map((item, i) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 + i * 0.1 }}
              className="rounded-2xl border border-rb-silver/10 bg-rb-dark/30 backdrop-blur-sm px-6 py-5"
            >
              <div className="text-rb-silver font-bold text-base mb-1">{item.stat}</div>
              <div className="text-rb-gray text-xs leading-relaxed">{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Final CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-10 rounded-2xl border border-rb-silver/15 bg-rb-dark/30 backdrop-blur-sm p-8 md:p-12 text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-rb-silver mb-3">
            Not sure which plan fits?
          </h3>
          <p className="text-rb-gray text-sm sm:text-base max-w-lg mx-auto mb-7">
            Tell us what you are working on. We will match you to the right package and consultant — no commitment needed.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm sm:text-base hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get matched for free →
          </button>
        </motion.div>

      </div>
    </section>
  )
}