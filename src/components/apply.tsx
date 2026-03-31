import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  // Step 1 — About you
  name: string
  email: string
  university: string
  yearOfStudy: string
  // Step 2 — Your project
  service: string
  serviceOther: string
  projectTitle: string
  projectDescription: string
  // Step 3 — Details
  stack: string
  deadline: string
  urgency: string
  groupSize: string
  // Step 4 — Anything else
  blockers: string
  hearAboutUs: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  university: '',
  yearOfStudy: '',
  service: '',
  serviceOther: '',
  projectTitle: '',
  projectDescription: '',
  stack: '',
  deadline: '',
  urgency: '',
  groupSize: 'solo',
  blockers: '',
  hearAboutUs: '',
}

// ─── Service options ─────────────────────────────────────────────────────────

const services = [
  { id: '1on1', label: '1:1 Expert Consultation', desc: 'Single focused session on a specific problem' },
  { id: 'capstone', label: 'Final Year Project Guidance', desc: 'End-to-end mentorship for capstone or dissertation' },
  { id: 'architecture', label: 'Project Architecture Review', desc: 'Design review before you start building' },
  { id: 'debugging', label: 'Code Optimization & Debugging', desc: 'Fix bugs, improve performance, clean up code' },
  { id: 'career', label: 'Career & Interview Prep', desc: 'Mock interviews, resume review, job guidance' },
  { id: 'workshop', label: 'Group Workshop', desc: 'Structured session for a group of students' },
  { id: 'other', label: 'Something else', desc: 'Describe it in your own words' },
]

const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'PhD', 'Alumni']
const urgencyOptions = [
  { id: 'low', label: 'Relaxed', sub: 'More than 4 weeks' },
  { id: 'medium', label: 'Moderate', sub: '2 – 4 weeks' },
  { id: 'high', label: 'Urgent', sub: '1 – 2 weeks' },
  { id: 'critical', label: 'Critical', sub: 'Under a week' },
]

// ─── Step config ─────────────────────────────────────────────────────────────

const stepMeta = [
  { number: '01', title: 'About you', sub: 'Who are we talking to?' },
  { number: '02', title: 'Your project', sub: 'What do you need help with?' },
  { number: '03', title: 'Project details', sub: 'Help us understand the scope' },
  { number: '04', title: 'Final details', sub: 'Anything else we should know?' },
]

// ─── Small reusable input ─────────────────────────────────────────────────────

const Field = ({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) => (
  <div>
    <label className="block text-xs font-semibold tracking-widest uppercase text-rb-silver/50 mb-2">
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
)

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-rb-black/60 border border-rb-silver/15 text-rb-silver text-sm placeholder:text-rb-gray/30 focus:border-rb-blue/50 focus:outline-none focus:ring-1 focus:ring-rb-blue/30 transition-all duration-200'

// ─── Progress bar ─────────────────────────────────────────────────────────────

const Progress = ({ step, total }: { step: number; total: number }) => (
  <div className="flex items-center gap-2 mb-10">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
        <motion.div
          animate={{
            scale: i === step ? 1.1 : 1,
            backgroundColor:
              i < step ? '#3B82F6' : i === step ? '#3B82F6' : 'rgba(255,255,255,0.08)',
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border border-rb-silver/10"
          style={{ color: i <= step ? '#000' : 'rgba(255,255,255,0.3)' }}
        >
          {i < step ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            String(i + 1)
          )}
        </motion.div>
        {i < total - 1 && (
          <motion.div
            className="flex-1 h-0.5 rounded-full"
            animate={{ backgroundColor: i < step ? '#3B82F6' : 'rgba(255,255,255,0.08)' }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>
    ))}
  </div>
)

// ─── Steps ────────────────────────────────────────────────────────────────────

const Step1 = ({ data, update, errors }: { data: FormData; update: (k: keyof FormData, v: string) => void; errors: Partial<FormData> }) => (
  <div className="space-y-5">
    <Field label="Full name" error={errors.name}>
      <input
        className={inputClass}
        placeholder="e.g. John Doe"
        value={data.name}
        onChange={(e) => update('name', e.target.value)}
      />
    </Field>
    <Field label="Email address" error={errors.email}>
      <input
        type="email"
        className={inputClass}
        placeholder="you@university.ac.ke"
        value={data.email}
        onChange={(e) => update('email', e.target.value)}
      />
    </Field>
    <Field label="University / Institution" error={errors.university}>
      <input
        className={inputClass}
        placeholder="e.g. University of Nairobi"
        value={data.university}
        onChange={(e) => update('university', e.target.value)}
      />
    </Field>
    <Field label="Year of study">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {yearOptions.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => update('yearOfStudy', y)}
            className={`py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200
              ${data.yearOfStudy === y
                ? 'border-rb-blue/60 bg-rb-blue/15 text-rb-blue'
                : 'border-rb-silver/10 bg-rb-black/40 text-rb-gray hover:border-rb-silver/25'
              }`}
          >
            {y}
          </button>
        ))}
      </div>
    </Field>
  </div>
)

