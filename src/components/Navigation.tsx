import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface MegaMenuItem {
    title: string
    description: string
    link: string
}

const megaMenuData: Record<string, MegaMenuItem[]> = {
    'Services': [
        { title: '1:1 Consultation', description: 'Personalized expert guidance', link: '#services' },
        { title: 'Code Review', description: 'Optimize your code quality', link: '#services' },
        { title: 'Architecture Design', description: 'Scalable system planning', link: '#services' },
        { title: 'Career Coaching', description: 'Interview & resume prep', link: '#services' },
    ],
    'Projects': [
        { title: 'AI & Machine Learning', description: 'Intelligent systems', link: '#projects' },
        { title: 'Web Development', description: 'Full-stack applications', link: '#projects' },
        { title: 'Mobile Apps', description: 'iOS & Android', link: '#projects' },
        { title: 'Blockchain', description: 'Web3 solutions', link: '#projects' },
    ],
    'Resources': [
        { title: 'Blog', description: 'Tech insights', link: '/blogs' },
        { title: 'Success Stories', description: 'Success stories', link: '/success-stories' },
        { title: 'Community', description: 'Join our network', link: '/community' },
        { title: 'Events', description: 'Workshops & webinars', link: '/events' },
    ],
    'FAQs': [
        { title: 'General Questions', description: 'Common questions about Avital', link: '/faqs' },
        { title: 'Pricing & Packages', description: 'Pricing plans and discounts', link: '/faqs' },
        { title: 'Technical Support', description: 'Tech stack and project help', link: '/faqs' },
        { title: 'Consultants', description: 'About our consultants', link: '/faqs' },
    ],
}
export const Navigation = () => {
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
    const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [scrolled, setScrolled] = useState(false)

    const navItems = ['Services', 'Projects', 'Resources', 'FAQs']
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleMouseEnter = (item: string) => {
        if (hoverTimeout) clearTimeout(hoverTimeout)
        setActiveMegaMenu(item)
    }

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setActiveMegaMenu(null)
        }, 200)
        setHoverTimeout(timeout)
    }

    const handleNavigation = (link: string) => {
        setIsMobileMenuOpen(false)
        setActiveMegaMenu(null)
        
        // Check if it's a route (starts with /) or a section ID (starts with #)
        if (link.startsWith('/')) {
            navigate(link)
        } else if (link.startsWith('#')) {
            const element = document.querySelector(link)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            } else {
                // If on a different page, navigate to main first then scroll
                navigate('/main')
                setTimeout(() => {
                    const el = document.querySelector(link)
                    el?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        }
    }


    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-rb-black/95 backdrop-blur-md border-b border-rb-silver/10' : 'bg-transparent'
            }`}>
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo and Brand */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => navigate('/main')}
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rb-blue to-rb-steel flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
                                <span className="text-black font-bold text-xl">A</span>
                            </div>
                            <div>
                                <span className="text-xl font-display font-bold text-white">
                                    a<span className="text-rb-blue">V</span>ital
                                </span>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <div
                                    key={item}
                                    className="relative"
                                    onMouseEnter={() => handleMouseEnter(item)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button
                                        className={`px-5 py-2 text-white/80 font-medium rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-white ${
                                            activeMegaMenu === item ? 'bg-white/10 text-white' : ''
                                        }`}
                                    >
                                        {item}
                                    </button>

                                    <AnimatePresence>
                                        {activeMegaMenu === item && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 w-[500px] rounded-xl overflow-hidden z-50"
                                                style={{
                                                    background: 'rgba(18, 20, 23, 0.95)',
                                                    backdropFilter: 'blur(12px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                                }}
                                            >
                                                <div className="grid grid-cols-2 gap-0">
                                                    {megaMenuData[item].map((menuItem) => (
                                                        <button
                                                            key={menuItem.title}
                                                            onClick={() => handleNavigation(menuItem.link)}
                                                            className="flex flex-col items-start gap-1 p-4 transition-all duration-300 text-left hover:bg-white/10 group"
                                                        >
                                                            <div className="font-semibold text-white/80 group-hover:text-rb-blue transition-colors">
                                                                {menuItem.title}
                                                            </div>
                                                            <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                                                                {menuItem.description}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Get Started Button */}
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => handleNavigation('#contact')}
                            className="hidden lg:block px-6 py-2 bg-gradient-to-r from-rb-blue to-rb-steel text-black font-semibold rounded-full hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                        >
                            Get Started →
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-white focus:outline-none relative z-50 w-8 h-8 flex items-center justify-center"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 lg:hidden"
                        style={{
                            background: 'rgba(18, 20, 23, 0.98)',
                            backdropFilter: 'blur(12px)'
                        }}
                    >
                        <div className="flex flex-col h-full pt-20 px-6 overflow-y-auto">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-4 right-4 text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
                            >
                                ×
                            </button>
                            
                            {navItems.map((item) => (
                                <div key={item} className="mb-6">
                                    <div className="text-xl font-bold text-rb-blue mb-3">{item}</div>
                                    <div className="grid gap-3">
                                        {megaMenuData[item].map((menuItem) => (
                                            <button
                                                key={menuItem.title}
                                                onClick={() => handleNavigation(menuItem.link)}
                                                className="flex flex-col items-start gap-1 p-3 rounded-lg transition-all duration-300 text-left w-full hover:bg-white/10"
                                            >
                                                <div className="font-medium text-white">{menuItem.title}</div>
                                                <div className="text-sm text-white/60">{menuItem.description}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => handleNavigation('#contact')}
                                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-rb-blue to-rb-steel text-black font-semibold rounded-full hover:shadow-glow transition-all duration-300"
                            >
                                Get Started →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}