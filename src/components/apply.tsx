// Apply.tsx – themed lime/peach, underline inputs, improved contrast for labels & placeholders
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createApplication } from '../services/api.service'
import { BaseLayout } from './BaseLayout'

type FormData = {
  name: string; email: string; phone: string; university: string; yearOfStudy: string;
  service: string; serviceOther: string; projectTitle: string; projectDescription: string;
  stack: string; deadline: string; urgency: string; groupSize: string;
  blockers: string; hearAboutUs: string;
}

const initialForm: FormData = {
  name: '', email: '', phone: '', university: '', yearOfStudy: '',
  service: '', serviceOther: '', projectTitle: '', projectDescription: '',
  stack: '', deadline: '', urgency: '', groupSize: 'solo',
  blockers: '', hearAboutUs: '',
}

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
const stepMeta = [
  { number: '01', title: 'About you', sub: 'Who are we talking to?' },
  { number: '02', title: 'Your project', sub: 'What do you need help with?' },
  { number: '03', title: 'Project details', sub: 'Help us understand the scope' },
  { number: '04', title: 'Final details', sub: 'Anything else we should know?' },
]

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[11px] font-semibold tracking-wider uppercase text-ink-soft mb-1 font-sketch">
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1 font-sketch">{error}</p>}
  </div>
)

// Underline input – placeholder now more visible
const inputClass = 'w-full px-0 py-2 bg-transparent border-b border-accent-lime/30 text-ink text-sm placeholder:text-ink-faint focus:border-accent-lime/80 focus:outline-none transition-all duration-200 font-sketch'

// Button-like option (used for year, urgency, group, etc.) – keep full border because they are interactive tiles
const tileClass = (active: boolean) =>
  `text-left px-4 py-2.5 rounded-xl border transition-all duration-200 font-sketch ${
    active
      ? 'border-accent-lime/60 bg-fog-lime/20 text-accent-limeStrong'
      : 'border-accent-lime/20 bg-fog-lime/5 text-ink-soft hover:border-accent-lime/40'
  }`

const Progress = ({ step, total }: { step: number; total: number }) => (
  <div className="flex items-center gap-2 mb-10">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
        <motion.div
          animate={{
            scale: i === step ? 1.1 : 1,
            backgroundColor: i < step ? '#C7F36B' : i === step ? '#C7F36B' : 'rgba(199,243,107,0.15)',
            color: i <= step ? '#111' : 'rgba(42,42,42,0.4)',
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border border-accent-lime/20"
        >
          {i < step ? '✓' : String(i + 1)}
        </motion.div>
        {i < total - 1 && (
          <motion.div
            className="flex-1 h-0.5 rounded-full"
            animate={{ backgroundColor: i < step ? '#C7F36B' : 'rgba(199,243,107,0.15)' }}
          />
        )}
      </div>
    ))}
  </div>
)

// Step components – same logic, only styles changed
const Step1 = ({ data, update, errors }: { data: FormData; update: (k: keyof FormData, v: string) => void; errors: Partial<FormData> }) => (
  <div className="space-y-5">
    <Field label="Full name" error={errors.name}>
      <input className={inputClass} placeholder="e.g. John Doe" value={data.name} onChange={(e) => update('name', e.target.value)} />
    </Field>
    <Field label="Email address" error={errors.email}>
      <input type="email" className={inputClass} placeholder="you@university.ac.ke" value={data.email} onChange={(e) => update('email', e.target.value)} />
    </Field>
    <Field label="Phone number" error={errors.phone}>
      <input type="tel" className={inputClass} placeholder="+254 700 000 000" value={data.phone} onChange={(e) => update('phone', e.target.value)} />
    </Field>
    <Field label="University / Institution" error={errors.university}>
      <input className={inputClass} placeholder="e.g. University of Nairobi" value={data.university} onChange={(e) => update('university', e.target.value)} />
    </Field>
    <Field label="Year of study">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {yearOptions.map((y) => (
          <button key={y} type="button" onClick={() => update('yearOfStudy', y)} className={tileClass(data.yearOfStudy === y)}>
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
          <button key={s.id} type="button" onClick={() => update('service', s.id)} className={tileClass(data.service === s.id)}>
            <p className={`text-sm font-semibold mb-0.5 ${data.service === s.id ? 'text-accent-limeStrong' : 'text-ink'}`}>{s.label}</p>
            <p className="text-xs text-ink-faint">{s.desc}</p>
          </button>
        ))}
      </div>
    </Field>
    {data.service === 'other' && (
      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
        <Field label="Describe what you need" error={errors.serviceOther}>
          <input className={inputClass} placeholder="Tell us in your own words..." value={data.serviceOther} onChange={(e) => update('serviceOther', e.target.value)} />
        </Field>
      </motion.div>
    )}
    <Field label="Project title" error={errors.projectTitle}>
      <input className={inputClass} placeholder="e.g. Smart Farm Irrigation System" value={data.projectTitle} onChange={(e) => update('projectTitle', e.target.value)} />
    </Field>
    <Field label="Brief description" error={errors.projectDescription}>
      <textarea rows={4} className={inputClass} placeholder="What is your project about? What are you trying to build or achieve?" value={data.projectDescription} onChange={(e) => update('projectDescription', e.target.value)} />
    </Field>
  </div>
)

