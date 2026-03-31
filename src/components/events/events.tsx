import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
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
    return <span className="text-green-400 text-xs font-semibold">Live Now</span>
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      {timeLeft.days > 0 && <span className="text-rb-blue font-mono">{timeLeft.days}d</span>}
      <span className="text-rb-blue font-mono">{timeLeft.hours}h</span>
      <span className="text-rb-blue font-mono">{timeLeft.minutes}m</span>
      <span className="text-rb-blue font-mono">{timeLeft.seconds}s</span>
    </div>
  )
}

export const Events = () => {
  const navigate = useNavigate()
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 })

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

      <div className="relative z-10 container mx-auto px-4">
        {/* Back to Home Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/main')}
          className="mb-8 flex items-center gap-2 text-rb-gray hover:text-rb-blue transition-colors text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-6"
          >
            Upcoming Events
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rb-silver leading-tight"
          >
            Learn, Build,
            <br />
            <span className="text-rb-blue">Connect</span>
          </motion.h1>

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
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="h-full rounded-2xl overflow-hidden bg-rb-dark/40 backdrop-blur-md border border-rb-silver/15 hover:border-rb-blue/40 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-6">
                  {/* Type Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase ${getEventTypeColor(event.type)}`}>
                      {getEventTypeLabel(event.type)}
                    </span>
                    <CountdownTimer targetDate={event.date} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-rb-silver mb-2 group-hover:text-rb-blue transition-colors leading-snug">
                    {event.title}
                  </h3>

                  {/* Date & Time */}
                  <div className="flex items-center gap-3 text-xs text-rb-gray/60 mb-3">
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs text-rb-gray/50 mb-3">
                    <span>{event.location}</span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-rb-gray text-sm leading-relaxed line-clamp-3">
                    {event.excerpt}
                  </p>

                  {/* Registered Count */}
                  {event.capacity && (
                    <div className="mt-4 pt-3 border-t border-rb-silver/10">
                      <div className="flex justify-between text-xs">
                        <span className="text-rb-gray/50">Registered</span>
                        <span className="text-rb-blue">{event.registeredCount} / {event.capacity}</span>
                      </div>
                      <div className="w-full h-1 bg-rb-silver/10 rounded-full mt-1 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-rb-blue to-rb-steel rounded-full"
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
    </section>
  )
}