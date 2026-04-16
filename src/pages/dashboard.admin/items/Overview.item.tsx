import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.hook';
import { getDashboardStats, getAllApplications, type DashboardStats, type Application } from '../../../services/api.service';
import {
  Users, FileText, Briefcase, Handshake, Eye, UserPlus, CheckCircle, Clock, ArrowRight,
  TrendingUp, TrendingDown, Activity, Calendar, Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCardSkeleton = () => (
    <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 w-20 bg-rb-silver/20 rounded mb-2" />
          <div className="h-8 w-12 bg-rb-silver/20 rounded" />
        </div>
        <div className="h-12 w-12 bg-rb-silver/20 rounded-xl" />
      </div>
    </div>
  );
  
  const ActivitySkeleton = () => (
    <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15 animate-pulse">
      <div className="h-5 w-32 bg-rb-silver/20 rounded mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-rb-silver/20 rounded-full" />
              <div>
                <div className="h-4 w-40 bg-rb-silver/20 rounded mb-1" />
                <div className="h-3 w-24 bg-rb-silver/20 rounded" />
              </div>
            </div>
            <div className="h-5 w-16 bg-rb-silver/20 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
  
const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15 hover:border-rb-blue/30 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-rb-gray">{title}</p>
        <p className="text-3xl font-bold text-rb-silver mt-1">{value}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3 text-green-400" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-400" />
            )}
            <span className={`text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl bg-${color}/10`}>
        <Icon className={`w-6 h-6 text-${color}`} />
      </div>
    </div>
  </motion.div>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500/20 text-yellow-400';
    case 'under_review': return 'bg-blue-500/20 text-blue-400';
    case 'matched': return 'bg-green-500/20 text-green-400';
    case 'in_progress': return 'bg-purple-500/20 text-purple-400';
    case 'completed': return 'bg-emerald-500/20 text-emerald-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

export const AdminOverview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const fetchData = async () => {
      setStatsLoading(true);
      setActivityLoading(true);
      try {
        const statsData = await getDashboardStats();
        setStats(statsData);
        setStatsLoading(false);

        const appsData = await getAllApplications({ page: 1, limit: 5 });
        setRecentApplications(appsData.applications);
        setActivityLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
        setStatsLoading(false);
        setActivityLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalApps = stats?.totalApplications || 0;
  const pendingApps = stats?.pendingApplications || 0;
  const completedApps = stats?.completedApplications || 0;
  const activeMatches = stats?.activeMatches || 0;
  const totalConsultants = stats?.totalConsultants || 0;
  const totalStudents = stats?.totalStudents || 0;

  // Calculate rates
  const completionRate = totalApps > 0 ? ((completedApps / totalApps) * 100).toFixed(1) : 0;
  const pendingRate = totalApps > 0 ? ((pendingApps / totalApps) * 100).toFixed(1) : 0;
  const consultantStudentRatio = totalConsultants > 0 ? (totalStudents / totalConsultants).toFixed(1) : 0;

  // Data for line chart (status distribution)
  const chartData = [
    { name: 'Pending', value: pendingApps },
    { name: 'In Progress', value: activeMatches },
    { name: 'Completed', value: completedApps },
  ];

  const cards = [
    { title: 'Total Applications', value: totalApps, icon: FileText, color: 'rb-blue' },
    { title: 'Pending Applications', value: pendingApps, icon: Clock, color: 'rb-blue' },
    { title: 'Completed Applications', value: completedApps, icon: CheckCircle, color: 'rb-steel' },
    { title: 'Total Consultants', value: totalConsultants, icon: Briefcase, color: 'rb-steel' },
    { title: 'Total Students', value: totalStudents, icon: Users, color: 'rb-steel' },
    { title: 'Active Matches', value: activeMatches, icon: Handshake, color: 'rb-blue' },
  ];

  const quickActions = [
    { label: 'Review Applications', icon: Eye, onClick: () => navigate('/dashboard/admin/applications'), color: 'rb-blue' },
    { label: 'Assign Consultant', icon: UserPlus, onClick: () => navigate('/dashboard/admin/applications'), color: 'rb-steel' },
    { label: 'View All Applications', icon: FileText, onClick: () => navigate('/dashboard/admin/applications'), color: 'rb-blue' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-rb-blue/10 to-rb-steel/10 rounded-2xl p-6 border border-rb-silver/15">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-rb-silver">
              {getGreeting()}, {user?.fullname?.split(' ')[0] || 'Admin'} 👋
            </h1>
            <p className="text-rb-gray mt-1">Where to today? Here's what's happening with your platform.</p>
          </div>
          <div className="flex items-center gap-2 text-rb-gray text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Analytics Row (Completion Rate, Pending Rate, Consultant/Student Ratio) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-rb-gray">Completion Rate</p>
            <Award className="w-5 h-5 text-rb-blue" />
          </div>
          <p className="text-3xl font-bold text-rb-silver">{completionRate}%</p>
          <div className="mt-2 h-2 bg-rb-silver/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rb-blue to-rb-steel rounded-full" style={{ width: `${completionRate}%` }} />
          </div>
          <p className="text-xs text-rb-gray mt-2">of all applications completed</p>
        </div>
        <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-rb-gray">Pending Rate</p>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-rb-silver">{pendingRate}%</p>
          <div className="mt-2 h-2 bg-rb-silver/20 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${pendingRate}%` }} />
          </div>
          <p className="text-xs text-rb-gray mt-2">applications waiting for review</p>
        </div>
        <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-rb-gray">Consultant : Student Ratio</p>
            <Activity className="w-5 h-5 text-rb-steel" />
          </div>
          <p className="text-3xl font-bold text-rb-silver">1 : {consultantStudentRatio}</p>
          <p className="text-xs text-rb-gray mt-2">consultants per student</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsLoading
          ? Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
          : cards.map((card) => <StatCard key={card.title} {...card} />)
        }
      </div>

      {/* Two column layout for Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
          <h2 className="text-lg font-semibold text-rb-silver mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map((action, idx) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={action.onClick}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-rb-black/30 border border-rb-silver/15 hover:border-rb-blue/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <action.icon className={`w-5 h-5 text-${action.color}`} />
                  <span className="text-sm text-rb-silver group-hover:text-rb-blue transition-colors">
                    {action.label}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-rb-gray group-hover:text-rb-blue transition-colors" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
          <h2 className="text-lg font-semibold text-rb-silver mb-4">Recent Applications</h2>
          {activityLoading ? (
            <ActivitySkeleton />
          ) : recentApplications.length === 0 ? (
            <p className="text-rb-gray text-sm">No recent applications</p>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((app, idx) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-rb-black/30 border border-rb-silver/10 hover:border-rb-blue/30 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/dashboard/admin/applications?ticket=${app.ticket_id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-rb-blue/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-rb-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-rb-silver">{app.projectTitle}</p>
                      <p className="text-xs text-rb-gray">{app.applicantName} • {app.ticket_id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.applicationStatus)}`}>
                    {app.applicationStatus.replace('_', ' ')}
                  </span>
                </motion.div>
              ))}
              <button
                onClick={() => navigate('/dashboard/admin/applications')}
                className="w-full mt-2 text-center text-xs text-rb-blue hover:text-rb-silver transition-colors"
              >
                View all applications →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Line Chart (moved to bottom) */}
      <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
        <h2 className="text-lg font-semibold text-rb-silver mb-4">Application Status Distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3338" />
              <XAxis dataKey="name" stroke="#8A9198" />
              <YAxis stroke="#8A9198" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A1D24', borderColor: '#2E3338', color: '#C9CED6' }}
                itemStyle={{ color: '#C9CED6' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};