const Step2 = ({ data, update, errors }: { data: FormData; update: (k: keyof FormData, v: string) => void; errors: Partial<FormData> }) => (
  <div className="space-y-5">
    <Field label="What do you need help with?" error={errors.service}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => update('service', s.id)}
            className={`text-left px-4 py-3.5 rounded-xl border transition-all duration-200
              ${data.service === s.id
                ? 'border-rb-blue/60 bg-rb-blue/15'
                : 'border-rb-silver/10 bg-rb-black/40 hover:border-rb-silver/25'
              }`}
          >
            <p className={`text-sm font-semibold mb-0.5 ${data.service === s.id ? 'text-rb-blue' : 'text-rb-silver'}`}>
              {s.label}
            </p>
            <p className="text-xs text-rb-gray/60">{s.desc}</p>
          </button>
        ))}
      </div>
    </Field>

    {data.service === 'other' && (
      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
        <Field label="Describe what you need" error={errors.serviceOther}>
          <input
            className={inputClass}
            placeholder="Tell us in your own words..."
            value={data.serviceOther}
            onChange={(e) => update('serviceOther', e.target.value)}
          />
        </Field>
      </motion.div>
    )}

    <Field label="Project title" error={errors.projectTitle}>
      <input
        className={inputClass}
        placeholder="e.g. Smart Farm Irrigation System"
        value={data.projectTitle}
        onChange={(e) => update('projectTitle', e.target.value)}
      />
    </Field>

    <Field label="Brief description" error={errors.projectDescription}>
      <textarea
        rows={4}
        className={inputClass}
        placeholder="What is your project about? What are you trying to build or achieve?"
        value={data.projectDescription}
        onChange={(e) => update('projectDescription', e.target.value)}
      />
    </Field>
  </div>
)

