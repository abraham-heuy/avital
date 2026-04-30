// Blogs.tsx – lime/peach theme, BaseLayout, reduced top spacing
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link, useNavigate } from 'react-router-dom'
import { blogPosts } from '../../data/blogs'
import { BaseLayout } from '../../components/BaseLayout'

export const Blogs = () => {
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
              Our Blog
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight"
            >
              Insights & Stories
              <br />
              <span className="text-accent-limeStrong">for student builders</span>
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
              Practical guides, technical deep-dives, and real experiences from students and consultants.
            </motion.p>
          </motion.div>

          {/* Blog Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
          >
            {blogPosts.map((post, index) => (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="h-full rounded-organic overflow-hidden bg-fog-lime/5 backdrop-blur-sm border border-accent-lime/20 hover:border-accent-lime/50 transition-all duration-300 cursor-pointer group"
                >
                  {/* Category Tag */}
                  <div className="p-5 pb-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full border border-accent-lime/30 bg-fog-lime/20 text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase font-sketch">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3">
                    <h3 className="text-xl font-display font-bold text-ink group-hover:text-accent-limeStrong transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-ink-soft text-sm leading-relaxed line-clamp-3 font-sketch">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-2 text-[11px] text-ink-faint pt-3 border-t border-accent-lime/20 mt-2 font-sketch">
                      <span>{post.author}</span>
                      <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
