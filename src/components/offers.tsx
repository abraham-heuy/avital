// PricingCards.tsx – with character & conversation, credit‑card flip, exchange rates, theme fonts
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

import characterImg from '../assets/middle-age-caucasian-man-playing-basketball-with-afro-african-bo/qokp_ex3a_230531.jpg' 

// Pricing data (same as your original "packages")
const packages = [
  {
    id: 'starter',
    name: 'Starter',
    badge: null,
    solo: { original: 29, price: 19, discount: 34, period: 'one‑time' },
    group: { original: 12, price: 8, discount: 33, period: 'per student', minStudents: 3, maxStudents: 5 },
    description: 'Perfect for a single stuck point — a bug, a concept, or a quick code review.',
    features: [
      '1 x 45‑minute consultation session',
      'Pre‑session brief form so we come prepared',
      'Session summary and action points after',
      'Follow‑up Q&A via chat for 48 hours',
    ],
    tag: 'Essential',
  },
  {
    id: 'builder',
    name: 'Builder',
    badge: 'Most Popular',
    solo: { original: 79, price: 49, discount: 38, period: 'one‑time' },
    group: { original: 32, price: 19, discount: 41, period: 'per student', minStudents: 3, maxStudents: 8 },
    description: 'Ideal for students building a semester project or preparing for a deadline.',
    features: [
      '4 x 45‑minute consultation sessions',
      'Project architecture review (written report)',
      'Code review with annotated inline feedback',
      'Priority matching to domain‑relevant consultant',
      '7‑day chat support between sessions',
      'Resume or LinkedIn review included',
    ],
    tag: 'Popular',
  },
  {
    id: 'capstone',
    name: 'Capstone',
    badge: 'Best Value',
    solo: { original: 149, price: 99, discount: 34, period: 'full project' },
    group: { original: 59, price: 39, discount: 34, period: 'per student', minStudents: 2, maxStudents: 6 },
    description: 'End‑to‑end guidance for final year projects, dissertations, and capstone submissions.',
    features: [
      '8 x 45‑minute sessions across your project timeline',
      'Topic selection and feasibility review',
      'Full architecture and tech stack planning',
      'Weekly milestone check‑ins',
      'Report writing and documentation coaching',
      'Presentation and mock defense preparation',
      'Dedicated consultant for the full engagement',
      '30‑day post‑submission support',
    ],
    tag: 'Complete',
  },
]

