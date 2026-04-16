import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.hook';
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Handshake,
  LogOut,
  Menu,
  X,
  Bell,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/admin/users', label: 'Users', icon: Users },
  { to: '/dashboard/admin/applications', label: 'Applications', icon: FileText },
  { to: '/dashboard/admin/consultants', label: 'Consultants', icon: Briefcase },
  { to: '/dashboard/admin/matches', label: 'Matches', icon: Handshake },
];

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get user initials
  const initials = user?.fullname
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <div className="relative flex h-screen overflow-hidden bg-rb-black">
      {/* Background – same as other pages (no particles) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-rb-black via-rb-dark to-rb-black" />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-rb-blue/5 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ left: '5%', top: '15%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-rb-steel/5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ right: '5%', bottom: '10%' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--rb-silver, #ccc) 1px, transparent 1px),
                              linear-gradient(90deg, var(--rb-silver, #ccc) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Mobile Header (only visible on mobile, triggers sidebar) – kept for reference but will be replaced by unified top bar */}
      {/* We'll use a unified top bar for all screen sizes */}

      {/* Unified Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-20 h-14 bg-rb-black/50 backdrop-blur-md border-b border-rb-silver/10 flex items-center justify-between px-4 lg:px-6">
        {/* Left section: menu button + title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-rb-silver" />
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <div className="text-xl font-display font-bold text-rb-silver">
              a<span className="text-rb-blue">V</span>ital
            </div>
            <div className="h-6 w-px bg-rb-silver/20 mx-2" />
            <span className="text-sm text-rb-gray">Admin Dashboard</span>
          </div>
          <span className="lg:hidden text-sm font-semibold text-rb-silver">Admin Dashboard</span>
        </div>

        {/* Right section: notifications + user */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-rb-silver" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rb-blue rounded-full animate-pulse" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-rb-blue/20 flex items-center justify-center text-xs font-medium text-rb-blue">
                {initials}
              </div>
              <span className="hidden md:inline text-sm text-rb-silver">{user?.fullname?.split(' ')[0]}</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-rb-black/90 backdrop-blur-md border border-rb-silver/10 rounded-xl shadow-lg py-1 z-30">
                <div className="px-4 py-2 border-b border-rb-silver/10">
                  <p className="text-xs text-rb-gray">{user?.fullname}</p>
                  <p className="text-xs text-rb-gray/60">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/dashboard/admin/profile');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-rb-gray hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <User size={14} />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-rb-black/80 backdrop-blur-md flex flex-col h-full
          border-r border-rb-silver/10
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:transition-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo (desktop) */}
        <div className="hidden lg:flex h-14 items-center gap-3 px-5 border-b border-rb-silver/10 mt-14">
          <div className="text-xl font-display font-bold text-rb-silver">
            a<span className="text-rb-blue">V</span>ital
          </div>
        </div>

        {/* Mobile close button */}
        <div className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-rb-silver/10">
          <span className="font-semibold text-rb-silver text-sm">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-rb-silver" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-rb-blue/20 text-rb-blue'
                    : 'text-rb-gray hover:bg-white/5 hover:text-rb-silver'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout (optional, already in top bar) – we can keep or remove. Keeping for convenience */}
        <div className="border-t border-rb-silver/10 p-3 lg:hidden">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-rb-blue/20 flex items-center justify-center text-xs font-medium text-rb-blue shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-rb-silver truncate">{user?.fullname}</p>
              <p className="text-xs text-rb-gray truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-rb-gray hover:bg-white/5 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content – add top padding to account for fixed top bar */}
      <main className="flex-1 overflow-y-auto relative z-10 pt-14">
        <Outlet />
      </main>
    </div>
  );
};