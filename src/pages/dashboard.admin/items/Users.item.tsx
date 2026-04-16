import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getConsultants, register } from '../../../services/api.service';
import type { User } from '../../../services/api.service';
import { Plus, Search, Filter, X, Users, UserCheck, UserCog, Calendar, ChevronDown } from 'lucide-react';

// Skeleton loader for stat cards
const StatCardSkeleton = () => (
  <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15 animate-pulse">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-3 w-16 bg-rb-silver/20 rounded mb-2" />
        <div className="h-7 w-12 bg-rb-silver/20 rounded" />
      </div>
      <div className="w-8 h-8 bg-rb-silver/20 rounded-full" />
    </div>
  </div>
);




// Skeleton loader for table rows (unchanged)
const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3"><div className="h-4 w-24 bg-rb-silver/20 rounded" /></td>
    <td className="px-4 py-3"><div className="h-4 w-32 bg-rb-silver/20 rounded" /></td>
    <td className="px-4 py-3"><div className="h-4 w-40 bg-rb-silver/20 rounded" /></td>
    <td className="px-4 py-3"><div className="h-4 w-20 bg-rb-silver/20 rounded" /></td>
    <td className="px-4 py-3"><div className="h-4 w-16 bg-rb-silver/20 rounded" /></td>
  </tr>
);

const RegisterUserModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Call the register API – it will send a verification code automatically
      await register(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-rb-dark/95 backdrop-blur-md rounded-2xl w-full max-w-md p-6 border border-rb-silver/20"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-rb-silver">Create New User</h2>
          <button onClick={onClose} className="text-rb-gray hover:text-rb-silver">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Full name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-lg text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-lg text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Phone number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-lg text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-lg text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-lg text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
            >
              <option value="student">Student</option>
              <option value="consultant">Consultant</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold text-sm hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const consultantCount = users.filter(u => u.role === 'consultant').length;
  const studentCount = users.filter(u => u.role === 'student').length;
  const verifiedCount = users.filter(u => u.isVerified).length;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // TODO: Replace with getAllUsers() once backend endpoint is ready
        const consultants = await getConsultants();
        const mockStudents: User[] = [
          { id: '1', fullname: 'John Student', email: 'john@student.com', phoneNumber: '1234567890', role: 'student', isVerified: true, createdAt: new Date().toISOString() } as User,
          { id: '2', fullname: 'Jane Student', email: 'jane@student.com', phoneNumber: '0987654321', role: 'student', isVerified: false, createdAt: new Date().toISOString() } as User,
        ];
        const mockAdmins: User[] = [
          { id: '3', fullname: 'Admin User', email: 'admin@avital.com', phoneNumber: '5551234567', role: 'admin', isVerified: true, createdAt: new Date().toISOString() } as User,
        ];
        setUsers([...consultants, ...mockStudents, ...mockAdmins]);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesVerified = verifiedFilter === 'all' || (verifiedFilter === 'verified' ? user.isVerified : !user.isVerified);
    const matchesSearch = searchQuery === '' ||
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesVerified && matchesSearch;
  });

  const handleUserCreated = () => {
    // In a real app, refetch or add user to state
    window.location.reload();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with description and button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-rb-silver">Users</h1>
          <p className="text-rb-gray text-sm mt-1">Manage all platform users, their roles, and verification status.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold text-sm hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create New User
        </button>
      </div>

      {/* Stats Cards with Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-rb-gray">Total Users</p>
                  <p className="text-2xl font-bold text-rb-silver">{totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-rb-blue/50" />
              </div>
            </div>
            <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-rb-gray">Admins</p>
                  <p className="text-2xl font-bold text-rb-silver">{adminCount}</p>
                </div>
                <UserCog className="w-8 h-8 text-purple-400/50" />
              </div>
            </div>
            <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-rb-gray">Consultants</p>
                  <p className="text-2xl font-bold text-rb-silver">{consultantCount}</p>
                </div>
                <UserCheck className="w-8 h-8 text-rb-blue/50" />
              </div>
            </div>
            <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-rb-gray">Students</p>
                  <p className="text-2xl font-bold text-rb-silver">{studentCount}</p>
                </div>
                <Users className="w-8 h-8 text-green-400/50" />
              </div>
            </div>
            <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-rb-gray">Verified</p>
                  <p className="text-2xl font-bold text-rb-silver">{verifiedCount}</p>
                </div>
                <Calendar className="w-8 h-8 text-emerald-400/50" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Advanced Filters (unchanged) */}
      <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-4 border border-rb-silver/15">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray" />
              <input
                type="text"
                placeholder="Name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-xl text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
              />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Role</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-xl text-rb-silver text-sm appearance-none focus:border-rb-blue focus:outline-none"
              >
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="consultant">Consultant</option>
                <option value="student">Student</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray pointer-events-none" />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Verified</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray" />
              <select
                value={verifiedFilter}
                onChange={(e) => setVerifiedFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-xl text-rb-silver text-sm appearance-none focus:border-rb-blue focus:outline-none"
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rb-gray pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table (unchanged) */}
      <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl border border-rb-silver/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-rb-black/50 border-b border-rb-silver/15">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-rb-gray uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-rb-gray">No users found</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => navigate(`/dashboard/admin/users/${user.id}`)}
                    className="border-b border-rb-silver/10 hover:bg-rb-blue/5 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rb-blue/20 flex items-center justify-center text-rb-blue font-bold text-sm">
                          {user.fullname.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-rb-silver">{user.fullname}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-rb-gray">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                        user.role === 'consultant' ? 'bg-rb-blue/20 text-rb-blue' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${user.isVerified ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {user.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-rb-gray">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <RegisterUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleUserCreated}
          />
        )}
      </AnimatePresence>
    </div>
  );
};