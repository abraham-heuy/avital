import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { successStories } from '../../data/successStories'

export const SuccessStoryPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const story = successStories.find(s => s.id === id)

  if (!story) {
    return (
      <section className="min-h-screen bg-rb-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-rb-silver mb-4">Story not found</h1>
          <button
            onClick={() => navigate('/success-stories')}
            className="px-6 py-2.5 bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold rounded-full"
          >
            Back to Success Stories →
          </button>
        </div>
      </section>
    )
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
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #c9ced6) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #c9ced6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/success-stories')}
          className="mb-8 flex items-center gap-2 text-rb-gray hover:text-rb-blue transition-colors"
        >
          <span>←</span> Back to all stories
        </motion.button>

        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-rb-blue font-semibold">{story.projectType}</span>
            <span className="text-xs text-rb-gray/50">{story.date}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-rb-silver leading-tight mb-4">
            {story.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-rb-gray/60 mb-6 pb-4 border-b border-rb-silver/10">
            <span>{story.studentName}</span>
            <span>•</span>
            <span>{story.studentUniversity}</span>
            <span>•</span>
            <span>{story.studentCourse}</span>
          </div>
        </motion.div>

        {/* Metrics Section */}
        {story.metrics && story.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-8 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {story.metrics.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-rb-dark/30 backdrop-blur-sm border border-rb-silver/15 text-center">
                <div className="text-2xl font-bold text-rb-blue">{metric.value}</div>
                <div className="text-xs text-rb-gray mt-1">{metric.label}</div>
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
          <h2 className="text-sm font-semibold tracking-widest uppercase text-rb-blue mb-3">Tech Stack Used</h2>
          <div className="flex flex-wrap gap-2">
            {story.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-lg bg-rb-dark/40 border border-rb-silver/15 text-rb-gray text-sm">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="story-content"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />

        {/* Outcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 p-6 rounded-2xl bg-rb-blue/10 border border-rb-blue/30 text-center"
        >
          <h3 className="text-lg font-bold text-rb-silver mb-2">Final Outcome</h3>
          <p className="text-rb-blue font-semibold">{story.outcome}</p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 pt-8 border-t border-rb-silver/10 text-center"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-2.5 border border-rb-blue/50 text-rb-blue font-semibold rounded-full hover:bg-rb-blue/10 transition-all duration-300"
          >
            Back to top ↑
          </button>
        </motion.div>
      </div>
    </section>
  )
}