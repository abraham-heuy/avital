// EventPage.tsx – lime/peach theme, BaseLayout, reduced spacing
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { events } from '../../data/events'
import { useState, useEffect } from 'react'
import { BaseLayout } from '../../components/BaseLayout'

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'workshop':
      return 'border-accent-lime/40 bg-fog-lime/30 text-accent-limeStrong'
    case 'hackathon':
      return 'border-accent-peach/40 bg-fog-peach/20 text-accent-peach'
    case 'career-talk':
      return 'border-accent-lime/40 bg-fog-lime/30 text-accent-limeStrong'
    default:
      return 'border-ink-faint/30 bg-fog-gray/20 text-ink-soft'
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
    return <span className="text-green-400 text-lg font-semibold font-sketch">Event Live Now</span>
  }

  return (
    <div className="flex gap-4 justify-center">
      {timeLeft.days > 0 && (
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-accent-limeStrong font-display">{timeLeft.days}</div>
          <div className="text-xs text-ink-soft font-sketch">Days</div>
        </div>
      )}
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-accent-limeStrong font-display">{timeLeft.hours}</div>
        <div className="text-xs text-ink-soft font-sketch">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-accent-limeStrong font-display">{timeLeft.minutes}</div>
        <div className="text-xs text-ink-soft font-sketch">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-accent-limeStrong font-display">{timeLeft.seconds}</div>
        <div className="text-xs text-ink-soft font-sketch">Seconds</div>
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

  const isLive = new Date(event.date) <= new Date()

  return (
    <BaseLayout>
      <div className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/events')}
            className="mb-6 flex items-center gap-2 text-ink-soft hover:text-accent-limeStrong transition-colors text-sm font-sketch"
          >
            <span>←</span> Back to all events
          </motion.button>

          {/* Event Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${getEventTypeColor(event.type)} font-sketch`}>
                {getEventTypeLabel(event.type)}
              </span>
              {isLive && <span className="text-green-400 text-xs font-semibold font-sketch">Live Now</span>}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight mb-4">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-faint mb-6 pb-4 border-b border-accent-lime/20 font-sketch">
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
              <span>{event.time}</span>
              <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
              <span>{event.location}</span>
            </div>
          </motion.div>

          {/* Countdown Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-8 p-6 rounded-organic bg-fog-lime/5 backdrop-blur-sm border border-accent-lime/20 text-center"
          >
            <h2 className="text-[11px] font-semibold tracking-wider uppercase text-accent-limeStrong mb-4 font-sketch">
              {isLive ? 'Happening Now' : 'Time Until Event'}
            </h2>
            <CountdownTimer targetDate={event.date} />
          </motion.div>

          {/* Event Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="event-content font-sketch text-ink-soft"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />

          {/* Speakers Section */}
          {event.speakers && event.speakers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-8 p-5 rounded-organic bg-fog-lime/5 backdrop-blur-sm border border-accent-lime/20"
            >
              <h2 className="text-lg font-display font-bold text-ink mb-3">Speakers</h2>
              <div className="space-y-2">
                {event.speakers.map((speaker, idx) => (
                  <div key={idx} className="flex flex-wrap items-center justify-between py-2 border-b border-accent-lime/20 last:border-0">
                    <div>
                      <p className="font-semibold text-ink text-sm font-sketch">{speaker.name}</p>
                      <p className="text-xs text-ink-soft font-sketch">{speaker.role}</p>
                    </div>
                    {speaker.company && <span className="text-xs text-accent-limeStrong font-sketch">{speaker.company}</span>}
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
              className="mt-8 p-5 rounded-organic bg-fog-lime/5 backdrop-blur-sm border border-accent-lime/20"
            >
              <h2 className="text-lg font-display font-bold text-ink mb-3">Agenda</h2>
              <div className="space-y-2">
                {event.agenda.map((item, idx) => (
                  <div key={idx} className="flex flex-wrap gap-3 py-2 border-b border-accent-lime/20 last:border-0">
                    <span className="text-sm font-mono text-accent-limeStrong w-20 font-sketch">{item.time}</span>
                    <span className="text-ink-soft flex-1 text-sm font-sketch">{item.activity}</span>
                    {item.speaker && <span className="text-xs text-ink-faint font-sketch">{item.speaker}</span>}
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
              className="mt-8 p-5 rounded-organic bg-fog-lime/5 backdrop-blur-sm border border-accent-lime/20"
            >
              <h2 className="text-lg font-display font-bold text-ink mb-3">Requirements</h2>
              <ul className="space-y-1.5">
                {event.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-ink-soft font-sketch">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-limeStrong flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Register Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 pt-4 text-center"
          >
            <button
              onClick={() => navigate(`/event/${event.id}/register`)}
              className="px-8 py-3 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow hover:scale-105 transition-all duration-300 font-sketch"
            >
              Register for this event →
            </button>
          </motion.div>

          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-8 pt-6 border-t border-accent-lime/20 text-center"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-5 py-2 rounded-pill border border-accent-lime/40 text-accent-limeStrong font-semibold text-sm hover:bg-fog-lime/20 transition-all duration-300 font-sketch"
            >
              Back to top ↑
            </button>
          </motion.div>
        </div>
      </div>

      {/* Custom styles for event description content */}
      <style>{`
        .event-content h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #2A2A2A;
        }
        .event-content h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #2A2A2A;
        }
        .event-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .event-content a {
          color: #A6E200;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .event-content a:hover {
          color: #C7F36B;
        }
        .event-content ul,
        .event-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .event-content li {
          margin-bottom: 0.5rem;
        }
        .event-content code {
          background: rgba(199,243,107,0.15);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .event-content pre {
          background: rgba(0,0,0,0.4);
          padding: 1rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .event-content blockquote {
          border-left: 3px solid #A6E200;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6C6C6C;
        }
      `}</style>
    </BaseLayout>
  )
}