// Toggle component (solo / group)
const Toggle = ({ value, onChange }: { value: 'solo' | 'group'; onChange: (v: 'solo' | 'group') => void }) => (
  <div className="flex items-center gap-1 p-1 rounded-full bg-fog-lime/30 border border-accent-lime/30 backdrop-blur-sm">
    {(['solo', 'group'] as const).map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          value === opt ? 'text-ink' : 'text-ink-soft hover:text-ink'
        }`}
      >
        {value === opt && (
          <motion.div
            layoutId="toggle-pill"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-lime to-accent-limeStrong shadow-glow"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 capitalize font-sketch">
          {opt === 'solo' ? 'Solo Student' : `Group (${opt === 'group' ? '3–8' : '2–6'})`}
        </span>
      </button>
    ))}
  </div>
)

// Speech bubble component (conversational)
const SpeechBubble = ({ text }: { text: string }) => (
  <div className="relative bg-fog-lime/90 backdrop-blur-sm rounded-organic p-3 shadow-soft border border-accent-lime/40">
    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-fog-lime/90 rotate-45 border-r border-b border-accent-lime/40" />
    <p className="text-ink text-sm font-sketch leading-relaxed">{text}</p>
  </div>
)

// Individual credit‑card flip component
const CreditCard = ({
  pkg,
  mode,
  exchangeRate,
  isFlipped,
  onFlip,
  onHover,
}: {
  pkg: typeof packages[0]
  mode: 'solo' | 'group'
  exchangeRate: number | null
  isFlipped: boolean
  onFlip: () => void
  onHover: (name: string) => void
}) => {
  const priceData = mode === 'solo' ? pkg.solo : pkg.group
  const priceUSD = priceData.price
  const priceKES = exchangeRate ? Math.round(priceUSD * exchangeRate) : null
  const originalUSD = priceData.original
  const discount = priceData.discount

  const groupNote = mode === 'group' && pkg.id !== 'starter'
    ? `${pkg.group.minStudents}–${pkg.group.maxStudents} students`
    : null

  return (
    <div
      className="relative w-full max-w-md mx-auto h-60 cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={onFlip}
      onMouseEnter={() => onHover(pkg.name)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT – credit card style */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between
                     bg-gradient-to-br from-fog-lime/20 to-fog-lime/5 backdrop-blur-sm
                     border-2 shadow-soft"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(199,243,107,0.12), rgba(199,243,107,0.04))',
            borderColor: 'rgba(199,243,107,0.3)',
          }}
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-8 rounded-md bg-accent-lime/20 border border-accent-lime/30" />
            {pkg.badge && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-accent-lime/30 text-accent-limeStrong font-sketch">
                {pkg.badge}
              </span>
            )}
          </div>
          <div className="mt-2 text-xs tracking-wider text-ink-faint font-mono">
            •••• •••• •••• {pkg.id.slice(0, 4).toUpperCase()}
          </div>
          <div>
            <p className="text-ink-soft text-[10px] uppercase tracking-wider font-sketch">{pkg.tag}</p>
            <h3 className="text-xl font-display font-bold text-ink">{pkg.name}</h3>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold text-accent-limeStrong">${priceUSD}</span>
              {priceKES && (
                <span className="text-[11px] text-ink-faint font-sketch">≈ KES {priceKES.toLocaleString()}</span>
              )}
              {discount > 0 && (
                <span className="text-[10px] line-through text-ink-faint ml-2">${originalUSD}</span>
              )}
            </div>
            <p className="text-[9px] text-ink-faint mt-0.5 font-sketch">{priceData.period}</p>
          </div>
          <div className="flex justify-between items-center text-[9px] text-ink-faint">
            <span>Valid • 30 days</span>
            <span className="flex items-center gap-1">
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="font-sketch"
              >
                tap to flip
              </motion.span>
              <span>↻</span>
            </span>
          </div>
        </div>

        {/* BACK – details */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between
                     bg-gradient-to-br from-fog-lime/30 to-fog-lime/10 backdrop-blur-sm
                     border-2 shadow-soft"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: 'rgba(199,243,107,0.4)',
          }}
        >
          <div className="overflow-y-auto h-full pr-1 custom-scrollbar">
            <p className="text-ink-soft text-xs leading-relaxed font-sketch">{pkg.description}</p>
            {groupNote && (
              <p className="text-[10px] text-accent-limeStrong mt-2 font-sketch">
                👥 Group: {groupNote} share one booking — each student saves!
              </p>
            )}
            <div className="mt-3">
              <p className="text-[10px] font-bold uppercase text-accent-limeStrong mb-2 font-sketch">
                What's included
              </p>
              <ul className="space-y-1.5">
                {pkg.features.slice(0, mode === 'solo' ? 4 : 5).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] text-ink-soft font-sketch">
                    <span className="mt-0.5 w-1 h-1 rounded-full bg-accent-limeStrong" />
                    {f}
                  </li>
                ))}
                {mode === 'group' && pkg.id === 'builder' && (
                  <li className="text-[10px] text-accent-limeStrong italic font-sketch">+ Shared cohort dashboard</li>
                )}
              </ul>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="mt-3 w-full py-1.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-[10px] hover:shadow-glow transition-all font-sketch"
          >
            Choose {pkg.name} →
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// Main component
export const PricingCards = () => {
  const [mode, setMode] = useState<'solo' | 'group'>('solo')
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [rateLoading, setRateLoading] = useState(true)
  const [flippedId, setFlippedId] = useState<string | null>(null)
  const [message, setMessage] = useState("Hi! I'm your pricing assistant. Tap any card to see what's inside 👆")
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Fetch exchange rate
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        const data = await res.json()
        if (data?.rates?.KES) setExchangeRate(data.rates.KES)
        else setExchangeRate(130)
      } catch {
        setExchangeRate(130)
      } finally {
        setRateLoading(false)
      }
    }
    fetchRate()
  }, [])

  const handleFlip = (id: string) => {
    setFlippedId(prev => (prev === id ? null : id))
    if (flippedId !== id) {
      const pkg = packages.find(p => p.id === id)
      if (pkg) setMessage(`${pkg.name} plan – ${pkg.description} Tap again to flip back.`)
    } else {
      setMessage("You closed the card. Tap another to explore!")
    }
  }

  const handleCardHover = (name: string) => {
    setMessage(`${name} plan – click to see full details`)
  }

  return (
    <section id="pricing" className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full border border-accent-lime/40 bg-fog-lime text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase mb-3 font-sketch">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
            Choose your plan
            <br />
            <span className="text-accent-limeStrong">pay once, learn forever</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-lime to-accent-limeStrong mx-auto mt-3" />
        </div>

        {/* Exchange rate info */}
        <div className="text-center mb-6">
          {rateLoading ? (
            <div className="text-ink-faint text-xs animate-pulse font-sketch">Loading exchange rate...</div>
          ) : (
            <div className="text-ink-faint text-xs font-sketch">
              1 USD ≈ {exchangeRate?.toFixed(2)} KES • All prices include tax
            </div>
          )}
        </div>

        {/* Two‑column layout: character + conversation on left, cards on right */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left column: character + speech bubble */}
          <div className="lg:w-1/3 w-full sticky top-28">
            <div className="relative flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-accent-lime/40 shadow-glow bg-fog-lime/20">
                <img
                  src={characterImg}
                  alt="Pricing assistant"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="mt-4 w-full max-w-xs">
                <SpeechBubble text={message} />
              </div>
              <div className="mt-6 text-center">
                <p className="text-ink-soft text-xs font-sketch">Your pricing guide • here to help</p>
              </div>
            </div>
          </div>

          {/* Right column: toggle + cards */}
          <div className="lg:w-2/3 w-full">
            {/* Toggle */}
            <div className="flex justify-center mb-10">
              <Toggle value={mode} onChange={setMode} />
            </div>

            {/* Group mode callout */}
            {mode === 'group' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fog-lime/40 border border-accent-lime/30 text-accent-limeStrong text-xs font-sketch">
                   Group mode: each student saves 30–40% vs solo pricing
                </span>
              </motion.div>
            )}

            {/* Cards grid */}
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              {packages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="w-full flex justify-center"
                >
                  <CreditCard
                    pkg={pkg}
                    mode={mode}
                    exchangeRate={exchangeRate}
                    isFlipped={flippedId === pkg.id}
                    onFlip={() => handleFlip(pkg.id)}
                    onHover={handleCardHover}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-fog-lime/10 border border-accent-lime/30">
            <span className="w-2 h-2 rounded-full bg-accent-limeStrong animate-pulse" />
            <span className="text-ink-soft text-[11px] font-sketch">No subscription • Pay once</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-fog-lime/10 border border-accent-lime/30">
            <span className="w-2 h-2 rounded-full bg-accent-limeStrong" />
            <span className="text-ink-soft text-[11px] font-sketch">Money‑back guarantee</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-fog-lime/10 border border-accent-lime/30">
            <span className="w-2 h-2 rounded-full bg-accent-limeStrong" />
            <span className="text-ink-soft text-[11px] font-sketch">Student‑verified consultants</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all font-sketch"
          >
            Not sure? Get matched for free →
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(199,243,107,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #A6E200;
          border-radius: 10px;
        }
      `}</style>
    </section>
  )
}