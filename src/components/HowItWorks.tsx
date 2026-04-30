// HowItWorks.tsx – tooltip always on top, aligned to card center
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef } from 'react'

// ========== STEPS DATA (unchanged) ==========
const steps = [
  {
    id: 'browse',
    number: '01',
    title: 'Browse & Contact',
    short: 'You reach out',
    description: 'Explore the site, check services and packages, then fill in the contact form with your project details — what you are building, your deadline, your stack, and what kind of help you need.',
    tooltip: { heading: 'What to include in your brief', points: ['Your project type (final year, semester, personal)', 'Tech stack or preferred technologies', 'Deadline and urgency level', 'Specific blockers or areas of confusion', 'Whether you want solo or group pricing'] },
  },
  {
    id: 'logged',
    number: '02',
    title: 'Response Logged',
    short: 'We receive it',
    description: 'Your submission is immediately logged in our system. You get an automated confirmation and a human from the team reviews your brief within a few hours to verify details and clarify anything unclear.',
    tooltip: { heading: 'What happens internally', points: ['Submission timestamped and assigned a case ID', 'Team member reviews brief for completeness', 'Follow-up message sent if clarification needed', 'Brief tagged by domain, urgency, and consultant type', 'Matching algorithm begins running in the background'] },
  },
  {
    id: 'matched',
    number: '03',
    title: 'Internal Matching',
    short: 'We find your consultant',
    description: 'We match you to a consultant based on domain expertise, availability, your tech stack, and project complexity. This is not random — every match is reviewed by a human before going out.',
    tooltip: { heading: 'How matching works', points: ['Domain and stack compatibility scored first', 'Consultant availability and current load checked', 'Past project outcomes and student ratings weighted', 'Human team lead reviews and approves the match', 'Backup consultant identified in case of conflict'] },
  },
  {
    id: 'notify',
    number: '04',
    title: 'You Get Notified',
    short: 'Meet your match',
    description: "You receive a notification with your matched consultant's profile — their name, background, relevant projects, ratings, and a short intro. You review it before anything is confirmed.",
    tooltip: { heading: 'Your notification includes', points: ['Consultant name, university, and specialisation', 'Relevant past projects and success rate', 'Average rating from previous students', 'Proposed session schedule and format', 'Option to accept or request a different match'] },
  },
  {
    id: 'dashboard',
    number: '05',
    title: 'Start via Dashboard',
    short: 'Your workspace opens',
    description: 'Once you confirm the match, your personal dashboard is activated. Sessions are scheduled, resources are shared, and all communication happens in one place — no chasing people over WhatsApp.',
    tooltip: { heading: 'What your dashboard includes', points: ['Session scheduler with calendar integration', 'Shared document and code repository space', 'Milestone tracker with your project timeline', 'Direct messaging with your consultant', 'Session recordings and summary notes'] },
  },
  {
    id: 'change',
    number: '06',
    title: 'Change if Needed',
    short: 'Not the right fit? Switch',
    description: 'If at any point the match does not feel right — different working style, wrong domain depth, scheduling issues — you can request a consultant change. No penalties, no awkward conversations.',
    tooltip: { heading: 'How a change request works', points: ['Submit a change request from your dashboard', 'Brief reason helps us find a better match faster', 'New match identified within 24 hours', 'All previous session notes transferred over', 'Zero extra cost for the first change request'] },
  },
  {
    id: 'review',
    number: '07',
    title: 'Finish & Review',
    short: 'Share your experience',
    description: 'When your project wraps, you rate your consultant and leave a review. Your feedback directly shapes who gets recommended to future students and helps consultants improve.',
    tooltip: { heading: 'Your review covers', points: ['Technical depth and domain knowledge', 'Communication and availability', 'Clarity of explanations', 'Impact on your project outcome', 'Whether you would recommend them'] },
  },
  {
    id: 'join',
    number: '08',
    title: 'Join the Team',
    short: 'Become a consultant',
    description: 'Did well on your project? You can apply to become a consultant yourself. We actively recruit from our student base — the best consultants are people who recently sat exactly where you are.',
    tooltip: { heading: 'How to join as a consultant', points: ['Apply from your dashboard after project completion', 'Short technical and communication screening', 'Paired with a senior consultant for first 2 projects', 'Set your own availability and domain focus', 'Earn while helping others through what you mastered'] },
  },
]

