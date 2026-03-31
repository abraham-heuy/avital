import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef } from 'react'

// ─── Data ───────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'ai-dashboard',
    title: 'AI-Powered Analytics Dashboard',
    category: 'Machine Learning',
    year: '2024',
    tech: ['React', 'Python', 'TensorFlow', 'FastAPI'],
    tagline: 'Real-time predictions at a glance',
    description:
      'A final-year capstone project that ingests live sensor data, runs it through a trained LSTM model, and renders anomaly predictions on an interactive dashboard. Cut manual monitoring time by 70% for the client pilot.',
    outcome: '70% reduction in manual monitoring',
    url: '#',
    gradient: 'from-rb-blue/25 via-rb-dark/60 to-transparent',
    border: 'border-rb-blue/30',
    hoverBorder: 'hover:border-rb-blue/60',
    back: {
      problem: 'Client had no visibility into equipment failures until they happened — costing hours of downtime per incident.',
      solution: 'Built an LSTM anomaly-detection pipeline with a React dashboard and WebSocket live updates.',
      stack: 'React · TensorFlow · FastAPI · PostgreSQL · Docker',
      result: 'Deployed to 3 pilot sites — zero missed anomalies in first 60 days.',
    },
  },
  {
    id: 'blockchain-supply',
    title: 'Blockchain Supply Chain Tracker',
    category: 'Web3 / Distributed Systems',
    year: '2024',
    tech: ['Solidity', 'Web3.js', 'Node.js', 'IPFS'],
    tagline: 'End-to-end traceability on-chain',
    description:
      'A decentralised logistics platform where each shipment milestone is recorded as an immutable smart-contract event. Built as a group capstone for a logistics company looking to eliminate paper-based audits.',
    outcome: 'Eliminated paper audits across 4 warehouses',
    url: '#',
    gradient: 'from-rb-steel/25 via-rb-dark/60 to-transparent',
    border: 'border-rb-steel/30',
    hoverBorder: 'hover:border-rb-steel/60',
    back: {
      problem: 'Shipment records were paper-based — reconciliation took days and disputes were unresolvable.',
      solution: 'Smart contracts on a private Ethereum chain log every handoff; IPFS stores document hashes.',
      stack: 'Solidity · Hardhat · Web3.js · Node.js · IPFS · React',
      result: 'Dispute resolution time dropped from 5 days to under 2 hours.',
    },
  },
  {
    id: 'health-app',
    title: 'Cross-Platform Patient Monitor',
    category: 'Mobile / Healthcare',
    year: '2023',
    tech: ['React Native', 'Firebase', 'ML Kit', 'HL7 FHIR'],
    tagline: 'Continuous monitoring without the clinic',
    description:
      'A mobile app that collects vitals via Bluetooth wearables, flags risk patterns using on-device ML, and pushes alerts to a clinical dashboard. Submitted as a final-year project in Biomedical Engineering.',
    outcome: 'Flagged 92% of critical events in pilot',
    url: '#',
    gradient: 'from-rb-blue/20 via-rb-dark/60 to-transparent',
    border: 'border-rb-blue/25',
    hoverBorder: 'hover:border-rb-blue/50',
    back: {
      problem: 'Patients discharged early had no way to alert clinicians of deterioration between check-ups.',
      solution: 'BLE wearable integration + on-device TFLite model classifies risk without internet dependency.',
      stack: 'React Native · Firebase · ML Kit · TFLite · HL7 FHIR',
      result: '92% sensitivity on critical events in 3-month hospital pilot.',
    },
  },
  {
    id: 'iot-farm',
    title: 'Smart Farm IoT Platform',
    category: 'IoT / Embedded Systems',
    year: '2024',
    tech: ['Raspberry Pi', 'MQTT', 'InfluxDB', 'Grafana'],
    tagline: 'Precision agriculture for small farms',
    description:
      'An end-to-end IoT system that reads soil moisture, temperature, and humidity from distributed sensors, stores time-series data in InfluxDB, and triggers automated irrigation via relay controllers.',
    outcome: '40% water usage reduction in field trial',
    url: '#',
    gradient: 'from-rb-steel/20 via-rb-dark/60 to-transparent',
    border: 'border-rb-silver/25',
    hoverBorder: 'hover:border-rb-steel/50',
    back: {
      problem: 'Small-scale farmers over-irrigated by guesswork — wasting water and reducing crop yields.',
      solution: 'Raspberry Pi edge nodes + MQTT broker feed InfluxDB; Grafana alerts trigger solenoid valves.',
      stack: 'Raspberry Pi · MicroPython · MQTT · InfluxDB · Grafana · Node-RED',
      result: '40% water reduction and 18% yield improvement after one season.',
    },
  },
  {
    id: 'devops-pipeline',
    title: 'Automated CI/CD & MLOps Pipeline',
    category: 'DevOps / MLOps',
    year: '2024',
    tech: ['GitHub Actions', 'Docker', 'Kubernetes', 'MLflow'],
    tagline: 'From commit to production in minutes',
    description:
      'A fully automated pipeline that tests, containerises, and deploys a machine learning model on every merge — with MLflow experiment tracking, staged rollouts, and automatic rollback on metric regression.',
    outcome: 'Deploy time cut from 3 days to 18 minutes',
    url: '#',
    gradient: 'from-rb-blue/20 via-rb-dark/60 to-transparent',
    border: 'border-rb-blue/25',
    hoverBorder: 'hover:border-rb-blue/50',
    back: {
      problem: 'Team was manually deploying model updates — slow, error-prone, and untraceable.',
      solution: 'GitHub Actions orchestrates build → test → Docker push → Helm deploy on every merge to main.',
      stack: 'GitHub Actions · Docker · Kubernetes · Helm · MLflow · Prometheus',
      result: 'Release cadence went from bi-weekly to daily; zero production rollback failures in 4 months.',
    },
  },
  {
    id: 'nlp-grader',
    title: 'NLP Automated Essay Grader',
    category: 'NLP / EdTech',
    year: '2023',
    tech: ['Python', 'HuggingFace', 'FastAPI', 'Vue.js'],
    tagline: 'Consistent, explainable feedback at scale',
    description:
      'A transformer-based grading assistant that scores essays on rubric dimensions and generates per-sentence feedback. Built to support a university department handling 800+ submissions per semester.',
    outcome: 'Graded 800+ essays with 88% inter-rater agreement',
    url: '#',
    gradient: 'from-rb-steel/20 via-rb-dark/60 to-transparent',
    border: 'border-rb-steel/25',
    hoverBorder: 'hover:border-rb-steel/50',
    back: {
      problem: 'Lecturers spent 3+ weeks grading each cohort — inconsistency complaints were rising.',
      solution: 'Fine-tuned DeBERTa on past graded essays; SHAP values surface which sentences drove the score.',
      stack: 'Python · HuggingFace · SHAP · FastAPI · Vue.js · PostgreSQL',
      result: '88% agreement with human graders; average marking time per essay fell from 18 min to 3 min.',
    },
  },
]

