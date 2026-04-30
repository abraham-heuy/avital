import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef } from 'react'

const services = [
  {
    title: '1:1 Expert Consultation',
    front: { headline: 'Talk to someone who has been there', summary: 'Direct sessions with students and graduates who have shipped real products, aced interviews, and navigated the same challenges you face right now.', tag: 'On‑demand' },
    back: { what: 'What you get', points: ['Scheduled or instant video/chat sessions', 'Domain‑matched consultant pairing', 'Session notes and action plan after every call', 'Follow‑up Q&A within 24 hours'], cta: 'Book a session' }
  },
  {
    title: 'Final Year Project Guidance',
    front: { headline: 'Your capstone deserves expert eyes', summary: 'End‑to‑end mentorship for final year and capstone projects — from idea validation to implementation and presentation.', tag: 'Most popular' },
    back: { what: 'What you get', points: ['Topic selection and feasibility review', 'Architecture and tech stack guidance', 'Weekly milestone check‑ins', 'Report writing and documentation support', 'Presentation coaching and mock defense'], cta: 'Start my project' }
  },
  {
    title: 'Project Architecture Review',
    front: { headline: 'Build it right before you build it big', summary: 'Get your project structure, database design, and system architecture reviewed before you write production code.', tag: 'Deep dive' },
    back: { what: 'What you get', points: ['Full codebase or design document review', 'Scalability and performance recommendations', 'Database schema and API design critique', 'Written report with annotated feedback', 'One revision round included'], cta: 'Submit for review' }
  },
  {
    title: 'Code Optimization & Debugging',
    front: { headline: 'Stuck? We unstick you — fast', summary: 'From cryptic bugs to slow queries, our consultants dig in, explain what went wrong, and help you fix it properly.', tag: 'Quick turnaround' },
    back: { what: 'What you get', points: ['Live debugging sessions via screen share', 'Code quality and best‑practice audit', 'Refactoring roadmap with priority order', 'Performance profiling and bottleneck fixes'], cta: 'Fix my code' }
  },
  {
    title: 'Career & Interview Preparation',
    front: { headline: 'Land the role you actually want', summary: 'Mock technical interviews, resume teardowns, portfolio reviews — from people who recently went through it.', tag: 'Career track' },
    back: { what: 'What you get', points: ['Live mock interviews with detailed feedback', 'Resume and LinkedIn profile review', 'GitHub and portfolio critique', 'Salary negotiation and offer guidance', 'Company‑specific prep for target roles'], cta: 'Prep for interviews' }
  },
  {
    title: 'Group Workshops & Study Sessions',
    front: { headline: 'Learn harder problems together', summary: 'Structured group sessions covering algorithms, system design, and exam prep — shaped by what students actually need.', tag: 'Collaborative' },
    back: { what: 'What you get', points: ['Weekly themed workshop sessions', 'Recorded sessions for later review', 'Shared notes and resource packs', 'Small cohorts — max 8 students per session', 'Custom sessions on request for your course'], cta: 'Join a workshop' }
  },
]

