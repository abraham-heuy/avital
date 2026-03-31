import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { events } from '../../data/events'
import { useState, useEffect } from 'react'

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'workshop':
      return 'border-rb-blue/30 bg-rb-blue/10 text-rb-blue'
    case 'hackathon':
      return 'border-rb-steel/30 bg-rb-steel/10 text-rb-silver'
    case 'career-talk':
      return 'border-rb-blue/30 bg-rb-blue/10 text-rb-blue'
    default:
      return 'border-rb-silver/30 bg-rb-silver/10 text-rb-silver'
  }
}

const getEventTypeLabel = (type: string) => {
  switch (type) {
    case 'workshop':
      return 'Workshop'
    case 'hackathon':
      return 'Hackathon'
    case 'career-talk':
      return 'Career Talk'
    default:
      return 'Event'
  }
}

const CountdownTimer = ({ targetDate, onComplete }: { targetDate: string; onComplete?: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (onComplete) onComplete()
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [targetDate, onComplete])

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <span className="text-green-400 text-lg font-semibold">Event Live Now</span>
  }

  return (
    <div className="flex gap-4 justify-center">
      {timeLeft.days > 0 && (
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-rb-blue">{timeLeft.days}</div>
          <div className="text-xs text-rb-gray">Days</div>
        </div>
      )}
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-rb-blue">{timeLeft.hours}</div>
        <div className="text-xs text-rb-gray">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-rb-blue">{timeLeft.minutes}</div>
        <div className="text-xs text-rb-gray">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-rb-blue">{timeLeft.seconds}</div>
        <div className="text-xs text-rb-gray">Seconds</div>
      </div>
    </div>
  )
}

export const EventPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = events.find(e => e.id === id)

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

  const isLive = new Date(event.date) <= new Date()

  return (
    <section className="relative bg-rb-black min-h-screen py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '5%', top: '10%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ right: '5%', bottom: '10%' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #c9ced6) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #c9ced6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/events')}
          className="mb-8 flex items-center gap-2 text-rb-gray hover:text-rb-blue transition-colors"
        >
          <span>←</span> Back to all events
        </motion.button>

        {/* Event Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase ${getEventTypeColor(event.type)}`}>
              {getEventTypeLabel(event.type)}
            </span>
            {isLive && <span className="text-green-400 text-xs font-semibold">Live Now</span>}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-rb-silver leading-tight mb-4">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-rb-gray/60 mb-6 pb-4 border-b border-rb-silver/10">
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{event.time}</span>
            <span>•</span>
            <span>{event.location}</span>
          </div>
        </motion.div>

        {/* Countdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-8 p-6 rounded-2xl bg-rb-dark/30 backdrop-blur-sm border border-rb-silver/15 text-center"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-rb-blue mb-4">
            {isLive ? 'Happening Now' : 'Time Until Event'}
          </h2>
          <CountdownTimer targetDate={event.date} />
        </motion.div>

        {/* Event Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="event-content"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />

        {/* Speakers Section */}
        {event.speakers && event.speakers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8 p-6 rounded-2xl bg-rb-dark/30 backdrop-blur-sm border border-rb-silver/15"
          >
            <h2 className="text-xl font-bold text-rb-silver mb-4">Speakers</h2>
            <div className="space-y-3">
              {event.speakers.map((speaker, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-rb-silver/10 last:border-0">
                  <div>
                    <p className="font-semibold text-rb-silver">{speaker.name}</p>
                    <p className="text-sm text-rb-gray">{speaker.role}</p>
                  </div>
                  {speaker.company && <span className="text-xs text-rb-blue">{speaker.company}</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Agenda Section */}
        {event.agenda && event.agenda.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 p-6 rounded-2xl bg-rb-dark/30 backdrop-blur-sm border border-rb-silver/15"
          >
            <h2 className="text-xl font-bold text-rb-silver mb-4">Agenda</h2>
            <div className="space-y-3">
              {event.agenda.map((item, idx) => (
                <div key={idx} className="flex flex-wrap gap-4 py-2 border-b border-rb-silver/10 last:border-0">
                  <span className="text-sm font-mono text-rb-blue w-20">{item.time}</span>
                  <span className="text-rb-silver flex-1">{item.activity}</span>
                  {item.speaker && <span className="text-xs text-rb-gray">{item.speaker}</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Requirements Section */}
        {event.requirements && event.requirements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 p-6 rounded-2xl bg-rb-dark/30 backdrop-blur-sm border border-rb-silver/15"
          >
            <h2 className="text-xl font-bold text-rb-silver mb-4">Requirements</h2>
            <ul className="space-y-2">
              {event.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-rb-gray">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rb-blue flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Register Button - Navigates to registration page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 pt-4 text-center"
        >
          <button
            onClick={() => navigate(`/event/${event.id}/register`)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm sm:text-base hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Register for this event →
          </button>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8 pt-8 border-t border-rb-silver/10 text-center"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-2.5 border border-rb-blue/50 text-rb-blue font-semibold rounded-full hover:bg-rb-blue/10 transition-all duration-300"
          >
            Back to top ↑
          </button>
        </motion.div>
      </div>
    </section>
  )
}