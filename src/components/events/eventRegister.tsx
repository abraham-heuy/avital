import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { events, isHackathon } from '../../data/events'

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
        <label className="block text-xs font-semibold tracking-widest uppercase text-rb-silver/50 mb-2">
            {label} {required && <span className="text-rb-blue">*</span>}
        </label>
        {children}
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
)

const inputClass =
    'w-full px-4 py-3 rounded-xl bg-rb-black/60 border border-rb-silver/15 text-rb-silver text-sm placeholder:text-rb-gray/30 focus:border-rb-blue/50 focus:outline-none focus:ring-1 focus:ring-rb-blue/30 transition-all duration-200'

const textareaClass =
    'w-full px-4 py-3 rounded-xl bg-rb-black/60 border border-rb-silver/15 text-rb-silver text-sm placeholder:text-rb-gray/30 focus:border-rb-blue/50 focus:outline-none focus:ring-1 focus:ring-rb-blue/30 transition-all duration-200 resize-none'

const Success = ({ name, eventTitle, navigate, eventId }: { name: string; eventTitle: string; navigate: (path: string) => void; eventId: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-8"
    >
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
                You are registered, {name.split(' ')[0]}
            </h2>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6">
                <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 rounded-full bg-green-400 inline-block"
                />
                Spot Reserved
            </div>

            <p className="text-rb-gray text-base leading-relaxed max-w-md mx-auto mb-4">
                Your spot for <span className="text-rb-blue font-semibold">{eventTitle}</span> has been reserved.
            </p>

            <p className="text-rb-gray/50 text-sm mb-10">
                A confirmation email with event details and calendar link has been sent to your inbox.
            </p>

            <div className="rounded-2xl border border-rb-silver/10 bg-rb-dark/30 p-6 text-left max-w-sm mx-auto mb-8 space-y-3">
                <p className="text-xs font-bold tracking-widest uppercase text-rb-silver/40 mb-4 text-center">
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
                        className="flex items-center gap-3 text-sm text-rb-gray"
                    >
                        <span className="w-5 h-5 rounded-full bg-rb-blue/20 border border-rb-blue/30 text-rb-blue text-xs flex items-center justify-center font-bold flex-shrink-0">
                            {i + 1}
                        </span>
                        {item}
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={() => navigate(`/event/${eventId}`)}
                    className="px-6 py-2.5 rounded-full border border-rb-blue/50 text-rb-blue font-semibold text-sm hover:bg-rb-blue/10 transition-all duration-300"
                >
                    Back to Event →
                </button>
                <button
                    onClick={() => navigate('/events')}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm hover:opacity-90 hover:scale-105 transition-all duration-300"
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
            <section className="min-h-screen bg-rb-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold text-rb-silver mb-4">Event not found</h1>
                    <button
                        onClick={() => navigate('/events')}
                        className="px-6 py-2.5 bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold rounded-full"
                    >
                        Back to Events →
                    </button>
                </div>
            </section>
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

        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
        if (!form.university.trim()) e.university = 'University is required'
        if (!form.confirmRSVP) e.confirmRSVP = 'You must confirm your RSVP'
        
        // Hackathon-specific validation
        if (isHackathonEvent && !form.teamName?.trim()) {
            e.teamName = 'Team name is required for hackathon participation'
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
            <div className="min-h-screen bg-rb-black relative overflow-hidden">
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

                <div className="relative z-10 container mx-auto px-4 py-10 md:py-16 max-w-2xl">
                    <Success name={form.name} eventTitle={event.title} navigate={navigate} eventId={event.id} />
                </div>
            </div>
        )
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
                    onClick={() => navigate(`/event/${id}`)}
                    className="flex items-center gap-2 text-rb-gray hover:text-rb-silver transition-colors text-sm"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back to Event
                </button>
                <span className="text-rb-blue text-xs font-semibold tracking-widest uppercase">
                    Avital — Register
                </span>
                <div className="w-20" />
            </div>

            {/* Form container */}
            <div className="relative z-10 container mx-auto px-4 py-10 md:py-16 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-rb-silver">
                        Register for
                    </h1>
                    <p className="text-rb-blue text-xl font-semibold mt-1">{event.title}</p>
                    <div className="flex items-center gap-3 mt-3 text-sm text-rb-gray">
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                    </div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-rb-blue to-rb-steel mt-4" />
                    
                    {isHackathonEvent && (
                        <div className="mt-4 inline-block px-3 py-1 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase">
                            Hackathon Registration
                        </div>
                    )}
                </motion.div>

                {/* Form Fields */}
                <div className="space-y-5">
                    <Field label="Full name" required error={errors.name}>
                        <input
                            className={inputClass}
                            placeholder="e.g. John Doe"
                            value={form.name}
                            onChange={(e) => update('name', e.target.value)}
                        />
                    </Field>

                    <Field label="Email address" required error={errors.email}>
                        <input
                            type="email"
                            className={inputClass}
                            placeholder="you@university.ac.ke"
                            value={form.email}
                            onChange={(e) => update('email', e.target.value)}
                        />
                    </Field>

                    <Field label="University / Institution" required error={errors.university}>
                        <input
                            className={inputClass}
                            placeholder="e.g. University of Nairobi"
                            value={form.university}
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
                    ${form.yearOfStudy === y
                                            ? 'border-rb-blue/60 bg-rb-blue/15 text-rb-blue'
                                            : 'border-rb-silver/10 bg-rb-black/40 text-rb-gray hover:border-rb-silver/25'
                                        }`}
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
                                <input
                                    className={inputClass}
                                    placeholder="e.g. Code Warriors"
                                    value={form.teamName}
                                    onChange={(e) => update('teamName', e.target.value)}
                                />
                            </Field>

                            <Field label="Team Members (names and emails)">
                                <textarea
                                    rows={3}
                                    className={textareaClass}
                                    placeholder="List your team members with their names and email addresses. Each member must register separately."
                                    value={form.teamMembers}
                                    onChange={(e) => update('teamMembers', e.target.value)}
                                />
                            </Field>

                            <Field label="Project Idea (brief description)">
                                <textarea
                                    rows={3}
                                    className={textareaClass}
                                    placeholder="Describe what you plan to build during the hackathon. This helps us provide relevant resources and mentorship."
                                    value={form.projectIdea}
                                    onChange={(e) => update('projectIdea', e.target.value)}
                                />
                            </Field>

                            <Field label="GitHub Repository (optional)">
                                <input
                                    className={inputClass}
                                    placeholder="https://github.com/your-team/your-repo"
                                    value={form.githubRepo}
                                    onChange={(e) => update('githubRepo', e.target.value)}
                                />
                            </Field>

                            <Field label="Previous Hackathon Experience">
                                <textarea
                                    rows={2}
                                    className={textareaClass}
                                    placeholder="Tell us about any hackathons you have participated in before. Not required for participation."
                                    value={form.previousHackathonExperience}
                                    onChange={(e) => update('previousHackathonExperience', e.target.value)}
                                />
                            </Field>
                        </>
                    )}

                    <Field label="Phone number (optional)">
                        <input
                            type="tel"
                            className={inputClass}
                            placeholder="e.g. +254 700 000 000"
                            value={form.phone}
                            onChange={(e) => update('phone', e.target.value)}
                        />
                    </Field>

                    <Field label="Dietary restrictions (if in-person)">
                        <input
                            className={inputClass}
                            placeholder="e.g. Vegetarian, Vegan, Gluten-free, None"
                            value={form.dietaryRestrictions}
                            onChange={(e) => update('dietaryRestrictions', e.target.value)}
                        />
                    </Field>

                    <Field label="Special requests or accessibility needs">
                        <textarea
                            rows={3}
                            className={textareaClass}
                            placeholder="e.g. Need captions, wheelchair access, etc."
                            value={form.specialRequests}
                            onChange={(e) => update('specialRequests', e.target.value)}
                        />
                    </Field>

                    {/* RSVP Confirmation */}
                    <div className="rounded-2xl border border-rb-blue/30 bg-rb-blue/5 p-5">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.confirmRSVP}
                                onChange={(e) => update('confirmRSVP', e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-rb-silver/30 bg-rb-black/60 text-rb-blue focus:ring-rb-blue/30 focus:ring-offset-0"
                            />
                            <div>
                                <span className="text-sm font-semibold text-rb-silver">
                                    I confirm my RSVP
                                </span>
                                <p className="text-xs text-rb-gray/60 mt-0.5">
                                    I understand that my spot is reserved and I will attend the event. I can cancel up to 24 hours before.
                                </p>
                                {errors.confirmRSVP && (
                                    <p className="text-red-400 text-xs mt-1">{errors.confirmRSVP}</p>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={submit}
                        className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm hover:opacity-90 transition-all duration-300"
                    >
                        {isHackathonEvent ? 'Register Team for Hackathon →' : 'Reserve My Spot →'}
                    </motion.button>

                    <p className="text-center text-xs text-rb-gray/40 mt-4">
                        By registering, you agree to our event terms and privacy policy.
                        Your spot will be confirmed via email.
                    </p>
                </div>
            </div>
        </div>
    )
}