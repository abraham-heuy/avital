import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef, useEffect } from 'react'
import { useScroll, useTransform } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  {
    id: 'browse',
    number: '01',
    title: 'Browse & Contact',
    short: 'You reach out',
    description:
      'Explore the site, check services and packages, then fill in the contact form with your project details — what you are building, your deadline, your stack, and what kind of help you need.',
    tooltip: {
      heading: 'What to include in your brief',
      points: [
        'Your project type (final year, semester, personal)',
        'Tech stack or preferred technologies',
        'Deadline and urgency level',
        'Specific blockers or areas of confusion',
        'Whether you want solo or group pricing',
      ],
    },
    color: 'from-rb-blue to-rb-steel',
    borderColor: 'border-rb-blue/40',
    glowColor: 'bg-rb-blue/20',
    angle: 0,
  },
  {
    id: 'logged',
    number: '02',
    title: 'Response Logged',
    short: 'We receive it',
    description:
      'Your submission is immediately logged in our system. You get an automated confirmation and a human from the team reviews your brief within a few hours to verify details and clarify anything unclear.',
    tooltip: {
      heading: 'What happens internally',
      points: [
        'Submission timestamped and assigned a case ID',
        'Team member reviews brief for completeness',
        'Follow-up message sent if clarification needed',
        'Brief tagged by domain, urgency, and consultant type',
        'Matching algorithm begins running in the background',
      ],
    },
    color: 'from-rb-steel to-rb-blue',
    borderColor: 'border-rb-steel/40',
    glowColor: 'bg-rb-steel/20',
    angle: 45,
  },
  {
    id: 'matched',
    number: '03',
    title: 'Internal Matching',
    short: 'We find your consultant',
    description:
      'We match you to a consultant based on domain expertise, availability, your tech stack, and project complexity. This is not random — every match is reviewed by a human before going out.',
    tooltip: {
      heading: 'How matching works',
      points: [
        'Domain and stack compatibility scored first',
        'Consultant availability and current load checked',
        'Past project outcomes and student ratings weighted',
        'Human team lead reviews and approves the match',
        'Backup consultant identified in case of conflict',
      ],
    },
    color: 'from-rb-blue to-rb-steel',
    borderColor: 'border-rb-blue/40',
    glowColor: 'bg-rb-blue/20',
    angle: 90,
  },
  {
    id: 'notify',
    number: '04',
    title: 'You Get Notified',
    short: 'Meet your match',
    description:
      'You receive a notification with your matched consultant\'s profile — their name, background, relevant projects, ratings, and a short intro. You review it before anything is confirmed.',
    tooltip: {
      heading: 'Your notification includes',
      points: [
        'Consultant name, university, and specialisation',
        'Relevant past projects and success rate',
        'Average rating from previous students',
        'Proposed session schedule and format',
        'Option to accept or request a different match',
      ],
    },
    color: 'from-rb-steel to-rb-blue',
    borderColor: 'border-rb-steel/40',
    glowColor: 'bg-rb-steel/20',
    angle: 135,
  },
  {
    id: 'dashboard',
    number: '05',
    title: 'Start via Dashboard',
    short: 'Your workspace opens',
    description:
      'Once you confirm the match, your personal dashboard is activated. Sessions are scheduled, resources are shared, and all communication happens in one place — no chasing people over WhatsApp.',
    tooltip: {
      heading: 'What your dashboard includes',
      points: [
        'Session scheduler with calendar integration',
        'Shared document and code repository space',
        'Milestone tracker with your project timeline',
        'Direct messaging with your consultant',
        'Session recordings and summary notes',
      ],
    },
    color: 'from-rb-blue to-rb-steel',
    borderColor: 'border-rb-blue/40',
    glowColor: 'bg-rb-blue/20',
    angle: 180,
  },
  {
    id: 'change',
    number: '06',
    title: 'Change if Needed',
    short: 'Not the right fit? Switch',
    description:
      'If at any point the match does not feel right — different working style, wrong domain depth, scheduling issues — you can request a consultant change. No penalties, no awkward conversations.',
    tooltip: {
      heading: 'How a change request works',
      points: [
        'Submit a change request from your dashboard',
        'Brief reason helps us find a better match faster',
        'New match identified within 24 hours',
        'All previous session notes transferred over',
        'Zero extra cost for the first change request',
      ],
    },
    color: 'from-rb-steel to-rb-blue',
    borderColor: 'border-rb-silver/30',
    glowColor: 'bg-rb-silver/10',
    angle: 225,
  },
  {
    id: 'review',
    number: '07',
    title: 'Finish & Review',
    short: 'Share your experience',
    description:
      'When your project wraps, you rate your consultant and leave a review. Your feedback directly shapes who gets recommended to future students and helps consultants improve.',
    tooltip: {
      heading: 'Your review covers',
      points: [
        'Technical depth and domain knowledge',
        'Communication and availability',
        'Clarity of explanations',
        'Impact on your project outcome',
        'Whether you would recommend them',
      ],
    },
    color: 'from-rb-blue to-rb-steel',
    borderColor: 'border-rb-blue/40',
    glowColor: 'bg-rb-blue/20',
    angle: 270,
  },
  {
    id: 'join',
    number: '08',
    title: 'Join the Team',
    short: 'Become a consultant',
    description:
      'Did well on your project? You can apply to become a consultant yourself. We actively recruit from our student base — the best consultants are people who recently sat exactly where you are.',
    tooltip: {
      heading: 'How to join as a consultant',
      points: [
        'Apply from your dashboard after project completion',
        'Short technical and communication screening',
        'Paired with a senior consultant for first 2 projects',
        'Set your own availability and domain focus',
        'Earn while helping others through what you mastered',
      ],
    },
    color: 'from-rb-steel to-rb-blue',
    borderColor: 'border-rb-steel/40',
    glowColor: 'bg-rb-steel/20',
    angle: 315,
  },
]

