import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

const communityFeatures = [
  {
    title: 'Student Hub',
    description: 'A dedicated space where students connect, share resources, and collaborate on projects. Join discussion channels by tech stack, university, or project type.',
    features: [
      'Tech-specific discussion channels',
      'Resource sharing library',
      'Project collaboration board',
      'University-specific groups',
      'Weekly community calls',
    ],
    cta: 'Join Student Hub',
    link: '#contact',
  },
  {
    title: 'Tech Events',
    description: 'Regular workshops, hackathons, and speaker sessions led by industry professionals and top student consultants.',
    features: [
      'Monthly hackathons with prizes',
      'Guest speaker sessions',
      'Workshop Wednesdays',
      'Code & coffee meetups',
      'Demo days for projects',
    ],
    cta: 'View Upcoming Events',
    link: '#contact',
  },
  {
    title: 'Mentorship Program',
    description: 'Get paired with an experienced mentor who guides you through your academic and career journey — from coursework to job applications.',
    features: [
      'One-on-one mentor matching',
      'Monthly progress check-ins',
      'Career path guidance',
      'Resume and portfolio reviews',
      'Mock interview preparation',
    ],
    cta: 'Apply for Mentorship',
    link: '#contact',
  },
  {
    title: 'Alumni Network',
    description: 'Connect with graduates who have successfully transitioned into tech roles. Get referrals, advice, and insider knowledge.',
    features: [
      'Alumni directory',
      'Referral program',
      'Industry insider sessions',
      'Job board access',
      'Annual alumni meetup',
    ],
    cta: 'Join Alumni Network',
    link: '#contact',
  },
]

const upcomingEvents = [
  {
    title: 'System Design Workshop',
    date: 'April 15, 2025',
    time: '3:00 PM - 5:00 PM EAT',
    type: 'Workshop',
    description: 'Learn how to design scalable systems from a senior engineer. Topics include load balancing, caching, database sharding, and microservices.',
  },
  {
    title: 'Hackathon: Build for Impact',
    date: 'April 22-24, 2025',
    time: '48-hour virtual event',
    type: 'Hackathon',
    description: 'Form teams and build solutions for real-world problems. Prizes for top 3 projects including mentorship sessions and tech gadgets.',
  },
  {
    title: 'Career Talk: Landing Your First Tech Role',
    date: 'April 28, 2025',
    time: '5:00 PM - 6:30 PM EAT',
    type: 'Career Talk',
    description: 'Panel discussion with recent graduates who landed roles at Google, Microsoft, and local startups. Learn about applications, interviews, and negotiations.',
  },
]

const communityStats = [
  { value: '500+', label: 'Active Students' },
  { value: '50+', label: 'Events Held' },
  { value: '120+', label: 'Mentorship Matches' },
  { value: '15+', label: 'Universities' },
]

export const Community = () => {
  const navigate = useNavigate()
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [eventsRef, eventsInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const scrollToContact = () => {
    navigate('/main')
    setTimeout(() => {
      const element = document.getElementById('contact')
      element?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

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
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-rb-blue/3 blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{ left: '40%', top: '50%' }}
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
            Join the Movement
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rb-silver leading-tight"
          >
            A community built
            <br />
            <span className="text-rb-blue">by students, for students</span>
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
            Connect, learn, and grow with thousands of students who are building the future of technology.
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20"
        >
          {communityStats.map((stat, _index) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-2xl bg-rb-dark/30 backdrop-blur-sm border border-rb-silver/10"
            >
              <div className="text-2xl md:text-3xl font-bold text-rb-blue">{stat.value}</div>
              <div className="text-xs text-rb-gray mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Community Features Grid */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20"
        >
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden bg-rb-dark/40 backdrop-blur-md border border-rb-silver/15 hover:border-rb-blue/40 transition-all duration-300 group"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-rb-silver mb-3 group-hover:text-rb-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-rb-gray text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-rb-gray/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rb-blue flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToContact}
                  className="w-full py-2.5 rounded-xl border border-rb-blue/40 text-rb-blue font-semibold text-sm hover:bg-rb-blue/10 transition-all duration-300"
                >
                  {feature.cta} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events Section */}
        <motion.div
          ref={eventsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={eventsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-rb-silver">
              Upcoming <span className="text-rb-blue">Events</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-rb-blue to-rb-steel mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                animate={eventsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-2xl p-6 bg-rb-dark/30 backdrop-blur-sm border border-rb-silver/15 hover:border-rb-blue/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold tracking-widest uppercase text-rb-blue">
                    {event.type}
                  </span>
                  <span className="text-xs text-rb-gray">{event.date}</span>
                </div>
                <h3 className="text-lg font-bold text-rb-silver mb-2">{event.title}</h3>
                <p className="text-xs text-rb-gray/60 mb-3">{event.time}</p>
                <p className="text-sm text-rb-gray leading-relaxed">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={eventsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 rounded-2xl border border-rb-silver/15 bg-rb-dark/30 backdrop-blur-sm p-8 md:p-12 text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-rb-silver mb-3">
            Ready to join the community?
          </h3>
          <p className="text-rb-gray text-sm sm:text-base max-w-lg mx-auto mb-7 leading-relaxed">
            Become part of a network that supports you from your first line of code to your first tech job.
          </p>
          <button
            onClick={scrollToContact}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold text-sm sm:text-base hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Join Community →
          </button>
        </motion.div>
      </div>
    </section>
  )
}