type TooltipPlacement = 'left' | 'right'

// Tooltip component – with very high z-index and stable positioning
const Tooltip = ({ step, onClose, placement }: { step: typeof steps[0]['tooltip']; onClose: () => void; placement: TooltipPlacement }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.2 }}
    className={`relative w-64 bg-fog-lime/95 backdrop-blur-xl border border-accent-lime/40 rounded-organic p-4 shadow-soft font-sketch`}
    style={{ zIndex: 9999 }}
  >
    {/* Arrow pointing to card */}
    <div
      className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-fog-lime/95 border-accent-lime/40 rotate-45"
      style={
        placement === 'left'
          ? { right: '-5px', borderRight: '1px solid', borderTop: '1px solid' }
          : { left: '-5px', borderLeft: '1px solid', borderBottom: '1px solid' }
      }
    />
    <div className="flex items-start justify-between mb-2">
      <p className="text-[10px] font-bold tracking-wider uppercase text-accent-limeStrong">{step.heading}</p>
      <button onClick={onClose} className="text-ink-faint hover:text-accent-limeStrong text-base leading-none">×</button>
    </div>
    <ul className="space-y-1.5">
      {step.points.map((point, i) => (
        <li key={i} className="flex items-start gap-2 text-[11px] text-ink-soft leading-relaxed">
          <span className="mt-1 w-1 h-1 rounded-full bg-accent-limeStrong" />
          {point}
        </li>
      ))}
    </ul>
  </motion.div>
)

