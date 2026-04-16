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
import { FAQs } from './components/faq'
import { Login } from './pages/auth/login'
import { ForgotPassword } from './pages/auth/forgotPassword'
import { ResetPassword } from './pages/auth/resetPassword'
import { VerifyCode } from './pages/auth/verifyCode'
import { Register } from './pages/auth/registerpage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminApplications } from './pages/dashboard.admin/items/Applications.item'
import { AdminMatches } from './pages/dashboard.admin/items/Matches.item'
import { AdminOverview } from './pages/dashboard.admin/items/Overview.item'
import { AdminUsers } from './pages/dashboard.admin/items/Users.item'
import { DashboardLayout } from './pages/dashboard.admin/layout/DashboardLayout'
import { UserDetail } from './pages/dashboard.admin/items/userDetail'
import { ApplicationDetail } from './pages/dashboard.admin/items/appdetails'

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
    path: '/login',
    element: <Login />,
  },
  {
  path: '/verify',
  element: <VerifyCode />,
},
{
  path: '/forgot-password',
  element: <ForgotPassword />,
},
{
  path: '/reset-password',
  element: <ResetPassword />,
},
{
  path: '/register',
  element: <Register />,
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
    ),
  },
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

  {
    path: '/faqs',
    element: (
      <PageTransition>
        <FAQs />
      </PageTransition>
    ),
  },



  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '/dashboard/admin',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AdminOverview /> },
          { path: 'users', element: <AdminUsers /> },
          {
            path: 'users/:id',
            element: <UserDetail />,
          },
          { path: 'applications', element: <AdminApplications /> },
          {
            path: 'applications/:id',
            element: <ApplicationDetail />,
          },
          // { path: 'consultants', element: <AdminConsultants /> },
          { path: 'matches', element: <AdminMatches /> },
        ],
      },
    ],
  },
])