import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllApplications, type Application } from '../../../services/api.service';
import { Search, Filter, ChevronDown, FileText, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

// Skeleton loader for table rows
const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3"><div className="h-4 w-24 bg-rb-silver/20 rounded" /></td>
    <td className="px-4 py-3"><div className="h-4 w-32 bg-rb-silver/20 rounded" /></td>
    <td className="px-4 py-3"><div className="h-4 w-20 bg-rb-silver/20 rounded" /></td>
    <td className="px-4 py-3"><div className="h-4 w-20 bg-rb-silver/20 rounded" /></td>
    <td className="px-4 py-3"><div className="h-4 w-24 bg-rb-silver/20 rounded" /></td>
   </tr>
);

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  under_review: 'bg-blue-500/20 text-blue-400',
  matched: 'bg-green-500/20 text-green-400',
  in_progress: 'bg-purple-500/20 text-purple-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const paymentColors: Record<string, string> = {
  unpaid: 'bg-red-500/20 text-red-400',
  paid: 'bg-green-500/20 text-green-400',
  refunded: 'bg-gray-500/20 text-gray-400',
};

export const AdminApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, paid: 0, unpaid: 0 });
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const data = await getAllApplications();
        setApplications(data.applications);
        // Compute stats
        const total = data.applications.length;
        const pending = data.applications.filter(a => a.applicationStatus === 'pending' || a.applicationStatus === 'under_review').length;
        const completed = data.applications.filter(a => a.applicationStatus === 'completed').length;
        const paid = data.applications.filter(a => a.paymentStatus === 'paid').length;
        const unpaid = data.applications.filter(a => a.paymentStatus === 'unpaid').length;
        setStats({ total, pending, completed, paid, unpaid });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.applicationStatus === statusFilter;
    const matchesPayment = paymentFilter === 'all' || app.paymentStatus === paymentFilter;
    const matchesSearch = searchQuery === '' ||
      app.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.ticket_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPayment && matchesSearch;
  });

  const statCards = [
    { title: 'Total Applications', value: stats.total, icon: FileText, color: 'rb-blue' },
    { title: 'Pending Review', value: stats.pending, icon: Clock, color: 'yellow-400' },
    { title: 'Completed', value: stats.completed, icon: CheckCircle, color: 'emerald-400' },
    { title: 'Paid', value: stats.paid, icon: DollarSign, color: 'green-400' },
    { title: 'Unpaid', value: stats.unpaid, icon: XCircle, color: 'red-400' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-rb-silver">Applications</h1>
        <p className="text-rb-gray text-sm mt-1">Manage and review student help requests.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, _idx) => (
          <div key={card.title} className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-rb-gray">{card.title}</p>
                <p className="text-2xl font-bold text-rb-silver">{card.value}</p>
              </div>
              <card.icon className={`w-8 h-8 text-${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray" />
              <input
                type="text"
                placeholder="Ticket, project or applicant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-xl text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
              />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Status</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-xl text-rb-silver text-sm appearance-none focus:border-rb-blue focus:outline-none"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="matched">Matched</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray pointer-events-none" />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Payment</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray" />
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-xl text-rb-silver text-sm appearance-none focus:border-rb-blue focus:outline-none"
              >
                <option value="all">All</option>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl border border-rb-silver/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-rb-black/50 border-b border-rb-silver/15">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Ticket</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Applicant</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Payment</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-rb-gray">No applications found</td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => navigate(`/dashboard/admin/applications/${app.id}`)}
                    className="border-b border-rb-silver/10 hover:bg-rb-blue/5 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-sm font-mono text-rb-silver">{app.ticket_id}</td>
                    <td className="px-4 py-3 text-sm text-rb-silver">{app.projectTitle}</td>
                    <td className="px-4 py-3 text-sm text-rb-gray">{app.applicantName}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[app.applicationStatus] || 'bg-gray-500/20 text-gray-400'}`}>
                        {app.applicationStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${paymentColors[app.paymentStatus] || 'bg-gray-500/20 text-gray-400'}`}>
                        {app.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-rb-gray">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};