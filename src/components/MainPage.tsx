import { BaseLayout } from './BaseLayout'
import { Navigation } from './Navigation'
import { Hero } from './Hero'
import { Services } from './Services'
import { Projects } from './Projects'
import { HowItWorks } from './HowItWorks'
import { PricingCards } from './offers'
import { Contact } from './Contact'
import { Footer } from './Footer'

export const MainPage = () => {
  return (
    <BaseLayout>
      <Navigation />
      <div className="flex flex-col w-full">   {/* ← force vertical stacking */}
        <Hero />
        <Services />
        <Projects />
        <PricingCards />
        <HowItWorks />       
        <Contact />
        <Footer />
      </div>
    </BaseLayout>
  )
}