// ─── Tooltip ─────────────────────────────────────────────────────────────────

interface TooltipData {
  heading: string
  points: string[]
}

interface TooltipProps {
  step: TooltipData
  onClose: () => void
  side: 'left' | 'right'
}

const Tooltip = ({ step, onClose, side }: TooltipProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, x: side === 'right' ? -20 : 20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0.85 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className={`
      absolute z-50 w-64 sm:w-72
      ${side === 'right' ? 'left-full ml-4' : 'right-full mr-4'}
      top-1/2 -translate-y-1/2
      bg-rb-dark/95 backdrop-blur-xl
      border border-rb-blue/30
      rounded-2xl p-5
      shadow-2xl
    `}
  >
    {/* Arrow */}
    <div
      className={`
        absolute top-1/2 -translate-y-1/2
        w-3 h-3 bg-rb-dark/95 border-rb-blue/30
        rotate-45
        ${side === 'right'
          ? '-left-1.5 border-l border-b'
          : '-right-1.5 border-r border-t'
        }
      `}
    />

    <div className="flex items-start justify-between mb-3">
      <p className="text-xs font-bold tracking-widest uppercase text-rb-blue/70">
        {step.heading}
      </p>
      <button
        onClick={onClose}
        className="text-rb-gray/40 hover:text-rb-silver transition-colors ml-2 flex-shrink-0 text-lg leading-none"
      >
        ×
      </button>
    </div>

    <ul className="space-y-2">
      {step.points.map((point: string, i: number) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-start gap-2 text-xs text-rb-gray leading-relaxed"
        >
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rb-blue flex-shrink-0" />
          {point}
        </motion.li>
      ))}
    </ul>
  </motion.div>
)

// ─── Mobile step row ─────────────────────────────────────────────────────────

interface MobileStepProps {
  step: typeof steps[0]
  index: number
  inView: boolean
  active: boolean
  onToggle: () => void
}

