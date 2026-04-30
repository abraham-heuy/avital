// BlogPost.tsx – lime/peach theme, BaseLayout, reduced spacing
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../../data/blogs'
import { BaseLayout } from '../../components/BaseLayout'

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const post = blogPosts.find(p => p.id === id)

  if (!post) {
    return (
      <BaseLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-ink mb-4">Post not found</h1>
            <button
              onClick={() => navigate('/blogs')}
              className="px-6 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all font-sketch"
            >
              Back to Blogs →
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
            onClick={() => navigate('/blogs')}
            className="mb-6 flex items-center gap-2 text-ink-soft hover:text-accent-limeStrong transition-colors text-sm font-sketch"
          >
            <span>←</span> Back to all blogs
          </motion.button>

          {/* Post Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full border border-accent-lime/30 bg-fog-lime/20 text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase mb-4 font-sketch">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-ink-faint mb-6 pb-4 border-b border-accent-lime/20 font-sketch">
              <span>{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-accent-lime/40" />
              <span>{post.readTime}</span>
            </div>
          </motion.div>

          {/* Post Content - with theme styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="blog-content font-sketch text-ink-soft"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 pt-6 border-t border-accent-lime/20 text-center"
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

      {/* Custom styles for blog content (headings, lists, links, etc.) */}
      <style>{`
        .blog-content h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #2A2A2A;
        }
        .blog-content h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #2A2A2A;
        }
        .blog-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .blog-content a {
          color: #A6E200;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .blog-content a:hover {
          color: #C7F36B;
        }
        .blog-content ul,
        .blog-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content code {
          background: rgba(199,243,107,0.15);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .blog-content pre {
          background: rgba(0,0,0,0.4);
          padding: 1rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .blog-content blockquote {
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