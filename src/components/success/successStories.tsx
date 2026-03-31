import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
import { successStories } from '../../data/successStories'

export const SuccessStories = () => {
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
            Real Results
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rb-silver leading-tight"
          >
            Success Stories
            <br />
            <span className="text-rb-blue">from students like you</span>
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
            Real students, real projects, real outcomes. See how Avital helped them succeed.
          </motion.p>
        </motion.div>

        {/* Stories Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {successStories.map((story, index) => (
            <Link to={`/success-story/${story.id}`} key={story.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="h-full rounded-2xl overflow-hidden bg-rb-dark/40 backdrop-blur-md border border-rb-silver/15 hover:border-rb-blue/40 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-6">
                  {/* Student Name & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-rb-blue font-semibold">{story.studentName}</span>
                    <span className="text-xs text-rb-gray/50">
                      {new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-rb-silver mb-2 group-hover:text-rb-blue transition-colors leading-snug">
                    {story.title}
                  </h3>

                  {/* Project Type */}
                  <span className="inline-block px-2 py-0.5 rounded-full border border-rb-silver/20 text-rb-gray/60 text-xs mb-3">
                    {story.projectType}
                  </span>

                  {/* Excerpt */}
                  <p className="text-rb-gray text-sm leading-relaxed line-clamp-3 mb-4">
                    {story.excerpt}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {story.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-rb-black/50 text-rb-blue">
                        {tech}
                      </span>
                    ))}
                    {story.techStack.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-rb-black/50 text-rb-gray">
                        +{story.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Outcome */}
                  <div className="pt-3 border-t border-rb-silver/10">
                    <p className="text-xs text-green-400 font-medium">{story.outcome}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}