// MobileStep (unchanged, works fine)
const MobileStep = ({ step, index, active, onToggle }: { step: typeof steps[0]; index: number; active: boolean; onToggle: () => void }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.05, duration: 0.4 }} className="relative flex flex-col items-center">
      {index < steps.length - 1 && <div className="absolute left-1/2 top-[34px] w-0.5 h-8 -translate-x-1/2 bg-gradient-to-b from-accent-lime/40 to-accent-lime/10" />}
      <div className="relative mb-2">
        <div className={`absolute inset-0 rounded-full bg-accent-lime/20 blur-md transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />
        <button onClick={onToggle} className={`relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-accent-lime to-accent-limeStrong text-ink font-bold text-base border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${active ? 'border-accent-lime shadow-glow' : 'border-transparent'}`}>{step.number}</button>
      </div>
      <div className="w-full max-w-xs mx-auto text-center">
        <div className="flex items-center justify-center gap-1 mb-0.5">
          <p className="font-bold text-ink text-sm font-display">{step.title}</p>
          <button onClick={onToggle} className="text-accent-limeStrong/70 text-xs"><span className={`inline-block transition-transform duration-300 ${active ? 'rotate-180' : ''}`}>▼</span></button>
        </div>
        <p className="text-ink-faint text-[11px] font-sketch">{step.short}</p>
      </div>
      <div className={`w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="rounded-organic bg-fog-lime/12 border border-accent-lime/20 p-4 text-left">
          <p className="text-ink-soft text-xs leading-relaxed mb-3 font-sketch">{step.description}</p>
          <p className="text-[10px] font-bold tracking-wider uppercase text-accent-limeStrong mb-1.5 font-sketch">{step.tooltip.heading}</p>
          <ul className="space-y-1.5">
            {step.tooltip.points.map((point, i) => <li key={i} className="flex items-start gap-2 text-[11px] text-ink-soft font-sketch"><span className="mt-1 w-1 h-1 rounded-full bg-accent-limeStrong" />{point}</li>)}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

// DesktopStep – tooltip is absolutely positioned relative to the card container
const DesktopStep = ({ step, index, inView, active, onToggle, isLeft }: { step: typeof steps[0]; index: number; inView: boolean; active: boolean; onToggle: () => void; isLeft: boolean }) => {
  const tooltipPlacement: TooltipPlacement = isLeft ? 'right' : 'left'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.035, duration: 0.35 }}
      className="relative w-full overflow-visible isolate"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 w-full">
        {isLeft ? (
          <>
            {/* Left card with tooltip container */}
            <div className="relative justify-self-end overflow-visible">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={onToggle}
                className={`w-56 rounded-organic p-3 cursor-pointer bg-fog-lime/25 backdrop-blur-sm border transition-all duration-300 hover:bg-fog-lime/35 ${active ? 'border-accent-lime/70 shadow-glow bg-fog-lime/30' : 'border-accent-lime/30'}`}
              >
                <p className={`text-[10px] font-bold tracking-wider uppercase mb-1 ${active ? 'text-accent-limeStrong' : 'text-ink-faint'} font-sketch`}>Step {step.number}</p>
                <p className="font-bold text-ink text-sm mb-1 font-display">{step.title}</p>
                <p className="text-ink-soft text-xs leading-relaxed font-sketch line-clamp-2">{step.description}</p>
                <p className="text-[10px] text-accent-limeStrong/80 mt-2 flex items-center gap-1">Click →</p>
              </motion.div>
              {/* Tooltip placed as a sibling, absolutely positioned to the right of the card */}
              <AnimatePresence mode="wait">
                {active && (
                  <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '100%', marginLeft: '12px' }}>
                    <Tooltip step={step.tooltip} onClose={() => onToggle()} placement={tooltipPlacement} />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Central node */}
            <div className="relative justify-self-center flex items-center justify-center z-30">
              <div className="w-4 h-0.5 bg-gradient-to-r from-accent-lime to-accent-lime/30" />
              <motion.div animate={active ? { scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] } : { scale: [1, 1.08, 1], opacity: [0.15, 0.05, 0.15] }} transition={{ duration: active ? 1 : 2.2, repeat: Infinity, delay: index * 0.08 }} className={`absolute rounded-full w-12 h-12 blur-sm ${active ? 'bg-accent-lime/40' : 'bg-accent-lime/15'}`} />
              <button onClick={onToggle} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-accent-lime to-accent-limeStrong text-ink font-bold text-sm border-2 transition-all duration-300 hover:scale-110 ${active ? 'border-accent-lime shadow-glow' : 'border-transparent'}`}>
                <motion.span animate={active ? { scale: [1, 1.08, 1] } : {}} transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}>{step.number}</motion.span>
              </button>
              <div className="w-4 h-0.5 bg-gradient-to-r from-accent-lime/30 to-accent-lime" />
            </div>
            <div />
          </>
        ) : (
          <>
            <div />
            {/* Central node */}
            <div className="relative justify-self-center flex items-center justify-center z-30">
              <div className="w-4 h-0.5 bg-gradient-to-r from-accent-lime to-accent-lime/30" />
              <motion.div animate={active ? { scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] } : { scale: [1, 1.08, 1], opacity: [0.15, 0.05, 0.15] }} transition={{ duration: active ? 1 : 2.2, repeat: Infinity, delay: index * 0.08 }} className={`absolute rounded-full w-12 h-12 blur-sm ${active ? 'bg-accent-lime/40' : 'bg-accent-lime/15'}`} />
              <button onClick={onToggle} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-accent-lime to-accent-limeStrong text-ink font-bold text-sm border-2 transition-all duration-300 hover:scale-110 ${active ? 'border-accent-lime shadow-glow' : 'border-transparent'}`}>
                <motion.span animate={active ? { scale: [1, 1.08, 1] } : {}} transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}>{step.number}</motion.span>
              </button>
              <div className="w-4 h-0.5 bg-gradient-to-r from-accent-lime/30 to-accent-lime" />
            </div>
            {/* Right card with tooltip container */}
            <div className="relative justify-self-start overflow-visible">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={onToggle}
                className={`w-56 rounded-organic p-3 cursor-pointer bg-fog-lime/25 backdrop-blur-sm border transition-all duration-300 hover:bg-fog-lime/35 ${active ? 'border-accent-lime/70 shadow-glow bg-fog-lime/30' : 'border-accent-lime/30'}`}
              >
                <p className={`text-[10px] font-bold tracking-wider uppercase mb-1 ${active ? 'text-accent-limeStrong' : 'text-ink-faint'} font-sketch`}>Step {step.number}</p>
                <p className="font-bold text-ink text-sm mb-1 font-display">{step.title}</p>
                <p className="text-ink-soft text-xs leading-relaxed font-sketch line-clamp-2">{step.description}</p>
                <p className="text-[10px] text-accent-limeStrong/80 mt-2 flex items-center gap-1">Click →</p>
              </motion.div>
              {/* Tooltip placed to the left of the card */}
              <AnimatePresence mode="wait">
                {active && (
                  <div className="absolute top-1/2 -translate-y-1/2" style={{ right: '100%', marginRight: '12px' }}>
                    <Tooltip step={step.tooltip} onClose={() => onToggle()} placement={tooltipPlacement} />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

// Main component
export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [flowRef, flowInView] = useInView({ triggerOnce: false, threshold: 0.1 })
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  const toggle = (id: string) => setActiveStep((prev) => (prev === id ? null : id))

  return (
    <section id="how-it-works" ref={containerRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, #A6A6A6 0.8px, transparent 0.8px)`, backgroundSize: '22px 22px' }} />
        <motion.svg className="absolute left-[-5%] top-[10%] w-40 sm:w-56 opacity-20" viewBox="0 0 200 100" animate={{ y: [0, 6, 0] }} transition={{ duration: 12, repeat: Infinity }}>
          <path d="M12,48 C48,12 68,18 96,46 C124,74 148,70 176,44" fill="none" stroke="#C7F36B" strokeWidth="1.2" strokeDasharray="4 8 2 6" strokeLinecap="round" />
        </motion.svg>
        <motion.div className="absolute right-[5%] bottom-[15%] w-12 h-12 rounded-full border border-accent-lime/20" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div ref={headerRef} className="text-center mb-8 md:mb-12">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={headerInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.35 }} className="inline-block px-3 py-1 rounded-full border border-accent-lime/40 bg-fog-lime text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase mb-3 font-sketch">The Process</motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink leading-tight">From first contact<br /><span className="text-accent-limeStrong">to finished project</span></h2>
          <motion.div initial={{ scaleX: 0 }} animate={headerInView ? { scaleX: 1 } : {}} transition={{ delay: 0.15, duration: 0.4 }} className="w-16 h-0.5 bg-gradient-to-r from-accent-lime to-accent-limeStrong mx-auto mt-3" />
          <motion.p initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.25 }} className="text-ink-soft mt-3 max-w-xl mx-auto text-xs sm:text-sm font-sketch">Eight clear steps — click any card or numbered node to see exactly what happens at that stage.</motion.p>
        </motion.div>

        {/* Mobile */}
        <div className="flex flex-col gap-5 md:hidden">
          {steps.map((step, i) => <MobileStep key={step.id} step={step} index={i} active={activeStep === step.id} onToggle={() => toggle(step.id)} />)}
        </div>

        {/* Desktop */}
        <div ref={flowRef} className="hidden md:block relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-accent-lime/20 z-0">
            <motion.div className="w-full bg-gradient-to-b from-accent-lime via-accent-lime/60 to-accent-lime/10" style={{ opacity: glowOpacity, height: lineHeight, originY: 0 }} />
          </div>
          <div className="flex flex-col gap-5 py-2 relative z-10">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0
              return (
                <div key={step.id} className="w-full">
                  <DesktopStep step={step} index={index} inView={flowInView} active={activeStep === step.id} onToggle={() => toggle(step.id)} isLeft={isLeft} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}