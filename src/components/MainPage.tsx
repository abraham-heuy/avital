import { motion } from 'framer-motion'
import { Navigation } from './Navigation'
import { Hero } from './Hero'
import { Services } from './Services'
import { Projects } from './Projects'
import { HowItWorks } from './HowItWorks'
import { Contact } from './Contact'
import { Footer } from './Footer'
import { Pricing } from './offers'

export const MainPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-rb-black overflow-x-hidden w-full"
    >
      <div className="w-full overflow-x-hidden flex flex-col">
        <Navigation />
        <Hero />
        <Services />
        <Pricing />
        <Projects />
        <HowItWorks />
        <Contact />
        <Footer />
      </div>
    </motion.div>
  )
}