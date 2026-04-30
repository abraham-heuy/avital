// Footer.tsx – refined artistic footer, no emojis, lime/peach theme
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export const Footer = () => {
  const navigate = useNavigate()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/main')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const navigateToBlogs = () => navigate('/blogs')
  const navigateToMain = () => navigate('/main')

  return (
    <footer className="relative border-t-2 border-dotted border-accent-lime/40 overflow-hidden mt-12">
      {/* Decorative sketchy background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.svg
          className="absolute left-[-5%] top-[15%] w-40 opacity-15"
          viewBox="0 0 200 100"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        >
          <path
            d="M12,48 C48,12 68,18 96,46 C124,74 148,70 176,44"
            fill="none"
            stroke="#C7F36B"
            strokeWidth="1.2"
            strokeDasharray="2 5"
            strokeLinecap="round"
          />
        </motion.svg>
        <motion.div
          className="absolute right-[2%] bottom-[5%] w-16 h-16 rounded-full border border-accent-lime/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute left-[10%] bottom-[20%] w-24 h-px bg-gradient-to-r from-transparent via-accent-lime/20 to-transparent" />
        <div className="absolute right-[15%] top-[30%] w-32 h-px bg-gradient-to-l from-transparent via-accent-lime/20 to-transparent rotate-12" />
      </div>

      <div className="relative z-10 container mx-auto px-5 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand – artistic geometric symbol */}
          <div className="text-center sm:text-left">
            <div
              onClick={navigateToMain}
              className="inline-flex items-center gap-2 cursor-pointer group mb-4"
            >
              <div className="relative w-9 h-9">
                {/* Abstract leaf / diamond shape */}
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  className="w-full h-full drop-shadow-glow"
                >
                  <path
                    d="M20 4 L30 14 L20 36 L10 14 Z"
                    fill="#C7F36B"
                    fillOpacity="0.9"
                    stroke="#A6E200"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 8 L26 16 L20 30 L14 16 Z"
                    fill="#F8F4EC"
                    fillOpacity="0.8"
                    stroke="#A6E200"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute inset-0 rounded-lg bg-accent-lime/10 blur-md group-hover:blur-xl transition-all" />
              </div>
              <span className="font-display text-2xl font-bold text-ink tracking-tight">
                avital
              </span>
            </div>
            <p className="text-ink-soft text-sm leading-relaxed font-sketch max-w-xs mx-auto sm:mx-0">
              Student tech consultation for complex projects. Connecting ambitious students with experienced consultants.
            </p>
            <div className="flex justify-center sm:justify-start gap-4 mt-5">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                <span className="text-xs text-accent-limeStrong font-medium">50+ Consultants</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                <span className="text-xs text-accent-limeStrong font-medium">100+ Projects</span>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="text-center sm:text-left">
            <h4 className="font-display font-bold text-ink text-base mb-5 relative inline-block">
              Community
              <span className="absolute -bottom-1.5 left-0 w-7 h-px bg-accent-lime rounded-full sm:left-0 left-1/2 -translate-x-1/2 sm:translate-x-0" />
            </h4>
            <ul className="space-y-2.5 font-sketch">
              {['Student Hub', 'Tech Events', 'Mentorship Program', 'Alumni Network'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-ink-soft text-sm hover:text-accent-limeStrong transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <h4 className="font-display font-bold text-ink text-base mb-5 relative inline-block">
              Resources
              <span className="absolute -bottom-1.5 left-0 w-7 h-px bg-accent-lime rounded-full" />
            </h4>
            <ul className="space-y-2.5 font-sketch">
              <li><button onClick={navigateToBlogs} className="text-ink-soft text-sm hover:text-accent-limeStrong">Blog</button></li>
              <li><button onClick={() => scrollToSection('work')} className="text-ink-soft text-sm hover:text-accent-limeStrong">Case Studies</button></li>
              <li><button onClick={() => scrollToSection('work')} className="text-ink-soft text-sm hover:text-accent-limeStrong">Tech Guides</button></li>
              <li><button onClick={() => scrollToSection('work')} className="text-ink-soft text-sm hover:text-accent-limeStrong">Success Stories</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-display font-bold text-ink text-base mb-5 relative inline-block">
              Contact
              <span className="absolute -bottom-1.5 left-0 w-7 h-px bg-accent-lime rounded-full" />
            </h4>
            <ul className="space-y-3 font-sketch">
              <li>
                <a href="mailto:hello@avital.com" className="text-ink-soft text-sm hover:text-accent-limeStrong transition-colors">
                  avital@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+254700000000" className="text-ink-soft text-sm hover:text-accent-limeStrong transition-colors">
                  +254 753815473
                </a>
              </li>
              <li className="pt-2">
                <div className="flex justify-center sm:justify-start gap-5">
                  {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-ink-soft hover:text-accent-limeStrong transition-colors text-sm font-sketch"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar – fully dotted separator */}
        <div className="relative mt-12 pt-6">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-lime/30 to-transparent" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-ink-faint text-xs font-sketch tracking-wide">
              © 2026 Avital. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <button
                  key={link}
                  className="text-ink-faint text-xs hover:text-accent-limeStrong transition-colors font-sketch"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle geometric stamp – no emoji, just a small square */}
        <div className="absolute bottom-3 right-3 opacity-25 pointer-events-none">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="2" width="24" height="24" stroke="#A6E200" strokeWidth="1" strokeDasharray="1 3" />
            <path d="M8 14 L20 14 M14 8 L14 20" stroke="#A6E200" strokeWidth="0.8" strokeDasharray="1 2" />
          </svg>
        </div>
      </div>
    </footer>
  )
}