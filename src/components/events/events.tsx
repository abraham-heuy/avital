// Events.tsx – lime/peach theme, BaseLayout, reduced spacing
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
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

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
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
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <span className="text-green-400 text-xs font-semibold font-sketch">Live Now</span>
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      {timeLeft.days > 0 && <span className="text-accent-limeStrong font-mono font-sketch">{timeLeft.days}d</span>}
      <span className="text-accent-limeStrong font-mono font-sketch">{timeLeft.hours}h</span>
      <span className="text-accent-limeStrong font-mono font-sketch">{timeLeft.minutes}m</span>
      <span className="text-accent-limeStrong font-mono font-sketch">{timeLeft.seconds}s</span>
    </div>
  )
}

export const Events = () => {
  const navigate = useNavigate()
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <BaseLayout>
      <div className="relative py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Back to Home Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/main')}
            className="mb-6 flex items-center gap-2 text-ink-soft hover:text-accent-limeStrong transition-colors text-sm font-sketch"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </motion.button>

          {/* Header – reduced spacing */}
          <motion.div
            ref={headerRef}
            className="text-center mb-8 md:mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-block px-3 py-1 rounded-full border border-accent-lime/40 bg-fog-lime text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase mb-4 font-sketch"
            >
              Upcoming Events
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight"
            >
              Learn, Build,
              <br />
              <span className="text-accent-limeStrong">Connect</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-0.5 bg-gradient-to-r from-accent-lime to-accent-limeStrong mx-auto mt-4"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-ink-soft mt-4 max-w-xl mx-auto text-sm sm:text-base font-sketch"
            >
              Workshops, hackathons, and career talks designed to help you grow.
            </motion.p>
          </motion.div>

          {/* Events Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {events.map((event, index) => (
              <Link to={`/event/${event.id}`} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="h-full rounded-organic overflow-hidden bg-fog-lime/5 backdrop-blur-sm border border-accent-lime/20 hover:border-accent-lime/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-5">
                    {/* Type Badge & Countdown */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${getEventTypeColor(event.type)} font-sketch`}>
                        {getEventTypeLabel(event.type)}
                      </span>
                      <CountdownTimer targetDate={event.date} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-display font-bold text-ink mb-2 group-hover:text-accent-limeStrong transition-colors leading-snug">
                      {event.title}
                    </h3>

                    {/* Date & Time */}
                    <div className="flex items-center gap-2 text-[11px] text-ink-faint mb-2 font-sketch">
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
                      <span>{event.time}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-[11px] text-ink-faint/70 mb-3 font-sketch">
                      <span>{event.location}</span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-ink-soft text-xs leading-relaxed line-clamp-3 font-sketch">
                      {event.excerpt}
                    </p>

                    {/* Registered Count (if capacity exists) */}
                    {event.capacity && (
                      <div className="mt-4 pt-3 border-t border-accent-lime/20">
                        <div className="flex justify-between text-[10px] font-sketch">
                          <span className="text-ink-faint">Registered</span>
                          <span className="text-accent-limeStrong">{event.registeredCount} / {event.capacity}</span>
                        </div>
                        <div className="w-full h-1 bg-accent-lime/10 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-accent-lime to-accent-limeStrong rounded-full"
                            style={{ width: `${((event.registeredCount || 0) / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}