const MobileStep = ({
  step,
  index,
  inView,
  active,
  onToggle,
}: MobileStepProps) => {
  // Ensure component renders even if not inView yet
  const [, setHasAnimated] = useState(false)
  
  useEffect(() => {
    if (inView) setHasAnimated(true)
  }, [inView])

  return (
    <div className="relative">
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="absolute left-6 top-14 w-0.5 h-8 bg-gradient-to-b from-rb-blue/40 to-rb-steel/20" />
      )}

      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 text-left group"
      >
        {/* Number bubble */}
        <div className="relative flex-shrink-0">
          <div
            className={`absolute inset-0 rounded-full ${step.glowColor} blur-md transition-opacity duration-300 ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`
              relative w-12 h-12 rounded-full flex items-center justify-center
              bg-gradient-to-br ${step.color}
              text-rb-black font-bold text-sm
              border-2 ${active ? step.borderColor : 'border-transparent'}
              transition-all duration-300
            `}
          >
            {step.number}
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-rb-silver text-sm">{step.title}</p>
            <span
              className={`text-rb-blue/50 text-xs transition-transform duration-300 ${
                active ? 'rotate-180' : ''
              }`}
            >
              ▾
            </span>
          </div>
          <p className="text-rb-gray/60 text-xs">{step.short}</p>
        </div>
      </button>

      {/* Expanded detail */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="ml-16 rounded-xl bg-rb-dark/50 border border-rb-silver/10 p-4">
          <p className="text-rb-gray text-sm leading-relaxed mb-3">{step.description}</p>
          <p className="text-xs font-bold tracking-widest uppercase text-rb-blue/60 mb-2">
            {step.tooltip.heading}
          </p>
          <ul className="space-y-1.5">
            {step.tooltip.points.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs text-rb-gray">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rb-blue flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// ─── Desktop flow node ───────────────────────────────────────────────────────

interface FlowNodeProps {
  step: typeof steps[0]
  index: number
  inView: boolean
  active: boolean
  onToggle: () => void
  isLeft: boolean
}

const FlowNode = ({
  step,
  index,
  inView,
  active,
  onToggle,
  isLeft,
}: FlowNodeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`relative flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
  >
    {/* Content card */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onToggle}
      className={`
        w-52 xl:w-60 rounded-2xl p-4 cursor-pointer
        bg-rb-dark/50 backdrop-blur-md
        border ${active ? step.borderColor : 'border-rb-silver/10'}
        transition-all duration-300
        ${isLeft ? 'text-right mr-4' : 'text-left ml-4'}
        ${active ? 'bg-rb-dark/80' : ''}
      `}
    >
      <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${active ? 'text-rb-blue' : 'text-rb-gray/40'}`}>
        Step {step.number}
      </p>
      <p className="font-bold text-rb-silver text-sm mb-1">{step.title}</p>
      <p className="text-rb-gray text-xs leading-relaxed line-clamp-2">{step.description}</p>
    </motion.div>

    {/* Connector line to node */}
    <div className={`w-6 h-0.5 bg-gradient-to-r ${isLeft ? step.color : 'from-rb-steel to-rb-blue'} flex-shrink-0`} />

    {/* Number node */}
    <div className="relative flex-shrink-0">
      {/* Pulse ring */}
      <motion.div
        animate={active
          ? { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }
          : { scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }
        }
        transition={{ duration: active ? 1.2 : 3, repeat: Infinity, delay: index * 0.2 }}
        className={`absolute inset-0 rounded-full ${active ? step.glowColor : 'bg-rb-silver/10'}`}
      />

      <button
        onClick={onToggle}
        className={`
          relative w-14 h-14 rounded-full flex items-center justify-center
          bg-gradient-to-br ${step.color}
          text-rb-black font-bold text-sm
          border-2 transition-all duration-300
          hover:scale-110
          ${active ? `${step.borderColor} shadow-lg` : 'border-transparent'}
        `}
      >
        <motion.span
          animate={active ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}
        >
          {step.number}
        </motion.span>
      </button>
    </div>

    {/* Tooltip */}
    <AnimatePresence mode="wait">
      {active && (
        <div
          className="absolute z-50"
          style={{
            [isLeft ? 'left' : 'right']: 'calc(100% + 1rem)',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <Tooltip step={step.tooltip} onClose={onToggle} side={isLeft ? 'right' : 'left'} />
        </div>
      )}
    </AnimatePresence>
  </motion.div>
)

// ─── Main component ───────────────────────────────────────────────────────────

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15, rootMargin: '50px' })
  const [flowRef, flowInView] = useInView({ triggerOnce: true, threshold: 0.05, rootMargin: '50px' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const toggle = (id: string) => setActiveStep((prev) => (prev === id ? null : id))

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative bg-rb-black pt-0 pb-20 md:pb-32 overflow-hidden"
    >
      {/* ── Background ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '0%', top: '5%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          style={{ right: '0%', bottom: '5%' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-rb-blue/3 blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{ left: '45%', top: '40%' }}
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
        <motion.div ref={headerRef} className="text-center mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-6"
          >
            The Process
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rb-silver leading-tight"
          >
            From first contact
            <br />
            <span className="text-rb-blue">to finished project</span>
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
            Eight clear steps — tap any numbered node to see exactly what happens at that stage.
          </motion.p>
        </motion.div>

        {/* ── MOBILE: vertical stepper ── */}
        <div ref={flowRef} className="flex flex-col gap-5 md:hidden">
          {steps.map((step, i) => (
            <MobileStep
              key={step.id}
              step={step}
              index={i}
              inView={true}
              active={activeStep === step.id}
              onToggle={() => toggle(step.id)}
            />
          ))}
        </div>

        {/* ── DESKTOP: branched flow ── */}
        <div className="hidden md:block" ref={flowRef}>
          <div className="relative max-w-4xl xl:max-w-5xl mx-auto">

            {/* Central vertical spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 overflow-hidden">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={flowInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full bg-gradient-to-b from-rb-blue/60 via-rb-steel/40 to-rb-blue/60 origin-top"
              />
            </div>

            {/* Flow progress overlay */}
            <motion.div
              className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-rb-blue/80 origin-top"
              animate={{
                height: activeStep
                  ? `${((steps.findIndex(s => s.id === activeStep) + 1) / steps.length) * 100}%`
                  : '0%'
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Steps */}
            <div className="flex flex-col gap-10 py-4">
              {steps.map((step, index) => {
                const isLeft = index % 2 === 0
                return (
                  <div
                    key={step.id}
                    className={`relative flex items-center ${isLeft ? 'justify-end pr-[calc(50%-28px)]' : 'justify-start pl-[calc(50%-28px)]'}`}
                  >
                    <FlowNode
                      step={step}
                      index={index}
                      inView={flowInView}
                      active={activeStep === step.id}
                      onToggle={() => toggle(step.id)}
                      isLeft={isLeft}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={flowInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 md:mt-24 rounded-2xl border border-rb-silver/15 bg-rb-dark/30 backdrop-blur-sm p-8 md:p-12 text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-rb-silver mb-3">
            Ready to start your journey?
          </h3>
          <p className="text-rb-gray text-sm sm:text-base max-w-lg mx-auto mb-7 leading-relaxed">
            The first step takes two minutes. Fill in your brief and we handle everything from there.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm sm:text-base hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Submit your brief →
          </button>
        </motion.div>

      </div>
    </section>
  )
}