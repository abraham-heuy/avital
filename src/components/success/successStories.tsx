// SuccessStories.tsx – lime/peach theme, BaseLayout, reduced spacing
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
import { successStories } from '../../data/successStories'
import { BaseLayout } from '../../components/BaseLayout'

export const SuccessStories = () => {
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
              Real Results
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight"
            >
              Success Stories
              <br />
              <span className="text-accent-limeStrong">from students like you</span>
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
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="h-full rounded-organic overflow-hidden bg-fog-lime/5 backdrop-blur-sm border border-accent-lime/20 hover:border-accent-lime/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-5">
                    {/* Student Name & Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-accent-limeStrong font-semibold font-sketch">{story.studentName}</span>
                      <span className="text-[10px] text-ink-faint font-sketch">
                        {new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-display font-bold text-ink mb-2 group-hover:text-accent-limeStrong transition-colors leading-snug">
                      {story.title}
                    </h3>

                    {/* Project Type */}
                    <span className="inline-block px-2 py-0.5 rounded-full border border-accent-lime/20 text-ink-soft text-[10px] mb-3 font-sketch">
                      {story.projectType}
                    </span>

                    {/* Excerpt */}
                    <p className="text-ink-soft text-xs leading-relaxed line-clamp-3 mb-4 font-sketch">
                      {story.excerpt}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {story.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-fog-lime/30 text-accent-limeStrong font-sketch">
                          {tech}
                        </span>
                      ))}
                      {story.techStack.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-fog-lime/30 text-ink-faint font-sketch">
                          +{story.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Outcome */}
                    <div className="pt-3 border-t border-accent-lime/20">
                      <p className="text-xs text-green-400 font-medium font-sketch">{story.outcome}</p>
                    </div>
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