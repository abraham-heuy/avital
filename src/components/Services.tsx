import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const services = [
  {
    title: '1:1 Expert Consultation',
    front: {
      headline: 'Talk to someone who has been there',
      summary: 'Direct sessions with students and graduates who have shipped real products, aced interviews, and navigated the same challenges you face right now.',
      tag: 'On-demand'
    },
    back: {
      what: 'What you get',
      points: [
        'Scheduled or instant video/chat sessions',
        'Domain-matched consultant pairing',
        'Session notes and action plan after every call',
        'Follow-up Q&A within 24 hours',
      ],
      cta: 'Book a session'
    },
    accent: 'from-rb-blue/20 to-rb-steel/10',
    border: 'border-rb-blue/40',
    glow: 'shadow-rb-blue/10'
  },
  {
    title: 'Final Year Project Guidance',
    front: {
      headline: 'Your capstone deserves expert eyes',
      summary: 'End-to-end mentorship for final year and capstone projects — from idea validation and research methodology to implementation, testing, and presentation.',
      tag: 'Most popular'
    },
    back: {
      what: 'What you get',
      points: [
        'Topic selection and feasibility review',
        'Architecture and tech stack guidance',
        'Weekly milestone check-ins',
        'Report writing and documentation support',
        'Presentation coaching and mock defense prep',
      ],
      cta: 'Start my project'
    },
    accent: 'from-rb-steel/20 to-rb-blue/10',
    border: 'border-rb-steel/40',
    glow: 'shadow-rb-steel/10'
  },
  {
    title: 'Project Architecture Review',
    front: {
      headline: 'Build it right before you build it big',
      summary: 'Get your project structure, database design, and system architecture reviewed before you write a single line of production code.',
      tag: 'Deep dive'
    },
    back: {
      what: 'What you get',
      points: [
        'Full codebase or design document review',
        'Scalability and performance recommendations',
        'Database schema and API design critique',
        'Written report with annotated feedback',
        'One revision round included',
      ],
      cta: 'Submit for review'
    },
    accent: 'from-rb-blue/15 to-transparent',
    border: 'border-rb-blue/30',
    glow: 'shadow-rb-blue/10'
  },
  {
    title: 'Code Optimization & Debugging',
    front: {
      headline: 'Stuck? We unstick you — fast',
      summary: 'From cryptic bugs to slow queries and messy logic, our consultants dig in, explain what went wrong, and help you fix it properly — not just patch it.',
      tag: 'Quick turnaround'
    },
    back: {
      what: 'What you get',
      points: [
        'Live debugging sessions via screen share',
        'Code quality and best-practice audit',
        'Refactoring roadmap with priority order',
        'Performance profiling and bottleneck fixes',
      ],
      cta: 'Fix my code'
    },
    accent: 'from-rb-steel/15 to-transparent',
    border: 'border-rb-silver/30',
    glow: 'shadow-rb-silver/10'
  },
  {
    title: 'Career & Interview Preparation',
    front: {
      headline: 'Land the role you actually want',
      summary: 'Mock technical interviews, resume teardowns, portfolio reviews, and real talk about what hiring managers look for — from people who recently went through it.',
      tag: 'Career track'
    },
    back: {
      what: 'What you get',
      points: [
        'Live mock interviews with detailed feedback',
        'Resume and LinkedIn profile review',
        'GitHub and portfolio critique',
        'Salary negotiation and offer guidance',
        'Company-specific prep for target roles',
      ],
      cta: 'Prep for interviews'
    },
    accent: 'from-rb-blue/20 to-rb-steel/10',
    border: 'border-rb-blue/35',
    glow: 'shadow-rb-blue/10'
  },
  {
    title: 'Group Workshops & Study Sessions',
    front: {
      headline: 'Learn harder problems together',
      summary: 'Structured group sessions covering algorithms, system design, specific frameworks, and exam prep — led by consultants, shaped by what students actually need.',
      tag: 'Collaborative'
    },
    back: {
      what: 'What you get',
      points: [
        'Weekly themed workshop sessions',
        'Recorded sessions for later review',
        'Shared notes and resource packs',
        'Small cohorts — max 8 students per session',
        'Custom sessions on request for your course',
      ],
      cta: 'Join a workshop'
    },
    accent: 'from-rb-steel/20 to-rb-blue/10',
    border: 'border-rb-steel/35',
    glow: 'shadow-rb-steel/10'
  },
]

const FlipCard = ({ service, index, inView }: { service: typeof services[0], index: number, inView: boolean }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-[340px] sm:h-[360px] perspective-1000 cursor-pointer group"
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
          className={`
            absolute inset-0 rounded-2xl p-6 flex flex-col justify-between
            bg-gradient-to-br ${service.accent}
            bg-rb-dark/40 backdrop-blur-md
            border ${service.border}
            shadow-xl ${service.glow}
            transition-shadow duration-300
            group-hover:shadow-2xl
          `}
        >
          {/* Tag */}
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold tracking-widest uppercase text-rb-blue/80 border border-rb-blue/30 px-3 py-1 rounded-full bg-rb-blue/10">
              {service.front.tag}
            </span>
            <motion.div
              animate={{ rotate: flipped ? 45 : 0 }}
              className="w-7 h-7 rounded-full border border-rb-silver/30 flex items-center justify-center text-rb-silver/50 text-sm"
            >
              +
            </motion.div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-rb-silver mb-3 leading-snug">
              {service.title}
            </h3>
            <p className="text-rb-gray text-sm leading-relaxed">
              {service.front.summary}
            </p>
          </div>

          {/* Flip hint */}
          <div className="flex items-center gap-2 text-xs text-rb-blue/60 font-medium">
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
          className={`
            absolute inset-0 rounded-2xl p-6 flex flex-col justify-between
            bg-rb-dark/80 backdrop-blur-md
            border ${service.border}
            shadow-xl
          `}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-rb-blue/70 mb-4">
              {service.back.what}
            </p>
            <ul className="space-y-2.5">
              {service.back.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={flipped ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-2.5 text-sm text-rb-gray"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rb-blue flex-shrink-0" />
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
            className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
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

  return (
    <section id="services" className="py-20 md:py-32 bg-rb-black relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-rb-blue/4 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-rb-steel/4 blur-3xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #ccc) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #ccc) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-6"
          >
            What We Offer
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rb-silver leading-tight">
            Every kind of help
            <br />
            <span className="text-rb-blue">students actually need</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-0.5 bg-gradient-to-r from-rb-blue to-rb-steel mx-auto mt-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-rb-gray mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            Whether you are stuck on a bug at midnight, preparing for a final year project defense,
            or trying to break into your first tech role — we have a consultant and a service built for exactly that moment.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-rb-gray/60 mt-3 text-sm"
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

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 md:mt-20 rounded-2xl border border-rb-silver/15 bg-rb-dark/30 backdrop-blur-sm p-8 md:p-12 text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-rb-silver mb-3">
            Not sure which service fits?
          </h3>
          <p className="text-rb-gray text-sm sm:text-base max-w-xl mx-auto mb-8">
            Tell us what you are working on and we will match you with the right consultant and service — no commitment needed.
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