import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export const Footer = () => {
  const navigate = useNavigate()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/main')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const navigateToBlogs = () => {
    navigate('/blogs')
  }

  const navigateToMain = () => {
    navigate('/main')
  }

  return (
    <footer className="relative bg-rb-black border-t border-rb-silver/10 overflow-hidden">
      {/* Background - matching other components (grid overlay + blobs) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '5%', bottom: '0%' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ right: '10%', top: '10%' }}
        />
        <motion.div
          className="absolute w-[250px] h-[250px] rounded-full bg-rb-blue/3 blur-2xl"
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{ left: '40%', top: '50%' }}
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

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Grid - Mobile first */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="text-center sm:text-left -translate-y-11">
  <div 
    onClick={navigateToMain}
    className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer group"
  >
    <img 
      src={logo} 
      alt="Avital Logo" 
      className="w-24 h-24 rounded-lg object-cover group-hover:shadow-glow transition-all duration-300"
    />
  </div>
  <p className="text-rb-gray text-sm leading-relaxed mt-2">
    Student tech consultation for complex projects. Connecting ambitious students with experienced consultants.
  </p>
  <div className="flex justify-center sm:justify-start gap-4 mt-4">
    <span className="text-xs text-rb-blue font-medium">50+ Consultants</span>
    <span className="text-xs text-rb-gray">•</span>
    <span className="text-xs text-rb-blue font-medium">100+ Projects</span>
  </div>
</div>

          {/* Community Column */}
          <div className="text-center sm:text-left">
            <h4 className="text-rb-silver font-semibold text-base mb-4">Community</h4>
            <ul className="space-y-2">
              {['Student Hub', 'Tech Events', 'Mentorship Program', 'Alumni Network'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-rb-gray text-sm hover:text-rb-blue transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Resources Column */}
          <div className="text-center sm:text-left">
            <h4 className="text-rb-silver font-semibold text-base mb-4">Blog & Resources</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={navigateToBlogs}
                  className="text-rb-gray text-sm hover:text-rb-blue transition-colors duration-200"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('work')}
                  className="text-rb-gray text-sm hover:text-rb-blue transition-colors duration-200"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('work')}
                  className="text-rb-gray text-sm hover:text-rb-blue transition-colors duration-200"
                >
                  Tech Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('work')}
                  className="text-rb-gray text-sm hover:text-rb-blue transition-colors duration-200"
                >
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="text-center sm:text-left">
            <h4 className="text-rb-silver font-semibold text-base mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@avital.com" className="text-rb-gray text-sm hover:text-rb-blue transition-colors duration-200">
                  avital@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+254700000000" className="text-rb-gray text-sm hover:text-rb-blue transition-colors duration-200">
                  +254 753815473
                </a>
              </li>
              <li className="pt-2">
                <div className="flex justify-center sm:justify-start gap-4">
                  {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-rb-gray hover:text-rb-blue transition-colors duration-200 text-sm"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-rb-silver/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-rb-gray/50 text-xs">
            © 2026 Avital. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <button
                key={link}
                className="text-rb-gray/50 text-xs hover:text-rb-blue transition-colors duration-200"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}