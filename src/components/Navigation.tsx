import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/logo.png'

gsap.registerPlugin(ScrollTrigger)

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
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        ScrollTrigger.refresh()
    }, [scrolled])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            setTimeout(() => ScrollTrigger.refresh(), 50)
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    useEffect(() => {
        const handleResize = () => ScrollTrigger.refresh()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleMouseEnter = (item: string) => {
        if (hoverTimeout) clearTimeout(hoverTimeout)
        setActiveMegaMenu(item)
    }

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => setActiveMegaMenu(null), 200)
        setHoverTimeout(timeout)
    }

    const handleNavigation = (link: string) => {
        setIsMobileMenuOpen(false)
        setActiveMegaMenu(null)
        if (link.startsWith('/')) {
            navigate(link)
        } else if (link.startsWith('#')) {
            const element = document.querySelector(link)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            } else {
                navigate('/main')
                setTimeout(() => {
                    document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' })
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
                        {/* Logo only – text-like appearance, no borders */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="cursor-pointer group flex-shrink-0"
                            onClick={() => navigate('/main')}
                        >
                            <div className="w-14 h-14 flex items-center justify-center">
                                <img 
                                    src={logo} 
                                    alt="Avital Logo" 
                                    className="w-full h-full object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(167,199,231,0.6)]"
                                />
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <div key={item} className="relative" onMouseEnter={() => handleMouseEnter(item)} onMouseLeave={handleMouseLeave}>
                                    <button className={`px-5 py-2 text-white/80 font-medium rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-white ${
                                        activeMegaMenu === item ? 'bg-white/10 text-white' : ''
                                    }`}>
                                        {item}
                                    </button>
                                    {activeMegaMenu === item && (
                                        <div className="absolute top-full left-0 mt-2 w-[500px] rounded-xl overflow-hidden z-50"
                                            style={{ background: 'rgba(18,20,23,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <div className="grid grid-cols-2 gap-0">
                                                {megaMenuData[item].map((menuItem) => (
                                                    <button key={menuItem.title} onClick={() => handleNavigation(menuItem.link)}
                                                        className="flex flex-col items-start gap-1 p-4 transition-all duration-300 text-left hover:bg-white/10 group">
                                                        <div className="font-semibold text-white/80 group-hover:text-rb-blue transition-colors">{menuItem.title}</div>
                                                        <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{menuItem.description}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
                            className="lg:hidden text-white focus:outline-none relative z-50 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 h-5 flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 origin-left ${isMobileMenuOpen ? 'rotate-45 translate-x-0.5' : ''}`} />
                                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 origin-left ${isMobileMenuOpen ? '-rotate-45 translate-x-0.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(18,20,23,0.98)', backdropFilter: 'blur(12px)' }}>
                    <div className="flex flex-col h-full pt-24 px-6 pb-8 overflow-y-auto">
                        {navItems.map((item, idx) => (
                            <div key={item} className="border-b border-rb-silver/10 pb-4 opacity-0 translate-y-4 animate-fadeInUp" style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: 'forwards' }}>
                                <div className="text-lg font-bold text-rb-blue mb-3">{item}</div>
                                <div className="grid gap-2">
                                    {megaMenuData[item].map((menuItem, menuIdx) => (
                                        <button
                                            key={menuItem.title}
                                            onClick={() => handleNavigation(menuItem.link)}
                                            className="flex flex-col items-start gap-1 p-3 rounded-lg transition-all duration-300 text-left w-full hover:bg-white/10 opacity-0 translate-y-4 animate-fadeInUp"
                                            style={{ animationDelay: `${idx * 0.05 + menuIdx * 0.03}s`, animationFillMode: 'forwards' }}
                                        >
                                            <div className="font-medium text-white text-sm">{menuItem.title}</div>
                                            <div className="text-xs text-white/60">{menuItem.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => handleNavigation('#contact')}
                            className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-rb-blue to-rb-steel text-black font-semibold rounded-full hover:shadow-glow transition-all duration-300 opacity-0 translate-y-4 animate-fadeInUp"
                            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                        >
                            Get Started →
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.3s ease-out forwards;
                }
            `}</style>
        </>
    )
}