import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../../data/blogs'

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const post = blogPosts.find(p => p.id === id)

  if (!post) {
    return (
      <section className="min-h-screen bg-rb-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-rb-silver mb-4">Post not found</h1>
          <button
            onClick={() => navigate('/blogs')}
            className="px-6 py-2.5 bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold rounded-full"
          >
            Back to Blogs →
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
            backgroundImage: `linear-gradient(var(--rb-silver, #ccc) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #ccc) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/blogs')}
          className="mb-8 flex items-center gap-2 text-rb-gray hover:text-rb-blue transition-colors"
        >
          <span>←</span> Back to all blogs
        </motion.button>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-rb-silver leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-rb-gray/60 mb-8 pb-4 border-b border-rb-silver/10">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </motion.div>

        {/* Post Content - Custom styling without prose plugin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-rb-silver/10 text-center"
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