const Step3 = ({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) => (
  <div className="space-y-5">
    <Field label="Tech stack (if known)">
      <input className={inputClass} placeholder="e.g. React, Node.js, PostgreSQL — or leave blank if unsure" value={data.stack} onChange={(e) => update('stack', e.target.value)} />
    </Field>
    <Field label="Submission or deadline date">
      <input type="date" className={inputClass} value={data.deadline} onChange={(e) => update('deadline', e.target.value)} />
    </Field>
    <Field label="How urgent is this?">
      <div className="grid grid-cols-2 gap-2.5">
        {urgencyOptions.map((u) => (
          <button key={u.id} type="button" onClick={() => update('urgency', u.id)} className={tileClass(data.urgency === u.id)}>
            <p className={`text-sm font-semibold ${data.urgency === u.id ? 'text-accent-limeStrong' : 'text-ink'}`}>{u.label}</p>
            <p className="text-xs text-ink-faint">{u.sub}</p>
          </button>
        ))}
      </div>
    </Field>
    <Field label="Solo or group?">
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => update('groupSize', 'solo')} className={tileClass(data.groupSize === 'solo')}>
          <p className={`text-sm font-semibold ${data.groupSize === 'solo' ? 'text-accent-limeStrong' : 'text-ink'}`}>Solo student</p>
          <p className="text-xs text-ink-faint">Just me</p>
        </button>
        <button type="button" onClick={() => update('groupSize', 'group')} className={tileClass(data.groupSize === 'group')}>
          <p className={`text-sm font-semibold ${data.groupSize === 'group' ? 'text-accent-limeStrong' : 'text-ink'}`}>Group booking</p>
          <p className="text-xs text-ink-faint">3–8 students</p>
        </button>
      </div>
    </Field>
  </div>
)