const consultants = [
    {
        name: 'Joel Irungu',
        role: 'Full-Stack & DevOps Lead',
        university: 'Meru University',
        tags: ['Angular', 'Node.js', 'Docker', 'Kubernetes', 'Scalability', 'UI/UX'],
        projects: 24,
        rating: 5.0,
        quote:
          'The best way to learn is to build something that actually matters to someone. Every project here is real. We are a very flexible team. ',
        portfolio: '#',
        initials: 'JI',
        accentColor: 'bg-rb-steel/20 text-rb-silver border-rb-silver/30',
      },
  {
    name: 'Abraham Kioko',
    role: 'ML & Data Engineering Lead',
    university: 'Dedan Kimathi University of Technology',
    tags: ['MLOps', 'Python', 'TensorFlow', 'AWS ML', 'AWS SageMaker', 'Governance & Compliance'],
    projects: 18,
    rating: 4.9,
    quote:
      'I just love playing with tech, and it is very fun. I will help you upto success. I can do also what Joel does 😅',
    portfolio: '#',
    initials: 'AK',
    accentColor: 'bg-rb-blue/20 text-rb-blue border-rb-blue/30',
  },
 

 
]

const fields = [
  'DevOps', 'MLOps', 'Artificial Intelligence', 'Azure', 'AWS',
  'Web Development', 'IoT', 'Problem Solving', 'Scrum & Agile',
  'Data Engineering', 'Blockchain', 'Embedded Systems', 'NLP',
  'Cloud Architecture', 'Mobile Development', 'Cybersecurity',
  'System Design', 'React & Next.js', 'Python', 'Computer Vision',
]

