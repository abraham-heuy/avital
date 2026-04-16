import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Mail, Phone, Calendar, CheckCircle, XCircle, FileText,
  UserX, Shield, Building, GraduationCap, Code, ExternalLink,
  Clock, Circle, Award, Receipt, CreditCard, PlusCircle, Send
} from 'lucide-react';
import { getConsultants } from '../../../services/api.service';
import type { User } from '../../../services/api.service';

// Mock applications (replace with real API)
const mockApplications = [
  {
    id: '1',
    projectTitle: 'AI Dashboard',
    description: 'Real-time analytics dashboard for student performance prediction using machine learning.',
    status: 'completed',
    createdAt: '2025-03-01',
    techStack: 'React, Python, TensorFlow',
    deadline: '2025-04-15',
    milestones: [
      { title: 'Research & Data Collection', completed: true, date: '2025-03-05' },
      { title: 'Model Development', completed: true, date: '2025-03-20' },
      { title: 'Frontend Dashboard', completed: true, date: '2025-03-28' },
      { title: 'Integration & Testing', completed: true, date: '2025-04-02' },
      { title: 'Final Deployment', completed: true, date: '2025-04-10' },
    ],
    outcome: 'Successfully deployed at pilot institution, 30% reduction in manual grading time.',
  },
  {
    id: '2',
    projectTitle: 'Blockchain Supply Chain',
    description: 'Decentralised platform for tracking pharmaceutical shipments from manufacturer to patient.',
    status: 'in_progress',
    createdAt: '2025-03-15',
    techStack: 'Solidity, Web3.js, Node.js, IPFS',
    deadline: '2025-05-20',
    milestones: [
      { title: 'Smart Contract Design', completed: true, date: '2025-03-20' },
      { title: 'Backend API Development', completed: true, date: '2025-04-01' },
      { title: 'Frontend Integration', completed: false, date: null },
      { title: 'Testing & Security Audit', completed: false, date: null },
      { title: 'Deployment', completed: false, date: null },
    ],
    outcome: null,
  },
  {
    id: '3',
    projectTitle: 'Mobile Health App',
    description: 'Cross‑platform app for remote patient monitoring with wearable integration.',
    status: 'pending',
    createdAt: '2025-04-01',
    techStack: 'React Native, Firebase, ML Kit',
    deadline: '2025-06-10',
    milestones: null,
    outcome: null,
  },
];

// Mock payment history
const mockPayments = [
  { id: 'pay1', amount: 49, status: 'completed', date: '2025-03-10', method: 'M-Pesa', invoiceUrl: '#', project: 'AI Dashboard' },
  { id: 'pay2', amount: 99, status: 'completed', date: '2025-04-01', method: 'Card', invoiceUrl: '#', project: 'Blockchain Supply Chain' },
  { id: 'pay3', amount: 29, status: 'pending', date: '2025-04-15', method: 'M-Pesa', invoiceUrl: '#', project: 'Mobile Health App' },
];

// ✅ FIXED: Added index signature to statusConfig
const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  under_review: { label: 'Under Review', color: 'bg-blue-500/20 text-blue-400', icon: Shield },
  matched: { label: 'Matched', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  in_progress: { label: 'In Progress', color: 'bg-purple-500/20 text-purple-400', icon: Clock },
  completed: { label: 'Completed', color: 'bg-emerald-500/20 text-emerald-400', icon: CheckCircle },
};