const FlipCard = ({ service, index, inView }: { service: typeof services[0], index: number, inView: boolean }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: -5 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-[340px] sm:h-[360px] perspective-1000 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* FRONT */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 rounded-organic p-5 sm:p-6 flex flex-col justify-between
                     bg-fog-lime/10 backdrop-blur-sm
                     border border-accent-lime/30
                     shadow-soft hover:shadow-glow
                     transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-accent-limeStrong 
                             border border-accent-lime/30 px-2.5 py-1 rounded-full bg-fog-lime/20 font-sketch">
              {service.front.tag}
            </span>
            <motion.div
              animate={{ rotate: flipped ? 45 : 0 }}
              className="w-6 h-6 rounded-full border border-ink-faint/30 flex items-center justify-center text-ink-faint text-sm"
            >
              +
            </motion.div>
          </div>
          <div className="mt-4">
            <h3 className="text-base sm:text-lg font-display font-bold text-ink mb-2 leading-snug">
              {service.title}
            </h3>
            <p className="text-ink-soft text-xs sm:text-sm leading-relaxed font-sketch">
              {service.front.summary}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-accent-limeStrong/70 font-medium mt-3 font-sketch">
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              →
            </motion.span>
            Tap to see what's included
          </div>
        </div>

        {/* BACK */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-organic p-5 sm:p-6 flex flex-col justify-between
                     bg-fog-lime/20 backdrop-blur-sm
                     border border-accent-lime/40
                     shadow-soft"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-wider uppercase text-accent-limeStrong mb-3 font-sketch">
              {service.back.what}
            </p>
            <ul className="space-y-2">
              {service.back.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={flipped ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-2 text-xs text-ink-soft font-sketch"
                >
                  <span className="mt-1 w-1 h-1 rounded-full bg-accent-limeStrong flex-shrink-0" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-full mt-4 py-2 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong
                       text-ink text-xs sm:text-sm font-bold tracking-wide
                       hover:shadow-glow transition-all duration-300 font-sketch"
          >
            {service.back.cta} →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="services" ref={sectionRef} className="relative py-8 md:py-12 overflow-hidden">
      {/* Artistic background decorations – same as Hero, but no separators */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #A6A6A6 0.8px, transparent 0.8px)`,
            backgroundSize: '22px 22px',
          }}
        />
        <motion.svg
          className="absolute left-[-8%] top-[5%] w-56 sm:w-72 opacity-30"
          viewBox="0 0 200 100"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12,48 C48,12 68,18 96,46 C124,74 148,70 176,44" fill="none" stroke="#C7F36B" strokeWidth="1.2" strokeDasharray="4 8 2 6" strokeLinecap="round" />
        </motion.svg>
        <motion.svg
          className="absolute right-[-5%] bottom-[10%] w-40 sm:w-56 opacity-25"
          viewBox="0 0 220 160"
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M22,70 C38,32 62,22 88,44 C114,66 134,58 156,38" fill="none" stroke="#FFD699" strokeWidth="1.1" strokeDasharray="3 7 2 8" strokeLinecap="round" />
          <path d="M28,98 C54,78 78,86 104,102 C130,118 150,112 168,94" fill="none" stroke="#C7F36B" strokeWidth="1.15" strokeDasharray="4 6 1 7" strokeLinecap="round" opacity="0.7" />
        </motion.svg>
        <motion.div
          className="absolute left-[6%] bottom-[20%] w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-accent-lime/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={headerInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-3 py-1 rounded-full border border-accent-lime/40 bg-fog-lime text-accent-limeStrong text-[11px] font-semibold tracking-wider uppercase mb-4 font-sketch"
          >
            What We Offer
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
            Every kind of help
            <br />
            <span className="text-accent-limeStrong">students actually need</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-0.5 bg-gradient-to-r from-accent-lime to-accent-limeStrong mx-auto mt-5"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-ink-soft mt-5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-sketch"
          >
            Whether you are stuck on a bug at midnight, preparing for a final year project defense,
            or trying to break into your first tech role — we have a consultant and a service built for exactly that moment.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-ink-faint mt-2 text-xs font-sketch"
          >
            Tap any card to see what is included
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <FlipCard key={service.title} service={service} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA – fully transparent, only border and glow on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 md:mt-12 rounded-blob border-2 border-dashed border-accent-lime/40 bg-transparent p-6 md:p-8 text-center shadow-soft hover:shadow-glow transition-all duration-300"
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-ink mb-2">
            Not sure which service fits?
          </h3>
          <p className="text-ink-soft text-sm max-w-lg mx-auto mb-6 font-sketch">
            Tell us what you are working on and we will match you with the right consultant — no commitment needed.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow hover:scale-105 transition-all duration-300 font-sketch"
          >
            Get matched for free →
          </button>
        </motion.div>
      </div>
    </section>
  )
}