// ─── Flip Project Card ───────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  index,
  inView,
}: {
  project: typeof projects[0]
  index: number
  inView: boolean
}) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="h-[360px] cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className={`
            absolute inset-0 rounded-2xl flex flex-col justify-between overflow-hidden
            bg-gradient-to-br ${project.gradient}
            bg-rb-dark/50 backdrop-blur-md
            border ${project.border} ${project.hoverBorder}
            transition-colors duration-300
          `}
        >
          {/* Top meta */}
          <div className="p-5 pb-0 flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-rb-blue/70 border border-rb-blue/25 px-2.5 py-1 rounded-full bg-rb-blue/10">
                {project.category}
              </span>
              <p className="text-rb-gray/40 text-xs mt-2">{project.year}</p>
            </div>
            {/* Visit site icon */}
            <motion.a
              href={project.url}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full border border-rb-silver/20 bg-rb-dark/60 flex items-center justify-center text-rb-silver/50 hover:text-rb-blue hover:border-rb-blue/40 transition-all duration-200"
              title="Visit project"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </motion.a>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col gap-3 flex-1 justify-end">
            <h3 className="text-lg font-bold text-rb-silver leading-snug">{project.title}</h3>
            <p className="text-rb-gray text-sm leading-relaxed line-clamp-3">{project.description}</p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-rb-black/50 border border-rb-silver/15 text-rb-blue/80">
                  {t}
                </span>
              ))}
            </div>

            {/* Outcome + flip hint */}
            <div className="flex items-center justify-between pt-2 border-t border-rb-silver/10">
              <span className="text-xs text-green-400 font-medium">{project.outcome}</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="text-xs text-rb-blue/50 font-medium"
              >
                Flip for details →
              </motion.span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className={`
            absolute inset-0 rounded-2xl flex flex-col justify-between overflow-hidden p-5
            bg-rb-dark/90 backdrop-blur-md
            border ${project.border}
          `}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-rb-blue/60 mb-4">
              Case Study
            </p>

            <div className="space-y-3">
              {[
                { label: 'Problem', value: project.back.problem },
                { label: 'Solution', value: project.back.solution },
                { label: 'Result', value: project.back.result },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={flipped ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08 }}
                >
                  <p className="text-xs font-bold text-rb-silver/50 uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-rb-gray text-sm leading-relaxed">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={flipped ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-3 pt-3 border-t border-rb-silver/10"
            >
              <p className="text-xs font-bold text-rb-silver/40 uppercase tracking-wider mb-1">Stack</p>
              <p className="text-xs text-rb-blue/70 font-mono">{project.back.stack}</p>
            </motion.div>
          </div>

          <div className="flex gap-3 mt-4">
            <motion.a
              href={project.url}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black text-xs font-bold text-center tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Visit project
            </motion.a>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
              className="px-4 py-2.5 rounded-xl border border-rb-silver/20 text-rb-gray text-xs font-semibold hover:border-rb-silver/40 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Consultant Card ─────────────────────────────────────────────────────────

const ConsultantCard = ({
  consultant,
  index,
  inView,
}: {
  consultant: typeof consultants[0]
  index: number
  inView: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5 }}
    className="relative flex flex-col rounded-2xl overflow-hidden bg-rb-dark/40 backdrop-blur-md border border-rb-silver/15 hover:border-rb-blue/35 transition-all duration-300 p-6 group"
  >
    {/* Hover glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-rb-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

    {/* Avatar + name */}
    <div className="flex items-center gap-4 mb-4 relative z-10">
      <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-sm flex-shrink-0 ${consultant.accentColor}`}>
        {consultant.initials}
      </div>
      <div>
        <p className="font-bold text-rb-silver text-base">{consultant.name}</p>
        <p className="text-rb-gray text-xs">{consultant.role}</p>
        <p className="text-rb-gray/40 text-xs">{consultant.university}</p>
      </div>
    </div>

    {/* Quote */}
    <blockquote className="relative z-10 text-rb-gray text-sm leading-relaxed italic border-l-2 border-rb-blue/40 pl-3 mb-4 flex-1">
      "{consultant.quote}"
    </blockquote>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
      {consultant.tags.map((tag) => (
        <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-rb-black/50 border border-rb-silver/15 text-rb-blue/70">
          {tag}
        </span>
      ))}
    </div>

    {/* Stats + portfolio */}
    <div className="flex items-center justify-between pt-4 border-t border-rb-silver/10 relative z-10">
      <div className="flex gap-4">
        <div>
          <p className="text-lg font-bold text-rb-blue">{consultant.projects}</p>
          <p className="text-xs text-rb-gray/50">Projects</p>
        </div>
        <div>
          <p className="text-lg font-bold text-rb-blue">{consultant.rating}</p>
          <p className="text-xs text-rb-gray/50">Rating</p>
        </div>
      </div>
      <motion.a
        href={consultant.portfolio}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 text-xs font-semibold text-rb-blue border border-rb-blue/30 px-3 py-1.5 rounded-full hover:bg-rb-blue/10 transition-colors"
      >
        Portfolio
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </motion.a>
    </div>
  </motion.div>
)

