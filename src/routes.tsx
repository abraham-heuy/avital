import { createBrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MainPage } from './components/MainPage'
import { SplashScreen } from './components/SplashScreen'
import { Apply } from './components/apply'
import { BlogPost } from './components/blogs/[uuid]'
import { Blogs } from './components/blogs/blogs'
import { Community } from './components/community'
import { EventPage } from './components/events/[uuid]'
import { Events } from './components/events/events'
import { NotFound } from './components/NotFound'
import { EventRegister } from './components/events/eventRegister'
import { SuccessStoryPage } from './components/success/[uuid]'
import { SuccessStories } from './components/success/successStories'

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    path: '/main',
    element: (
      <PageTransition>
        <MainPage />
      </PageTransition>
    ),
  },
  {
    path: '/apply',
    element: (
      <PageTransition>
        <Apply />
      </PageTransition>
    ),
  },
  {
    path: '/blogs',
    element: (
      <PageTransition>
        <Blogs />
      </PageTransition>
    ),
  },
  {
    path: '/blog/:id',
    element: (
      <PageTransition>
        <BlogPost />
      </PageTransition>
    ),
  },
  {
    path: '/community',
    element: (
      <PageTransition>
        <Community />
      </PageTransition>
    ),
  },
  {
    path: '/events',
    element: (
      <PageTransition>
        <Events />
      </PageTransition>
    ),
  },
  {
    path: '/event/:id',
    element: (
      <PageTransition>
        <EventPage />
      </PageTransition>
    ),
  },
  {
    path: '/event/:id/register',
    element: (
      <PageTransition>
        <EventRegister />
      </PageTransition>
    ),},
  {
    path: '*',
    element: (
      <PageTransition>
        <NotFound />
      </PageTransition>
    ),
  },
  {
    path: '/success-stories',
    element: (
      <PageTransition>
        <SuccessStories />
      </PageTransition>
    ),
  },
  {
    path: '/success-story/:id',
    element: (
      <PageTransition>
        <SuccessStoryPage />
      </PageTransition>
    ),
  },

])