const Step3 = ({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) => (
  <div className="space-y-5">
    <Field label="Tech stack (if known)">
      <input
        className={inputClass}
        placeholder="e.g. React, Node.js, PostgreSQL — or leave blank if unsure"
        value={data.stack}
        onChange={(e) => update('stack', e.target.value)}
      />
    </Field>

    <Field label="Submission or deadline date">
      <input
        type="date"
        className={inputClass}
        value={data.deadline}
        onChange={(e) => update('deadline', e.target.value)}
      />
    </Field>

    <Field label="How urgent is this?">
      <div className="grid grid-cols-2 gap-2.5">
        {urgencyOptions.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => update('urgency', u.id)}
            className={`text-left px-4 py-3 rounded-xl border transition-all duration-200
              ${data.urgency === u.id
                ? 'border-rb-blue/60 bg-rb-blue/15'
                : 'border-rb-silver/10 bg-rb-black/40 hover:border-rb-silver/25'
              }`}
          >
            <p className={`text-sm font-semibold ${data.urgency === u.id ? 'text-rb-blue' : 'text-rb-silver'}`}>
              {u.label}
            </p>
            <p className="text-xs text-rb-gray/50">{u.sub}</p>
          </button>
        ))}
      </div>
    </Field>

    <Field label="Solo or group?">
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { id: 'solo', label: 'Solo student', sub: 'Just me' },
          { id: 'group', label: 'Group booking', sub: '3–8 students' },
        ].map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => update('groupSize', g.id)}
            className={`text-left px-4 py-3 rounded-xl border transition-all duration-200
              ${data.groupSize === g.id
                ? 'border-rb-blue/60 bg-rb-blue/15'
                : 'border-rb-silver/10 bg-rb-black/40 hover:border-rb-silver/25'
              }`}
          >
            <p className={`text-sm font-semibold ${data.groupSize === g.id ? 'text-rb-blue' : 'text-rb-silver'}`}>
              {g.label}
            </p>
            <p className="text-xs text-rb-gray/50">{g.sub}</p>
          </button>
        ))}
      </div>
    </Field>
  </div>
)

