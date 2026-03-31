import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { faqCategories, type FAQItem } from '../data/faqs'

export const FAQs = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id)
  const [openQuestions, setOpenQuestions] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const activeCategoryData = faqCategories.find(c => c.id === activeCategory)

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

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
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-rb-blue/30 bg-rb-blue/10 text-rb-blue text-xs font-semibold tracking-widest uppercase mb-4">
            Got Questions?
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-rb-silver">
            Frequently Asked
            <br />
            <span className="text-rb-blue">Questions</span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-rb-blue to-rb-steel mx-auto mt-4" />
        </div>

        {/* Mobile Sidebar Toggle Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-rb-dark/50 border border-rb-silver/15 text-rb-silver text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            {faqCategories.find(c => c.id === activeCategory)?.name}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar - Desktop always visible, Mobile as slide-out */}
          <div className={`
            md:relative md:block md:w-64 md:flex-shrink-0
            fixed top-0 left-0 z-50 h-full w-80
            transform transition-transform duration-300 ease-in-out
            bg-rb-black/95 backdrop-blur-xl border-r border-rb-silver/10
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:bg-transparent md:backdrop-blur-none md:border-none md:static md:h-auto md:w-64
          `} ref={sidebarRef}>
            
            {/* Sidebar Header with Close Button (Mobile only) */}
            <div className="flex items-center justify-between p-4 border-b border-rb-silver/10 md:hidden">
              <span className="text-rb-silver font-bold">Categories</span>
              <button onClick={toggleSidebar} className="text-rb-gray hover:text-rb-silver text-2xl">
                ×
              </button>
            </div>

            {/* Category List */}
            <div className="p-4 space-y-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setIsSidebarOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300
                    ${activeCategory === category.id
                      ? 'bg-gradient-to-r from-rb-blue/20 to-rb-steel/10 border-l-2 border-rb-blue text-rb-blue'
                      : 'text-rb-gray hover:text-rb-silver hover:bg-rb-dark/30'
                    }
                  `}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={category.icon} />
                  </svg>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* FAQ Content Area */}
          <div className="flex-1">
            {/* Category Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-rb-silver">{activeCategoryData?.name}</h2>
              <p className="text-rb-gray text-sm mt-1">
                {activeCategoryData?.questions.length} questions
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              {activeCategoryData?.questions.map((faq: FAQItem, index: number) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl overflow-hidden border border-rb-silver/15 bg-rb-dark/30 backdrop-blur-sm"
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-rb-dark/50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-rb-silver text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openQuestions.includes(faq.id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 text-rb-blue"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openQuestions.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-rb-gray text-sm leading-relaxed border-t border-rb-silver/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Still have questions CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-rb-blue/10 to-rb-steel/10 border border-rb-silver/15 text-center"
            >
              <h3 className="text-lg font-bold text-rb-silver mb-2">Still have questions?</h3>
              <p className="text-rb-gray text-sm mb-4">We are here to help you.</p>
              <button
                onClick={() => navigate('/main')}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold text-sm hover:opacity-90 transition-all duration-300"
              >
                Contact Us →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}