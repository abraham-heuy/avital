import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const rightCol = rightColRef.current
    if (!rightCol) return

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return

      const { scrollTop, scrollHeight, clientHeight } = rightCol
      const atTop = scrollTop === 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1

      if (atTop && e.deltaY < 0) return
      if (atBottom && e.deltaY > 0) return

      e.preventDefault()
      rightCol.scrollTop += e.deltaY
    }

    rightCol.addEventListener('wheel', handleWheel, { passive: false })
    return () => rightCol.removeEventListener('wheel', handleWheel)
  }, [])

  const descriptions = [
    {
      title: "Expert Consultation",
      tag: "On-demand",
      content: "Connect directly with student consultants who have shipped real products and navigated the same academic and technical challenges you face.",
    },
    {
      title: "Final Year Project Guidance",
      tag: "Most popular",
      content: "End-to-end mentorship from topic selection to implementation and presentation prep.",
    },
    {
      title: "Project Architecture Review",
      tag: "Deep dive",
      content: "Get your system design and structure reviewed before writing production code.",
    },
    {
      title: "Code Optimization & Debugging",
      tag: "Quick turnaround",
      content: "Fix bugs properly and understand what went wrong.",
    },
    {
      title: "Career & Interview Preparation",
      tag: "Career track",
      content: "Mock interviews and real hiring insights.",
    },
    {
      title: "Group Workshops & Study Sessions",
      tag: "Collaborative",
      content: "Small cohort sessions for deep learning.",
    },
  ]

  return (
    <section id="home" ref={sectionRef} className="relative bg-rb-black overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ left: '5%', top: '15%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ right: '5%', bottom: '10%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT */}
          <div
            ref={headerRef}
            className="lg:w-1/2 lg:sticky lg:top-24 lg:h-screen flex flex-col justify-center pt-28 pb-8"
          >

            {/* HEADLINE */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mt-6"
            >
              <span className="text-rb-silver">Every kind of</span>
              <br />

              {/* HELP — HAND-DRAWN CIRCLE */}
              <span className="relative inline-block">
                <span className="text-rb-silver italic relative z-10">help</span>

                <motion.svg
                  className="absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] pointer-events-none"
                  viewBox="0 0 200 100"
                  initial={{ opacity: 0 }}
                  animate={headerInView ? { opacity: 1 } : {}}
                >
                  <motion.path
                    d="M20,50 C20,10 180,10 180,50 C180,90 20,90 20,50 Z"
                    fill="none"
                    stroke="#A7C7E7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(167,199,231,0.4))' }}
                    initial={{ pathLength: 0 }}
                    animate={headerInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
                  />
                </motion.svg>
              </span>

              <br />
              <span className="text-rb-silver">students</span>
              <br />
              <span className="text-rb-blue">actually need</span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="w-24 h-0.5 bg-gradient-to-r from-rb-blue to-rb-steel mt-6 origin-left"
            />

            {/* SUBTEXT */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-rb-gray mt-5 text-base sm:text-lg leading-relaxed max-w-sm"
            >
              Whether you are stuck at midnight or defending a project —{' '}

              {/* AVITAL — SIGNATURE CIRCLE */}
              <span className="relative inline-block">
                <span className="text-rb-silver font-semibold relative z-10">
                  Avital
                </span>

                <motion.svg
                  className="absolute -inset-2 w-[calc(100%+1.2rem)] h-[calc(100%+1.2rem)] pointer-events-none"
                  viewBox="0 0 200 100"
                  initial={{ opacity: 0 }}
                  animate={headerInView ? { opacity: 1 } : {}}
                >
                  <motion.path
                    d="M25,50 Q25,15 100,10 Q175,15 175,50 Q175,85 100,90 Q25,85 25,50 Z"
                    fill="none"
                    stroke="#A7C7E7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={headerInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }}
                  />
                </motion.svg>
              </span>

              {' '}connects you with someone who has been exactly where you are.
            </motion.p>

            {/* CTA */}
            <motion.div className="flex gap-4 mt-8">
              <button
                onClick={scrollToContact}
                className="px-6 py-2.5 bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold rounded-full hover:scale-105 transition"
              >
                Get Started →
              </button>
              <button
                onClick={scrollToProjects}
                className="px-6 py-2.5 border border-rb-blue/50 text-rb-blue rounded-full hover:bg-rb-blue/10 transition"
              >
                View Offers →
              </button>
            </motion.div>

          </div>

          {/* RIGHT */}
          <div
            ref={rightColRef}
            className="lg:w-1/2 lg:h-screen lg:overflow-y-auto pt-0 lg:pt-28 pb-20"
          >
            <div className="space-y-5">
              {descriptions.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="p-6 rounded-2xl bg-rb-dark/40 border border-rb-silver/15"
                >
                  <h3 className="text-lg font-bold text-rb-silver">{item.title}</h3>
                  <p className="text-rb-gray text-sm mt-2">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}