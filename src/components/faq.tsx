// FAQs.tsx – lime/peach theme, BaseLayout, theme fonts
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { faqCategories, type FAQItem } from '../data/faqs'
import { BaseLayout } from './BaseLayout'

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isSidebarOpen])

  return (
    <BaseLayout>
      <div className="relative py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Back to Home Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/main')}
            className="mb-8 flex items-center gap-2 text-ink-soft hover:text-accent-limeStrong transition-colors text-sm font-sketch"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </motion.button>

          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-3 py-1 rounded-full border border-accent-lime/40 bg-fog-lime text-accent-limeStrong text-[10px] font-semibold tracking-wider uppercase mb-4 font-sketch">
              Got Questions?
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              Frequently Asked
              <br />
              <span className="text-accent-limeStrong">Questions</span>
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-lime to-accent-limeStrong mx-auto mt-4" />
          </div>

          {/* Mobile Sidebar Toggle Button */}
          <div className="md:hidden mb-6">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-between w-full px-4 py-3 rounded-organic bg-fog-lime/10 border border-accent-lime/30 text-ink text-sm font-sketch"
            >
              <span className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                {faqCategories.find(c => c.id === activeCategory)?.name}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              bg-fog-lime/95 backdrop-blur-xl border-r border-accent-lime/20
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0 md:bg-transparent md:backdrop-blur-none md:border-none md:static md:h-auto md:w-64
            `} ref={sidebarRef}>
              
              {/* Sidebar Header with Close Button (Mobile only) */}
              <div className="flex items-center justify-between p-4 border-b border-accent-lime/20 md:hidden">
                <span className="text-ink font-display font-bold">Categories</span>
                <button onClick={toggleSidebar} className="text-ink-faint hover:text-ink text-2xl">
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
                      w-full flex items-center gap-3 px-4 py-3 rounded-organic text-left transition-all duration-300
                      ${activeCategory === category.id
                        ? 'bg-gradient-to-r from-fog-lime/40 to-fog-lime/10 border-l-2 border-accent-lime text-accent-limeStrong'
                        : 'text-ink-soft hover:text-ink hover:bg-fog-lime/10'
                      }
                    `}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={category.icon} />
                    </svg>
                    <span className="text-sm font-medium font-sketch">{category.name}</span>
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
                <h2 className="text-2xl font-display font-bold text-ink">{activeCategoryData?.name}</h2>
                <p className="text-ink-soft text-sm mt-1 font-sketch">
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
                    className="rounded-organic overflow-hidden border border-accent-lime/20 bg-fog-lime/5 backdrop-blur-sm"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-fog-lime/10 transition-colors duration-200"
                    >
                      <span className="font-semibold text-ink text-sm sm:text-base pr-4 font-sketch">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: openQuestions.includes(faq.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 text-accent-limeStrong"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-ink-soft text-sm leading-relaxed border-t border-accent-lime/20 font-sketch">
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
                className="mt-8 p-6 rounded-organic border border-accent-lime/30 bg-gradient-to-r from-fog-lime/10 to-fog-lime/5 text-center"
              >
                <h3 className="text-lg font-display font-bold text-ink mb-2">Still have questions?</h3>
                <p className="text-ink-soft text-sm mb-4 font-sketch">We are here to help you.</p>
                <button
                  onClick={() => navigate('/main')}
                  className="px-6 py-2 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold text-sm hover:shadow-glow transition-all duration-300 font-sketch"
                >
                  Contact Us →
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}