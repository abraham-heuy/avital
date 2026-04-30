// Projects.tsx – seamless, artistic, no emojis, hidden scrollbars, theme fonts
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

// ==================== DATA ====================

const projects = [
  {
    id: 'ai-dashboard',
    title: 'AI-Powered Analytics Dashboard',
    category: 'Machine Learning',
    year: '2024',
    tech: ['React', 'Python', 'TensorFlow', 'FastAPI'],
    tagline: 'Real-time predictions at a glance',
    description:
      'A final-year capstone that ingests live sensor data, runs it through a trained LSTM model, and renders anomaly predictions on an interactive dashboard. Cut manual monitoring time by 70% for the client pilot.',
    url: '#',
    back: {
      problem: 'Client had no visibility into equipment failures until they happened — costing hours of downtime per incident.',
      solution: 'Built an LSTM anomaly-detection pipeline with a React dashboard and WebSocket live updates.',
      result: 'Deployed to 3 pilot sites — zero missed anomalies in first 60 days.',
      stack: 'React · TensorFlow · FastAPI · PostgreSQL · Docker',
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
      'A decentralised logistics platform where each shipment milestone is recorded as an immutable smart‑contract event. Eliminated paper audits across 4 warehouses.',
    url: '#',
    back: {
      problem: 'Shipment records were paper‑based — reconciliation took days and disputes were unresolvable.',
      solution: 'Smart contracts on a private Ethereum chain log every handoff; IPFS stores document hashes.',
      result: 'Dispute resolution time dropped from 5 days to under 2 hours.',
      stack: 'Solidity · Hardhat · Web3.js · Node.js · IPFS · React',
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
      'A mobile app that collects vitals via Bluetooth wearables, flags risk patterns using on-device ML, and pushes alerts to a clinical dashboard. Flagged 92% of critical events in pilot.',
    url: '#',
    back: {
      problem: 'Patients discharged early had no way to alert clinicians of deterioration between check‑ups.',
      solution: 'BLE wearable integration + on‑device TFLite model classifies risk without internet dependency.',
      result: '92% sensitivity on critical events in 3‑month hospital pilot.',
      stack: 'React Native · Firebase · ML Kit · TFLite · HL7 FHIR',
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
      'An end‑to‑end IoT system reading soil moisture, temperature, and humidity, storing time‑series data, and triggering automated irrigation. Reduced water usage by 40% in field trial.',
    url: '#',
    back: {
      problem: 'Small‑scale farmers over‑irrigated by guesswork — wasting water and reducing crop yields.',
      solution: 'Raspberry Pi edge nodes + MQTT broker feed InfluxDB; Grafana alerts trigger solenoid valves.',
      result: '40% water reduction and 18% yield improvement after one season.',
      stack: 'Raspberry Pi · MicroPython · MQTT · InfluxDB · Grafana · Node‑RED',
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
      'A fully automated pipeline that tests, containerises, and deploys a machine learning model on every merge — with MLflow experiment tracking, staged rollouts, and automatic rollback.',
    url: '#',
    back: {
      problem: 'Team was manually deploying model updates — slow, error‑prone, and untraceable.',
      solution: 'GitHub Actions orchestrates build → test → Docker push → Helm deploy on every merge to main.',
      result: 'Release cadence went from bi‑weekly to daily; zero production rollback failures in 4 months.',
      stack: 'GitHub Actions · Docker · Kubernetes · Helm · MLflow · Prometheus',
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
      'A transformer‑based grading assistant scoring essays on rubric dimensions and generating per‑sentence feedback. Graded 800+ essays with 88% inter‑rater agreement.',
    url: '#',
    back: {
      problem: 'Lecturers spent 3+ weeks grading each cohort — inconsistency complaints were rising.',
      solution: 'Fine‑tuned DeBERTa on past graded essays; SHAP values surface which sentences drove the score.',
      result: '88% agreement with human graders; average marking time fell from 18 min to 3 min.',
      stack: 'Python · HuggingFace · SHAP · FastAPI · Vue.js · PostgreSQL',
    },
  },
]

const consultants = [
  {
    name: 'Joel Irungu',
    role: 'Full‑Stack & DevOps Lead',
    university: 'Kenya Methodist University',
    tags: ['Angular', 'Node.js', 'Docker', 'Kubernetes', 'Express', 'UI/UX'],
    projects: 24,
    rating: 5.0,
    quote:
      'The best way to learn is to build something that actually matters to someone. We offer the practical part.',
    portfolio: '#',
    initials: 'JI',
  },
  {
    name: 'Abraham Kioko',
    role: 'ML & Data Engineering Lead',
    university: 'Dedan Kimathi University of Technology',
    tags: ['MLOps', 'Python', 'TensorFlow', 'AWS ML', 'AWS SageMaker', 'Governance & Compliance'],
    projects: 18,
    rating: 4.9,
    quote:
      'I just love playing with tech, and it is very fun. I will help you up to success. I can do also what Joel does 😅',
    portfolio: '#',
    initials: 'AK',
  },
]

const fields = [
  'DevOps', 'MLOps', 'Artificial Intelligence', 'Azure', 'AWS',
  'Web Development', 'IoT', 'Problem Solving', 'Scrum & Agile',
  'Data Engineering', 'Blockchain', 'Embedded Systems', 'NLP',
  'Cloud Architecture', 'Mobile Development', 'Cybersecurity',
  'System Design', 'React & Next.js', 'Python', 'Computer Vision',
]

// ==================== PROJECT CARD (non‑flip) ====================

const ProjectCard = ({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) => {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="relative rounded-organic overflow-hidden"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
      onClick={() => setShowOverlay(!showOverlay)}
    >
      {/* Front card */}
      <div className="bg-fog-lime/10 backdrop-blur-sm border border-accent-lime/30 rounded-organic p-5 transition-all duration-300 hover:border-accent-lime/60 font-sketch">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-accent-limeStrong border border-accent-lime/30 px-2 py-0.5 rounded-full bg-fog-lime/20">
              {project.category}
            </span>
            <p className="text-ink-faint text-[9px] mt-1">{project.year}</p>
          </div>
          <motion.a
            href={project.url}
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.1 }}
            className="w-7 h-7 rounded-full border border-ink-faint/20 bg-fog-lime/10 flex items-center justify-center text-ink-faint hover:text-accent-limeStrong hover:border-accent-lime/40 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </motion.a>
        </div>

        <div className="mt-2 text-center">
          <h3 className="text-base font-display font-bold text-ink">{project.title}</h3>
          <p className="text-ink-soft text-xs leading-relaxed mt-1 line-clamp-3">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-1 justify-center mt-3">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-fog-lime/30 border border-accent-lime/20 text-accent-limeStrong">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-fog-lime/30 border border-ink-faint/20 text-ink-faint">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-ink-faint/10 flex justify-end">
          <span className="text-[9px] text-accent-limeStrong/70">
            {showOverlay ? 'Tap to close' : 'Tap to explore'}
          </span>
        </div>
      </div>

      {/* Overlay – hidden scrollbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showOverlay ? 1 : 0, y: showOverlay ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-fog-lime/90 backdrop-blur-md rounded-organic p-4 flex flex-col justify-between overflow-y-auto scrollbar-hide"
        style={{ pointerEvents: showOverlay ? 'auto' : 'none' }}
      >
        <div>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-accent-limeStrong mb-2 font-sketch">Case study</p>
          <div className="space-y-2 font-sketch">
            <div>
              <p className="text-[9px] font-bold text-ink/70">Problem</p>
              <p className="text-[11px] text-ink-soft">{project.back.problem}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-ink/70">Solution</p>
              <p className="text-[11px] text-ink-soft">{project.back.solution}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-ink/70">Result</p>
              <p className="text-[11px] text-ink-soft">{project.back.result}</p>
            </div>
            <div className="pt-1">
              <p className="text-[9px] font-bold text-ink/70">Stack</p>
              <p className="text-[9px] text-ink font-bold font-mono">{project.back.stack}</p>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowOverlay(false)
          }}
          className="mt-2 w-full py-1.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink text-[10px] font-bold hover:shadow-glow transition-all font-sketch"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

// ==================== CONSULTANT CARD ====================

const ConsultantCard = ({ consultant, index, inView }: { consultant: typeof consultants[0]; index: number; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    whileHover={{ y: -4 }}
    className="bg-fog-lime/10 backdrop-blur-sm border border-accent-lime/20 rounded-organic p-5 transition-all duration-300 hover:border-accent-lime/50 font-sketch"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-lime to-accent-limeStrong flex items-center justify-center text-ink font-bold text-sm shadow-glow">
        {consultant.initials}
      </div>
      <div>
        <p className="font-bold text-ink text-sm">{consultant.name}</p>
        <p className="text-ink-soft text-[11px]">{consultant.role}</p>
        <p className="text-ink-faint text-[10px]">{consultant.university}</p>
      </div>
    </div>
    <p className="text-ink-soft text-xs italic border-l-2 border-accent-lime/30 pl-2 mb-3">“{consultant.quote}”</p>
    <div className="flex flex-wrap gap-1 mb-3">
      {consultant.tags.slice(0, 3).map((t) => (
        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-fog-lime/40 text-accent-limeStrong border border-accent-lime/20">
          {t}
        </span>
      ))}
      {consultant.tags.length > 3 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-fog-lime/30 text-ink-faint">+{consultant.tags.length - 3}</span>}
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-ink-faint/10">
      <div className="flex gap-3">
        <div>
          <p className="text-sm font-bold text-accent-limeStrong">{consultant.projects}</p>
          <p className="text-[9px] text-ink-faint">Projects</p>
        </div>
        <div>
          <p className="text-sm font-bold text-accent-limeStrong">{consultant.rating}</p>
          <p className="text-[9px] text-ink-faint">Rating</p>
        </div>
      </div>
      <motion.a
        href={consultant.portfolio}
        whileHover={{ scale: 1.05 }}
        className="text-[10px] font-semibold text-accent-limeStrong border border-accent-lime/30 px-2 py-1 rounded-full hover:bg-fog-lime/20 transition-colors"
      >
        Portfolio ↗
      </motion.a>
    </div>
  </motion.div>
)

// ==================== FIELDS TICKER ====================

const FieldsTicker = () => {
  const doubled = [...fields, ...fields]
  return (
    <div className="relative overflow-hidden py-5 mt-8 border-t border-b border-accent-lime/20">
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-0 whitespace-nowrap w-max"
      >
        {doubled.map((field, i) => (
          <span key={i} className="flex items-center">
            <span className="text-ink-soft text-xs sm:text-sm font-medium tracking-wide px-4 hover:text-accent-limeStrong transition-colors cursor-default font-sketch">
              {field}
            </span>
            <span className="w-1 h-1 rounded-full bg-accent-lime/70 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ==================== MAIN COMPONENT ====================

export const Projects = () => {
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [consultantsRef, consultantsInView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="projects" className="relative py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div ref={headerRef} className="text-center mb-8 md:mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block px-3 py-1 rounded-full border border-accent-lime/40 bg-fog-lime text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase mb-3 font-sketch"
          >
            Student Work
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink leading-tight">
            Complex projects,
            <br />
            <span className="text-accent-limeStrong">real outcomes</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-0.5 bg-gradient-to-r from-accent-lime to-accent-limeStrong mx-auto mt-4"
          />
          <p className="text-ink-soft mt-4 max-w-xl mx-auto text-sm font-sketch">
            Every project below was built by a student — guided by our consultants — and delivered to a real client or submitted as a graded capstone.
            Tap or hover on any card to read the full case study.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div ref={projectsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={projectsInView} />
          ))}
        </div>

        {/* Consultants section */}
        <div className="mt-12 md:mt-16 text-center">
          <span className="inline-block px-3 py-1 rounded-full border border-accent-lime/40 bg-fog-lime text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase mb-3 font-sketch">
            Our Consultants
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-ink">
            Guided by students
            <br />
            <span className="text-accent-limeStrong">who have done it before</span>
          </h3>
          <p className="text-ink-soft mt-3 max-w-lg mx-auto text-sm font-sketch">
            Our consultants are not professors — they are current and recent students who shipped real projects, sat your exams, and know exactly where the hard parts are.
          </p>
        </div>

        <div ref={consultantsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {consultants.map((c, i) => (
            <ConsultantCard key={c.name} consultant={c} index={i} inView={consultantsInView} />
          ))}
        </div>

        {/* Fields ticker */}
        <FieldsTicker />
      </div>

      <style>{`
        /* Hide scrollbar on overlay cards */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}