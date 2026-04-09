import { motion } from 'framer-motion'
import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const descriptions = [
  { title: "Expert Consultation", tag: "On-demand", content: "Connect directly with student consultants who have shipped real products and navigated the same academic and technical challenges you face." },
  { title: "Final Year Project Guidance", tag: "Most popular", content: "End-to-end mentorship from topic selection to implementation and presentation prep." },
  { title: "Project Architecture Review", tag: "Deep dive", content: "Get your system design and structure reviewed before writing production code." },
  { title: "Code Optimization & Debugging", tag: "Quick turnaround", content: "Fix bugs properly and understand what went wrong." },
  { title: "Career & Interview Preparation", tag: "Career track", content: "Mock interviews and real hiring insights." },
  { title: "Group Workshops & Study Sessions", tag: "Collaborative", content: "Small cohort sessions for deep learning." },
]

export const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GSAP ScrollTrigger – only applies on desktop (lg and up)
  useEffect(() => {
    if (!sectionRef.current) return
    if (window.innerWidth < 1024) return // disable on mobile

    const total = descriptions.length

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${total * window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const index = Math.min(total - 1, Math.floor(self.progress * total))
          setCurrentIndex(index)
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Layout effect to refresh after load/resize
  useLayoutEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const timeout = setTimeout(refresh, 100)
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
    }
  }, [])

  return (
    <section id="home" className="relative bg-rb-black">
      {/* BACKGROUND */}
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

      {/* PINNED WRAPPER (only pinned on desktop) */}
      <div ref={sectionRef} className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* LEFT COLUMN – normal flow on mobile, full height only on desktop */}
            <div
              ref={headerRef}
              className="lg:w-1/2 lg:min-h-screen flex flex-col justify-center pt-16 pb-4"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mt-10"
              >
                <span className="text-rb-silver">Every kind of</span><br />
                <span className="text-rb-blue">help students actually need</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                className="hidden sm:block text-rb-gray mt-3 text-base sm:text-lg max-w-sm"
              >
                Whether you are stuck at midnight or defending a project —
                <span className="text-rb-silver font-semibold"> Avital </span>
                connects you with someone who has been exactly where you are.
              </motion.p>

              <div className="flex gap-4 mt-6 flex-wrap">
                <button onClick={scrollToContact} className="px-6 py-2.5 bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-bold rounded-full hover:scale-105 transition">
                  Get Started →
                </button>
                <button onClick={scrollToProjects} className="px-6 py-2.5 border border-rb-blue/50 text-rb-blue rounded-full hover:bg-rb-blue/10 transition">
                  View Offers →
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN – Carousel, reduced height on mobile */}
            <div className="lg:w-1/2 lg:min-h-screen flex flex-col justify-center pb-0 relative">
              <div className="relative h-[460px] sm:h-[500px] lg:h-[500px] flex items-center justify-center overflow-hidden isolate">
                {descriptions.map((item, i) => {
                  const length = descriptions.length
                  let position = i - (currentIndex % length)
                  if (position > length / 2) position -= length
                  if (position < -length / 2) position += length

                  const baseSpacing = 140 // slightly smaller on mobile, but let's keep consistent
                  const y = position * baseSpacing
                  const yAdjusted = position === 0 ? y - 10 : y
                  const scale = position === 0 ? 1 : Math.abs(position) === 1 ? 0.75 : Math.abs(position) === 2 ? 0.55 : 0.4
                  const opacity = position === 0 ? 1 : Math.abs(position) === 1 ? 0.75 : Math.abs(position) === 2 ? 0.35 : 0
                  const height = position === 0 ? (isMobile ? 320 : 300) : Math.abs(position) === 1 ? (isMobile ? 180 : 220) : (isMobile ? 140 : 160)
                  const zIndex = position === 0 ? 50 : 20 - Math.abs(position)
                  const blurAmount = isMobile
                    ? position === 0 ? 0 : Math.min(Math.abs(position) * 3, 8)
                    : position === 0 ? 0 : Math.min(Math.abs(position) * 1.5, 4)

                  return (
                    <motion.div
                      key={i}
                      animate={{ y: yAdjusted, scale, opacity, height }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        height: { duration: 0.7 },
                      }}
                      style={{ zIndex, filter: `blur(${blurAmount}px)` }}
                      className={`absolute left-0 right-0 mx-auto border overflow-hidden ${
                        position === 0
                          ? 'w-[95%] sm:w-full max-w-lg rounded-3xl bg-gradient-to-br from-rb-blue/20 to-rb-steel/10 border-rb-blue/30 shadow-2xl shadow-rb-blue/20'
                          : 'w-[90%] max-w-sm rounded-2xl bg-rb-dark/20 border-rb-silver/10'
                      }`}
                    >
                      <div className={`text-center ${position === 0 ? 'px-6 py-7' : 'px-4 py-4'}`}>
                        <span className="inline-block px-3 py-1 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold uppercase mb-2">
                          {item.tag}
                        </span>
                        <h3 className={`font-bold text-rb-silver ${position === 0 ? 'text-2xl mb-3' : 'text-base mb-1'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-rb-gray ${position === 0 ? 'text-base leading-relaxed' : 'text-xs'}`}>
                          {position === 0 ? item.content : item.content.substring(0, 60) + '...'}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}