const Step4 = ({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) => (
  <div className="space-y-5">
    <Field label="What is your biggest blocker right now?">
      <textarea rows={4} className={inputClass} placeholder="e.g. I cannot figure out why my API keeps returning 500 errors, and my deadline is in 10 days..." value={data.blockers} onChange={(e) => update('blockers', e.target.value)} />
    </Field>
    <Field label="How did you hear about us?">
      <div className="grid grid-cols-2 gap-2">
        {['Friend / classmate', 'Lecturer', 'Social media', 'Google search', 'Campus noticeboard', 'Other'].map((h) => (
          <button key={h} type="button" onClick={() => update('hearAboutUs', h)} className={tileClass(data.hearAboutUs === h)}>
            {h}
          </button>
        ))}
      </div>
    </Field>
    <div className="rounded-organic border border-accent-lime/20 bg-fog-lime/5 p-5 space-y-2.5">
      <p className="text-[10px] font-bold tracking-widest uppercase text-ink-soft mb-3">Your brief summary</p>
      {[
        { label: 'Name', value: data.name || '—' },
        { label: 'Email', value: data.email || '—' },
        { label: 'Phone', value: data.phone || '—' },
        { label: 'University', value: data.university || '—' },
        { label: 'Service', value: services.find(s => s.id === data.service)?.label || '—' },
        { label: 'Project', value: data.projectTitle || '—' },
        { label: 'Deadline', value: data.deadline || '—' },
        { label: 'Group size', value: data.groupSize === 'solo' ? 'Solo student' : 'Group booking' },
      ].map(row => (
        <div key={row.label} className="flex items-start justify-between gap-4 text-xs font-sketch">
          <span className="text-ink-soft">{row.label}</span>
          <span className="text-ink text-right truncate max-w-[60%]">{row.value}</span>
        </div>
      ))}
    </div>
  </div>
)

const Success = ({ name, ticketId, navigate }: { name: string; ticketId: string | null; navigate: (path: string) => void }) => (
  <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center py-8">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-lime to-accent-limeStrong flex items-center justify-center mx-auto mb-8"
    >
      <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.6 }} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </motion.svg>
    </motion.div>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mb-3">We have got your brief, {name.split(' ')[0]}</h2>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fog-lime/30 border border-accent-lime/30 text-accent-limeStrong text-sm font-semibold mb-6">
        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-accent-limeStrong inline-block" />
        Response within 1 hour
      </div>
      {ticketId && (
        <div className="mt-4 p-4 bg-fog-lime/10 border border-accent-lime/30 rounded-organic max-w-md mx-auto">
          <p className="text-sm text-ink-soft font-sketch">Your ticket number:</p>
          <p className="text-2xl font-mono font-bold text-accent-limeStrong">{ticketId}</p>
          <p className="text-xs text-ink-faint mt-1">Keep this for reference.</p>
        </div>
      )}
      <p className="text-ink-soft text-base leading-relaxed max-w-md mx-auto mb-4 font-sketch">
        Your submission has been logged and a team member is already reviewing it. You will receive a match notification and next steps via email shortly.
      </p>
      <p className="text-ink-faint text-sm mb-10">Check your inbox at the address you provided. It may take a moment to arrive.</p>
      <div className="rounded-organic border border-accent-lime/20 bg-fog-lime/5 p-6 text-left max-w-sm mx-auto mb-8 space-y-3">
        <p className="text-[10px] font-bold tracking-widest uppercase text-ink-soft mb-4 text-center">What happens next</p>
        {[
          'Your brief is reviewed by our team',
          'A consultant is matched to your project',
          'You receive their profile for approval',
          'Your dashboard is activated',
          'You start your first session',
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }} className="flex items-center gap-3 text-sm text-ink-soft font-sketch">
            <span className="w-5 h-5 rounded-full bg-fog-lime/30 border border-accent-lime/30 text-accent-limeStrong text-xs flex items-center justify-center font-bold">{i + 1}</span>
            {item}
          </motion.div>
        ))}
      </div>
      <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 px-8 py-3 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all duration-300">
        Back to home →
      </button>
    </motion.div>
  </motion.div>
)

const CACHE_KEY = 'avital_application_cache'
const CACHE_EXPIRY_MS = 2 * 60 * 60 * 1000

