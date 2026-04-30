// EventRegister.tsx – lime/peach theme, BaseLayout, underline inputs
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { events, isHackathon } from '../../data/events'
import { BaseLayout } from '../../components/BaseLayout'

type FormData = {
    name: string
    email: string
    university: string
    yearOfStudy: string
    phone: string
    dietaryRestrictions: string
    specialRequests: string
    confirmRSVP: boolean
    // Hackathon-specific fields
    teamName?: string
    teamMembers?: string
    projectIdea?: string
    githubRepo?: string
    previousHackathonExperience?: string
}

const initialForm: FormData = {
    name: '',
    email: '',
    university: '',
    yearOfStudy: '',
    phone: '',
    dietaryRestrictions: '',
    specialRequests: '',
    confirmRSVP: false,
    teamName: '',
    teamMembers: '',
    projectIdea: '',
    githubRepo: '',
    previousHackathonExperience: '',
}

const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'PhD', 'Alumni']

const Field = ({
    label,
    error,
    required,
    children,
}: {
    label: string
    error?: string
    required?: boolean
    children: React.ReactNode
}) => (
    <div>
        <label className="block text-[11px] font-semibold tracking-wider uppercase text-ink-soft mb-1 font-sketch">
            {label} {required && <span className="text-accent-limeStrong">*</span>}
        </label>
        {children}
        {error && <p className="text-red-400 text-xs mt-1 font-sketch">{error}</p>}
    </div>
)

// Underline input (no border, only bottom border)
const inputClass = 'w-full px-0 py-2 bg-transparent border-b border-accent-lime/30 text-ink text-sm placeholder:text-ink-faint focus:border-accent-lime/80 focus:outline-none transition-all duration-200 font-sketch'

const textareaClass = 'w-full px-0 py-2 bg-transparent border-b border-accent-lime/30 text-ink text-sm placeholder:text-ink-faint focus:border-accent-lime/80 focus:outline-none transition-all duration-200 font-sketch resize-none'

// Tile button for year of study
const tileClass = (active: boolean) =>
    `text-left px-4 py-2.5 rounded-xl border transition-all duration-200 font-sketch ${
        active
            ? 'border-accent-lime/60 bg-fog-lime/20 text-accent-limeStrong'
            : 'border-accent-lime/20 bg-fog-lime/5 text-ink-soft hover:border-accent-lime/40'
    }`

