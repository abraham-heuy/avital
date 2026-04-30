// SuccessStoryPage.tsx – lime/peach theme, BaseLayout, reduced spacing
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { successStories } from '../../data/successStories'
import { BaseLayout } from '../../components/BaseLayout'

export const SuccessStoryPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const story = successStories.find(s => s.id === id)

  if (!story) {
    return (
      <BaseLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-ink mb-4">Story not found</h1>
            <button
              onClick={() => navigate('/success-stories')}
              className="px-6 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all font-sketch"
            >
              Back to Success Stories →
            </button>
          </div>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/success-stories')}
            className="mb-6 flex items-center gap-2 text-ink-soft hover:text-accent-limeStrong transition-colors text-sm font-sketch"
          >
            <span>←</span> Back to all stories
          </motion.button>

          {/* Story Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] text-accent-limeStrong font-semibold font-sketch">{story.projectType}</span>
              <span className="text-[11px] text-ink-faint">•</span>
              <span className="text-[11px] text-ink-faint font-sketch">{story.date}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight mb-4">
              {story.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-faint mb-6 pb-4 border-b border-accent-lime/20 font-sketch">
              <span>{story.studentName}</span>
              <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
              <span>{story.studentUniversity}</span>
              <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
              <span>{story.studentCourse}</span>
            </div>
          </motion.div>

          {/* Metrics Section (if any) */}
          {story.metrics && story.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-8 grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {story.metrics.map((metric, idx) => (
                <div key={idx} className="p-4 rounded-organic bg-fog-lime/5 backdrop-blur-sm border border-accent-lime/20 text-center">
                  <div className="text-2xl font-bold text-accent-limeStrong font-display">{metric.value}</div>
                  <div className="text-[10px] text-ink-soft mt-1 font-sketch">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-[11px] font-semibold tracking-wider uppercase text-accent-limeStrong mb-3 font-sketch">Tech Stack Used</h2>
            <div className="flex flex-wrap gap-2">
              {story.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-fog-lime/10 border border-accent-lime/20 text-ink-soft text-xs font-sketch">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="story-content font-sketch text-ink-soft"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          {/* Outcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 p-5 rounded-organic bg-fog-lime/10 border border-accent-lime/30 text-center"
          >
            <h3 className="text-base font-display font-bold text-ink mb-2">Final Outcome</h3>
            <p className="text-accent-limeStrong font-semibold text-sm font-sketch">{story.outcome}</p>
          </motion.div>

          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
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

      {/* Custom styles for story rich content */}
      <style>{`
        .story-content h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #2A2A2A;
        }
        .story-content h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #2A2A2A;
        }
        .story-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .story-content a {
          color: #A6E200;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .story-content a:hover {
          color: #C7F36B;
        }
        .story-content ul,
        .story-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .story-content li {
          margin-bottom: 0.5rem;
        }
        .story-content code {
          background: rgba(199,243,107,0.15);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .story-content pre {
          background: rgba(0,0,0,0.4);
          padding: 1rem;
          border-radius: 12px;
          overflow-x: auto;
        }
        .story-content blockquote {
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