export const Apply = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null)
  const [showCacheDialog, setShowCacheDialog] = useState(false)
  const [cachedForm, setCachedForm] = useState<FormData | null>(null)
  const [cachedStep, setCachedStep] = useState<number | null>(null)

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const { form: savedForm, step: savedStep, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
          setCachedForm(savedForm)
          setCachedStep(savedStep)
          setShowCacheDialog(true)
        } else localStorage.removeItem(CACHE_KEY)
      } catch {}
    }
  }, [])

  useEffect(() => {
    if (!submitted) {
      const timeout = setTimeout(() => {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ form, step, timestamp: Date.now() }))
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [form, step, submitted])

  const continueWithCached = () => {
    if (cachedForm && cachedStep !== null) { setForm(cachedForm); setStep(cachedStep) }
    setShowCacheDialog(false); setCachedForm(null); setCachedStep(null)
  }
  const startNewApplication = () => {
    localStorage.removeItem(CACHE_KEY); setShowCacheDialog(false); setCachedForm(null); setCachedStep(null)
    setForm(initialForm); setStep(0)
  }

  const update = (key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Required'
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
      if (!form.phone.trim()) e.phone = 'Required'
      if (!form.university.trim()) e.university = 'Required'
    }
    if (step === 1) {
      if (!form.service) e.service = 'Select a service'
      if (form.service === 'other' && !form.serviceOther.trim()) e.serviceOther = 'Describe your need'
      if (!form.projectTitle.trim()) e.projectTitle = 'Required'
      if (!form.projectDescription.trim()) e.projectDescription = 'Required'
    }
    setErrors(e); return Object.keys(e).length === 0
  }

  const next = () => { if (!validate()) return; setDirection(1); setStep(s => Math.min(s + 1, 3)) }
  const back = () => { setDirection(-1); setStep(s => Math.max(s - 1, 0)) }

  const submit = async () => {
    if (!validate()) return
    setIsSubmitting(true)
    const payload = {
      applicantName: form.name, applicantEmail: form.email, applicantPhone: form.phone,
      university: form.university, yearOfStudy: form.yearOfStudy,
      projectTitle: form.projectTitle, projectDescription: form.projectDescription,
      techStack: form.stack, deadline: form.deadline, urgency: form.urgency,
      blocker: form.blockers, referralSource: form.hearAboutUs,
      groupType: form.groupSize === 'solo' ? 'solo' : 'group',
    }
    try {
      const result = await createApplication(payload)
      setSubmittedTicketId(result.ticket_id)
      localStorage.removeItem(CACHE_KEY)
      setSubmitted(true)
    } catch (error: any) {
      alert(error.response?.data?.message || 'Submission failed. Please try again.')
    } finally { setIsSubmitting(false) }
  }

  const variants = { enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }) }

  return (
    <BaseLayout>
      {/* Override the centering: make the direct child take full width and start from top */}
      <div className="w-full">
        {/* Navigation bar – now inside BaseLayout and scrolls with content */}
        <div className="border-b border-accent-lime/20 px-4 py-4 flex items-center justify-between max-w-6xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-ink-soft hover:text-ink transition-colors text-sm font-sketch">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to site
          </button>
          <span className="text-accent-limeStrong text-xs font-semibold tracking-widest uppercase font-sketch">Avital — Apply</span>
          <div className="w-20" />
        </div>

        {/* Cache dialog (unchanged) */}
        {showCacheDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-fog-lime/10 border border-accent-lime/30 rounded-organic p-6 max-w-md w-full mx-4 backdrop-blur-sm">
              <h3 className="text-xl font-display font-bold text-ink mb-2">Continue previous application?</h3>
              <p className="text-ink-soft text-sm mb-6 font-sketch">You have an unfinished application from less than 2 hours ago. Would you like to continue where you left off or start a new one?</p>
              <div className="flex gap-3">
                <button onClick={continueWithCached} className="flex-1 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-semibold text-sm hover:shadow-glow transition">Continue</button>
                <button onClick={startNewApplication} className="flex-1 py-2.5 rounded-pill border border-accent-lime/30 text-ink-soft font-semibold text-sm hover:bg-fog-lime/10 transition">Start new</button>
              </div>
            </div>
          </div>
        )}

        {/* Form container – no extra centering, just a max-width container */}
        <div className="container mx-auto px-4 py-10 md:py-16 max-w-2xl">
          {submitted ? (
            <Success name={form.name} ticketId={submittedTicketId} navigate={navigate} />
          ) : (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-xs font-bold tracking-widest uppercase text-accent-limeStrong/60 font-sketch">Step {stepMeta[step].number} of {stepMeta.length}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">{stepMeta[step].title}</h1>
                <p className="text-ink-soft text-sm mt-1 font-sketch">{stepMeta[step].sub}</p>
              </motion.div>

              <Progress step={step} total={stepMeta.length} />

              <div className="relative overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                    {step === 0 && <Step1 data={form} update={update} errors={errors} />}
                    {step === 1 && <Step2 data={form} update={update} errors={errors} />}
                    {step === 2 && <Step3 data={form} update={update} />}
                    {step === 3 && <Step4 data={form} update={update} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-accent-lime/20">
                <button onClick={back} disabled={step === 0} className="flex items-center gap-2 px-5 py-2.5 rounded-pill border border-accent-lime/30 text-ink-soft text-sm font-semibold hover:border-accent-lime/60 hover:text-ink transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back
                </button>
                <span className="text-xs text-ink-faint/50">{step + 1} / {stepMeta.length}</span>
                {step < stepMeta.length - 1 ? (
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={next} className="flex items-center gap-2 px-6 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all">
                    Continue
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.button>
                ) : (
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={submit} disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Submit brief'}
                    {!isSubmitting && <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>}
                  </motion.button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  )
}