const Success = ({ name, eventTitle, navigate, eventId }: { name: string; eventTitle: string; navigate: (path: string) => void; eventId: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-lime to-accent-limeStrong flex items-center justify-center mx-auto mb-8"
        >
            <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                width="36" height="36" viewBox="0 0 24 24" fill="none"
                stroke="#111" strokeWidth="2.5"
            >
                <polyline points="20 6 9 17 4 12" />
            </motion.svg>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mb-3">
                You are registered, {name.split(' ')[0]}
            </h2>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fog-lime/30 border border-accent-lime/30 text-accent-limeStrong text-sm font-semibold mb-6 font-sketch">
                <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 rounded-full bg-accent-limeStrong inline-block"
                />
                Spot Reserved
            </div>

            <p className="text-ink-soft text-base leading-relaxed max-w-md mx-auto mb-4 font-sketch">
                Your spot for <span className="text-accent-limeStrong font-semibold">{eventTitle}</span> has been reserved.
            </p>

            <p className="text-ink-faint text-sm mb-10 font-sketch">
                A confirmation email with event details and calendar link has been sent to your inbox.
            </p>

            <div className="rounded-organic border border-accent-lime/20 bg-fog-lime/5 p-6 text-left max-w-sm mx-auto mb-8 space-y-3">
                <p className="text-[10px] font-bold tracking-widest uppercase text-ink-soft mb-4 text-center font-sketch">
                    What happens next
                </p>
                {[
                    'Check your email for confirmation',
                    'Add the event to your calendar',
                    'Join the event link before start time',
                    'Prepare any questions for speakers',
                    'Invite your classmates to register',
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-center gap-3 text-sm text-ink-soft font-sketch"
                    >
                        <span className="w-5 h-5 rounded-full bg-fog-lime/30 border border-accent-lime/30 text-accent-limeStrong text-xs flex items-center justify-center font-bold">
                            {i + 1}
                        </span>
                        {item}
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={() => navigate(`/event/${eventId}`)}
                    className="px-6 py-2.5 rounded-pill border border-accent-lime/40 text-accent-limeStrong font-semibold text-sm hover:bg-fog-lime/20 transition-all font-sketch"
                >
                    Back to Event →
                </button>
                <button
                    onClick={() => navigate('/events')}
                    className="px-6 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all font-sketch"
                >
                    Explore More Events →
                </button>
            </div>
        </motion.div>
    </motion.div>
)

export const EventRegister = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const event = events.find(e => e.id === id)

    const [form, setForm] = useState<FormData>(initialForm)
    const [errors, setErrors] = useState<{
        name?: string
        email?: string
        university?: string
        confirmRSVP?: string
        teamName?: string
    }>({})
    const [submitted, setSubmitted] = useState(false)

    if (!event) {
        return (
            <BaseLayout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-display font-bold text-ink mb-4">Event not found</h1>
                        <button
                            onClick={() => navigate('/events')}
                            className="px-6 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all font-sketch"
                        >
                            Back to Events →
                        </button>
                    </div>
                </div>
            </BaseLayout>
        )
    }

    const isHackathonEvent = isHackathon(event)

    const update = (key: keyof FormData, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [key]: value }))
        setErrors((prev) => {
            const newErrors = { ...prev }
            if (key in newErrors) {
                delete newErrors[key as keyof typeof newErrors]
            }
            return newErrors
        })
    }

    const validate = (): boolean => {
        const e: {
            name?: string
            email?: string
            university?: string
            confirmRSVP?: string
            teamName?: string
        } = {}

        if (!form.name.trim()) e.name = 'Required'
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
        if (!form.university.trim()) e.university = 'Required'
        if (!form.confirmRSVP) e.confirmRSVP = 'You must confirm your RSVP'
        
        if (isHackathonEvent && !form.teamName?.trim()) {
            e.teamName = 'Team name is required'
        }

        setErrors(e)
        return Object.keys(e).length === 0
    }

    const submit = () => {
        if (!validate()) return
        console.log('Registration submitted:', form)
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <BaseLayout>
                <div className="relative z-10 container mx-auto px-4 py-10 md:py-16 max-w-2xl">
                    <Success name={form.name} eventTitle={event.title} navigate={navigate} eventId={event.id} />
                </div>
            </BaseLayout>
        )
    }

    return (
        <BaseLayout>
            {/* Back button – fixed top left */}
            <div className="fixed top-4 left-4 z-20">
                <button
                    onClick={() => navigate(`/event/${id}`)}
                    className="flex items-center gap-1 text-ink-soft hover:text-ink transition-colors text-sm font-sketch bg-fog-lime/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-accent-lime/30"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back to Event
                </button>
            </div>

            {/* Form container – centered, with reduced top padding */}
            <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center md:text-left"
                >
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
                        Register for
                    </h1>
                    <p className="text-accent-limeStrong text-xl font-semibold mt-1">{event.title}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-ink-faint mt-3 font-sketch">
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
                        <span>{event.time}</span>
                        <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
                        <span>{event.location}</span>
                    </div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-accent-lime to-accent-limeStrong mx-auto md:mx-0 mt-4" />
                    
                    {isHackathonEvent && (
                        <div className="mt-4 inline-block px-2.5 py-0.5 rounded-full border border-accent-lime/40 bg-fog-lime/20 text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase font-sketch">
                            Hackathon Registration
                        </div>
                    )}
                </motion.div>

                <div className="space-y-5">
                    <Field label="Full name" required error={errors.name}>
                        <input className={inputClass} placeholder="e.g. John Doe" value={form.name} onChange={(e) => update('name', e.target.value)} />
                    </Field>

                    <Field label="Email address" required error={errors.email}>
                        <input type="email" className={inputClass} placeholder="you@university.ac.ke" value={form.email} onChange={(e) => update('email', e.target.value)} />
                    </Field>

                    <Field label="University / Institution" required error={errors.university}>
                        <input className={inputClass} placeholder="e.g. University of Nairobi" value={form.university} onChange={(e) => update('university', e.target.value)} />
                    </Field>

                    <Field label="Year of study">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {yearOptions.map((y) => (
                                <button
                                    key={y}
                                    type="button"
                                    onClick={() => update('yearOfStudy', y)}
                                    className={tileClass(form.yearOfStudy === y)}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </Field>

                    {/* Hackathon-specific fields */}
                    {isHackathonEvent && (
                        <>
                            <Field label="Team Name" required error={errors.teamName}>
                                <input className={inputClass} placeholder="e.g. Code Warriors" value={form.teamName} onChange={(e) => update('teamName', e.target.value)} />
                            </Field>

                            <Field label="Team Members (names and emails)">
                                <textarea rows={3} className={textareaClass} placeholder="List your team members with their names and email addresses. Each member must register separately."
                                    value={form.teamMembers} onChange={(e) => update('teamMembers', e.target.value)} />
                            </Field>

                            <Field label="Project Idea (brief description)">
                                <textarea rows={3} className={textareaClass} placeholder="Describe what you plan to build during the hackathon."
                                    value={form.projectIdea} onChange={(e) => update('projectIdea', e.target.value)} />
                            </Field>

                            <Field label="GitHub Repository (optional)">
                                <input className={inputClass} placeholder="https://github.com/your-team/your-repo" value={form.githubRepo} onChange={(e) => update('githubRepo', e.target.value)} />
                            </Field>

                            <Field label="Previous Hackathon Experience">
                                <textarea rows={2} className={textareaClass} placeholder="Tell us about any hackathons you have participated in before."
                                    value={form.previousHackathonExperience} onChange={(e) => update('previousHackathonExperience', e.target.value)} />
                            </Field>
                        </>
                    )}

                    <Field label="Phone number (optional)">
                        <input type="tel" className={inputClass} placeholder="e.g. +254 700 000 000" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                    </Field>

                    <Field label="Dietary restrictions (if in-person)">
                        <input className={inputClass} placeholder="e.g. Vegetarian, Vegan, Gluten-free, None" value={form.dietaryRestrictions} onChange={(e) => update('dietaryRestrictions', e.target.value)} />
                    </Field>

                    <Field label="Special requests or accessibility needs">
                        <textarea rows={3} className={textareaClass} placeholder="e.g. Need captions, wheelchair access, etc." value={form.specialRequests} onChange={(e) => update('specialRequests', e.target.value)} />
                    </Field>

                    {/* RSVP Confirmation */}
                    <div className="rounded-organic border border-accent-lime/30 bg-fog-lime/5 p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.confirmRSVP}
                                onChange={(e) => update('confirmRSVP', e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-accent-lime/30 bg-transparent text-accent-limeStrong focus:ring-accent-lime/30 focus:ring-offset-0"
                            />
                            <div>
                                <span className="text-sm font-semibold text-ink font-sketch">
                                    I confirm my RSVP
                                </span>
                                <p className="text-xs text-ink-faint mt-0.5 font-sketch">
                                    I understand that my spot is reserved and I will attend the event. I can cancel up to 24 hours before.
                                </p>
                                {errors.confirmRSVP && <p className="text-red-400 text-xs mt-1">{errors.confirmRSVP}</p>}
                            </div>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={submit}
                        className="w-full mt-4 py-3 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all duration-300 font-sketch"
                    >
                        {isHackathonEvent ? 'Register Team for Hackathon →' : 'Reserve My Spot →'}
                    </motion.button>

                    <p className="text-center text-[10px] text-ink-faint mt-4 font-sketch">
                        By registering, you agree to our event terms and privacy policy.
                        Your spot will be confirmed via email.
                    </p>
                </div>
            </div>
        </BaseLayout>
    )
}