// ─── Scrolling fields ticker ─────────────────────────────────────────────────

const FieldsTicker = () => {
  const doubled = [...fields, ...fields]

  return (
    <div className="relative overflow-hidden py-6 mt-16 border-t border-b border-rb-silver/10">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-rb-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-rb-black to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-0 whitespace-nowrap w-max"
      >
        {doubled.map((field, i) => (
          <span key={i} className="flex items-center">
            <span className="text-rb-gray/60 text-sm sm:text-base font-medium tracking-wide px-4 hover:text-rb-blue transition-colors duration-200 cursor-default">
              {field}
            </span>
            <span className="w-2 h-2 rounded-full bg-rb-blue/50 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [consultantsRef, consultantsInView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative bg-rb-black py-20 md:py-32 overflow-hidden"
    >
      {/* ── Background ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ left: '5%', top: '5%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ right: '5%', bottom: '10%' }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-rb-blue/3 blur-2xl"
          animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'linear' }}
          style={{ left: '42%', top: '50%' }}
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

        {/* ══ SECTION 1: Projects ══════════════════════════════════════════ */}
        <motion.div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-6"
          >
            Student Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rb-silver leading-tight"
          >
            Complex projects,
            <br />
            <span className="text-rb-blue">real outcomes</span>
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
            Every project below was built by a student — guided by our consultants — and delivered to a real client or submitted as a graded capstone.
            Tap any card to read the full case study.
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <div
          ref={projectsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={projectsInView} />
          ))}
        </div>

        {/* ══ SECTION 2: Consultants ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-24 md:mt-32 mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={projectsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="inline-block px-4 py-1.5 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-6"
          >
            Our Consultants
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-rb-silver leading-tight"
          >
            Guided by students
            <br />
            <span className="text-rb-blue">who have done it before</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={projectsInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="w-24 h-0.5 bg-gradient-to-r from-rb-blue to-rb-steel mx-auto mt-6 origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-rb-gray mt-5 max-w-xl mx-auto text-base leading-relaxed"
          >
            Our consultants are not professors — they are current and recent students who shipped real projects, sat your exams, and know exactly where the hard parts are.
          </motion.p>
        </motion.div>

        {/* Consultants grid */}
        <div
          ref={consultantsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {consultants.map((c, i) => (
            <ConsultantCard key={c.name} consultant={c} index={i} inView={consultantsInView} />
          ))}
        </div>

        {/* ══ SECTION 3: Fields ticker ══════════════════════════════════════ */}
        <FieldsTicker />

      </div>
    </section>
  )
}