const calculateProgress = (milestones: any[]) => {
  if (!milestones || milestones.length === 0) return 0;
  const completed = milestones.filter(m => m.completed).length;
  return (completed / milestones.length) * 100;
};

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications] = useState(mockApplications);
  const [payments] = useState(mockPayments);
  const [activeTab, setActiveTab] = useState<'applications' | 'projects'>('applications');

  const totalPaid = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const approvedApplications = applications.filter(app => app.status !== 'pending');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const consultants = await getConsultants();
        const found = consultants.find(c => c.id === id);
        if (found) {
          setUser(found);
        } else if (id === '1') {
          setUser({
            id: '1',
            fullname: 'John Student',
            email: 'john@student.com',
            phoneNumber: '1234567890',
            role: 'student',
            isVerified: true,
            createdAt: new Date().toISOString(),
            university: 'University of Nairobi',
            yearOfStudy: '4th Year',
          } as User);
        } else if (id === '2') {
          setUser({
            id: '2',
            fullname: 'Jane Student',
            email: 'jane@student.com',
            phoneNumber: '0987654321',
            role: 'student',
            isVerified: false,
            createdAt: new Date().toISOString(),
            university: 'Dedan Kimathi University',
            yearOfStudy: '3rd Year',
          } as User);
        } else if (id === '3') {
          setUser({
            id: '3',
            fullname: 'Admin User',
            email: 'admin@avital.com',
            phoneNumber: '5551234567',
            role: 'admin',
            isVerified: true,
            createdAt: new Date().toISOString(),
          } as User);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleAction = (action: string) => {
    console.log(`Action: ${action} on user ${user?.id}`);
    alert(`Action "${action}" triggered. Implement backend integration.`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-rb-silver">Loading user details...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-rb-gray">User not found.</p>
          <button onClick={() => navigate('/dashboard/admin/users')} className="mt-4 text-rb-blue hover:text-rb-silver">Back to Users</button>
        </div>
      </div>
    );
  }

  const userInitials = user.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/admin/users')} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-rb-silver" />
          </button>
          <h1 className="text-2xl font-bold text-rb-silver">User Profile</h1>
        </div>
        <div className="flex gap-2">
          {!user.isVerified && (
            <button onClick={() => handleAction('verify')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors text-sm">
              <CheckCircle className="w-4 h-4" /> Verify User
            </button>
          )}
          <button onClick={() => handleAction('suspend')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm">
            <UserX className="w-4 h-4" /> Suspend
          </button>
          <button onClick={() => handleAction('change-role')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm">
            <Shield className="w-4 h-4" /> Change Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: User Info + Payment History */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-rb-blue/20 flex items-center justify-center text-3xl font-bold text-rb-blue mb-4">
                {userInitials}
              </div>
              <h2 className="text-xl font-bold text-rb-silver">{user.fullname}</h2>
              <span className={`mt-2 text-xs px-3 py-1 rounded-full ${
                user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                user.role === 'consultant' ? 'bg-rb-blue/20 text-rb-blue' :
                'bg-green-500/20 text-green-400'
              }`}>
                {user.role}
              </span>

              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-rb-gray">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-rb-gray">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{user.phoneNumber || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-rb-gray">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {user.isVerified ? (
                    <><CheckCircle className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400">Verified</span></>
                  ) : (
                    <><XCircle className="w-4 h-4 text-red-400" /><span className="text-red-400">Unverified</span></>
                  )}
                </div>
              </div>

              {(user.role === 'student' || user.role === 'consultant') && (
                <div className="w-full mt-6 pt-4 border-t border-rb-silver/10">
                  {user.university && (
                    <div className="flex items-center gap-3 text-sm text-rb-gray mb-2">
                      <Building className="w-4 h-4" />
                      <span>{user.university}</span>
                    </div>
                  )}
                  {user.yearOfStudy && (
                    <div className="flex items-center gap-3 text-sm text-rb-gray">
                      <GraduationCap className="w-4 h-4" />
                      <span>{user.yearOfStudy}</span>
                    </div>
                  )}
                </div>
              )}

              {user.role === 'consultant' && (
                <div className="w-full mt-4 pt-4 border-t border-rb-silver/10">
                  <p className="text-xs text-rb-gray mb-2">Tech Stack</p>
                  <p className="text-sm text-rb-silver">{user.techStack || 'Not specified'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment History Card */}
          <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-5 border border-rb-silver/15">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-rb-silver flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rb-blue" />
                Payment History
              </h3>
              <div className="flex gap-1">
                <button onClick={() => handleAction('record-payment')} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Record Payment">
                  <PlusCircle className="w-4 h-4 text-rb-gray" />
                </button>
                <button onClick={() => handleAction('send-invoice')} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Send Invoice">
                  <Send className="w-4 h-4 text-rb-gray" />
                </button>
              </div>
            </div>

            <div className="mb-4 p-3 bg-rb-black/30 rounded-xl border border-rb-silver/10">
              <p className="text-xs text-rb-gray">Total Paid</p>
              <p className="text-2xl font-bold text-rb-silver">${totalPaid}</p>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {payments.length === 0 ? (
                <p className="text-xs text-rb-gray text-center py-4">No payment records</p>
              ) : (
                payments.map((payment) => (
                  <div key={payment.id} className="p-3 bg-rb-black/30 rounded-xl border border-rb-silver/10">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-rb-silver">${payment.amount}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        payment.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-rb-gray">
                      <span>{payment.project}</span>
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-rb-gray/60">{payment.method}</span>
                      <a href={payment.invoiceUrl} className="text-xs text-rb-blue hover:text-rb-silver transition-colors flex items-center gap-1">
                        <Receipt className="w-3 h-3" /> Invoice
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            {pendingPayments.length > 0 && (
              <div className="mt-3 p-2 bg-yellow-500/10 rounded-lg text-xs text-yellow-400">
                {pendingPayments.length} pending payment(s). <button onClick={() => handleAction('remind-payment')} className="underline">Send reminder</button>
              </div>
            )}

            <button onClick={() => handleAction('view-all-payments')} className="w-full mt-4 text-center text-xs text-rb-blue hover:text-rb-silver transition-colors">
              View all transactions →
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Applications & Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2 border-b border-rb-silver/10">
            <button onClick={() => setActiveTab('applications')} className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'applications' ? 'text-rb-blue' : 'text-rb-gray hover:text-rb-silver'
            }`}>
              All Applications
              {activeTab === 'applications' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rb-blue" />}
            </button>
            <button onClick={() => setActiveTab('projects')} className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'projects' ? 'text-rb-blue' : 'text-rb-gray hover:text-rb-silver'
            }`}>
              Active Projects
              {activeTab === 'projects' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rb-blue" />}
            </button>
          </div>

          {activeTab === 'applications' && (
            <div className="space-y-4">
              {applications.map((app) => {
                const statusInfo = statusConfig[app.status] || { label: app.status, color: 'bg-gray-500/20 text-gray-400', icon: Clock };
                const StatusIcon = statusInfo.icon;
                return (
                  <div key={app.id} className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-5 border border-rb-silver/15 hover:border-rb-blue/30 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-rb-blue" /><h3 className="font-semibold text-rb-silver">{app.projectTitle}</h3></div>
                      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" /> {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-rb-gray mb-3 line-clamp-2">{app.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-rb-gray/70">
                      <span className="flex items-center gap-1"><Code className="w-3 h-3" /> {app.techStack}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Deadline: {new Date(app.deadline).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Submitted: {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                    {app.outcome && (
                      <div className="mt-3 p-2 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs flex items-center gap-2">
                        <Award className="w-4 h-4" /> {app.outcome}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              {approvedApplications.map((project) => {
                const progress = project.milestones ? calculateProgress(project.milestones) : 0;
                const statusInfo = statusConfig[project.status] || { label: project.status, color: 'bg-gray-500/20 text-gray-400', icon: Clock };
                return (
                  <div key={project.id} className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-5 border border-rb-silver/15">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-rb-silver">{project.projectTitle}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-rb-gray mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-rb-gray/70 mb-4">
                      <span className="flex items-center gap-1"><Code className="w-3 h-3" /> {project.techStack}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-rb-gray mb-1"><span>Overall Progress</span><span>{Math.round(progress)}%</span></div>
                      <div className="h-2 bg-rb-silver/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-rb-blue to-rb-steel rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    {project.milestones && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-rb-gray mb-2">Milestones</p>
                        {project.milestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            {milestone.completed ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> : <Circle className="w-4 h-4 text-rb-gray/40 mt-0.5 flex-shrink-0" />}
                            <div className="flex-1">
                              <p className={`text-sm ${milestone.completed ? 'text-rb-silver line-through opacity-60' : 'text-rb-gray'}`}>{milestone.title}</p>
                              {milestone.date && <p className="text-xs text-rb-gray/50">Completed: {new Date(milestone.date).toLocaleDateString()}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.outcome && (
                      <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg text-emerald-400 text-sm flex items-center gap-2">
                        <Award className="w-5 h-5" /> {project.outcome}
                      </div>
                    )}

                    <div className="mt-4 flex justify-end">
                      <button className="text-xs text-rb-blue hover:text-rb-silver transition-colors flex items-center gap-1">
                        View Details <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};