const Step4 = ({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) => (
  <div className="space-y-5">
    <Field label="What is your biggest blocker right now?">
      <textarea
        rows={4}
        className={inputClass}
        placeholder="e.g. I cannot figure out why my API keeps returning 500 errors, and my deadline is in 10 days..."
        value={data.blockers}
        onChange={(e) => update('blockers', e.target.value)}
      />
    </Field>

    <Field label="How did you hear about us?">
      <div className="grid grid-cols-2 gap-2">
        {['Friend / classmate', 'Lecturer', 'Social media', 'Google search', 'Campus noticeboard', 'Other'].map((h) => (
          <button
            key={h}
            type="button"
            onClick={() => update('hearAboutUs', h)}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left transition-all duration-200
              ${data.hearAboutUs === h
                ? 'border-rb-blue/60 bg-rb-blue/15 text-rb-blue'
                : 'border-rb-silver/10 bg-rb-black/40 text-rb-gray hover:border-rb-silver/25'
              }`}
          >
            {h}
          </button>
        ))}
      </div>
    </Field>

    {/* Summary preview */}
    <div className="rounded-2xl border border-rb-silver/10 bg-rb-dark/30 p-5 space-y-2.5">
      <p className="text-xs font-bold tracking-widest uppercase text-rb-silver/40 mb-3">Your brief summary</p>
      {[
        { label: 'Name', value: data.name },
        { label: 'Email', value: data.email },
        { label: 'University', value: data.university },
        { label: 'Service', value: services.find(s => s.id === data.service)?.label || '—' },
        { label: 'Project', value: data.projectTitle || '—' },
        { label: 'Deadline', value: data.deadline || '—' },
        { label: 'Group size', value: data.groupSize === 'solo' ? 'Solo student' : 'Group booking' },
      ].map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-4 text-xs">
          <span className="text-rb-gray/40 flex-shrink-0">{row.label}</span>
          <span className="text-rb-silver text-right truncate max-w-[60%]">{row.value}</span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Success screen ───────────────────────────────────────────────────────────

const Success = ({ name, navigate }: { name: string; navigate: (path: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="text-center py-8"
  >
    {/* Animated checkmark */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
      className="w-20 h-20 rounded-full bg-gradient-to-br from-rb-blue to-rb-steel flex items-center justify-center mx-auto mb-8"
    >
      <motion.svg
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        width="36" height="36" viewBox="0 0 24 24" fill="none"
        stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <motion.polyline
          points="20 6 9 17 4 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </motion.svg>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-rb-silver mb-3">
        We have got your brief, {name.split(' ')[0]}
      </h2>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6">
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-2 h-2 rounded-full bg-green-400 inline-block"
        />
        Response within 1 hour
      </div>

      <p className="text-rb-gray text-base leading-relaxed max-w-md mx-auto mb-4">
        Your submission has been logged and a team member is already reviewing it. You will receive a match notification and next steps via email shortly.
      </p>

      <p className="text-rb-gray/50 text-sm mb-10">
        Check your inbox at the address you provided. It may take a moment to arrive.
      </p>

      {/* What happens next */}
      <div className="rounded-2xl border border-rb-silver/10 bg-rb-dark/30 p-6 text-left max-w-sm mx-auto mb-8 space-y-3">
        <p className="text-xs font-bold tracking-widest uppercase text-rb-silver/40 mb-4 text-center">
          What happens next
        </p>
        {[
          'Your brief is reviewed by our team',
          'A consultant is matched to your project',
          'You receive their profile for approval',
          'Your dashboard is activated',
          'You start your first session',
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-center gap-3 text-sm text-rb-gray"
          >
            <span className="w-5 h-5 rounded-full bg-rb-blue/20 border border-rb-blue/30 text-rb-blue text-xs flex items-center justify-center font-bold flex-shrink-0">
              {i + 1}
            </span>
            {item}
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm hover:opacity-90 hover:scale-105 transition-all duration-300"
      >
        Back to home →
      </button>
    </motion.div>
  </motion.div>
)

// ─── Main Apply page ──────────────────────────────────────────────────────────

export const Apply = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [direction, setDirection] = useState(1)

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Name is required'
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
      if (!form.university.trim()) e.university = 'University is required'
    }
    if (step === 1) {
      if (!form.service) e.service = 'Please select a service'
      if (form.service === 'other' && !form.serviceOther.trim()) e.serviceOther = 'Please describe what you need'
      if (!form.projectTitle.trim()) e.projectTitle = 'Project title is required'
      if (!form.projectDescription.trim()) e.projectDescription = 'Description is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, stepMeta.length - 1))
  }

  const back = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const submit = () => {
    console.log('Submitting:', form)
    setSubmitted(true)
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  return (
    <div className="min-h-screen bg-rb-black relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '-5%', top: '10%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{ right: '-5%', bottom: '5%' }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #ccc) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #ccc) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Nav bar */}
      <div className="relative z-10 border-b border-rb-silver/10 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-rb-gray hover:text-rb-silver transition-colors text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to site
        </button>
        <span className="text-rb-blue text-xs font-semibold tracking-widest uppercase">
          Avital — Apply
        </span>
        <div className="w-20" />
      </div>

      {/* Form container */}
      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16 max-w-2xl">
        {submitted ? (
          <Success name={form.name} navigate={navigate} />
        ) : (
          <>
            {/* Step header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-xs font-bold tracking-widest uppercase text-rb-blue/60">
                  Step {stepMeta[step].number} of {stepMeta.length}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-rb-silver">
                {stepMeta[step].title}
              </h1>
              <p className="text-rb-gray text-sm mt-1">{stepMeta[step].sub}</p>
            </motion.div>

            {/* Progress */}
            <Progress step={step} total={stepMeta.length} />

            {/* Animated step content */}
            <div className="relative overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 0 && <Step1 data={form} update={update} errors={errors} />}
                  {step === 1 && <Step2 data={form} update={update} errors={errors} />}
                  {step === 2 && <Step3 data={form} update={update} />}
                  {step === 3 && <Step4 data={form} update={update} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-rb-silver/10">
              <button
                onClick={back}
                disabled={step === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-rb-silver/15 text-rb-gray text-sm font-semibold hover:border-rb-silver/30 hover:text-rb-silver transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back
              </button>

              <span className="text-xs text-rb-gray/30">
                {step + 1} / {stepMeta.length}
              </span>

              {step < stepMeta.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={next}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm hover:opacity-90 transition-all duration-200"
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={submit}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm hover:opacity-90 transition-all duration-200"
                >
                  Submit brief
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    →
                  </motion.span>
                </motion.button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}