import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Mail, Phone, Calendar, Code, Clock, DollarSign,
  Briefcase, Shield, User as UserIcon
} from 'lucide-react';
import { getAllApplications, reviewApplication, assignConsultant, getConsultants, type Application, type User } from '../../../services/api.service';

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400' },
  { value: 'under_review', label: 'Under Review', color: 'bg-blue-500/20 text-blue-400' },
  { value: 'matched', label: 'Matched', color: 'bg-green-500/20 text-green-400' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-purple-500/20 text-purple-400' },
  { value: 'completed', label: 'Completed', color: 'bg-emerald-500/20 text-emerald-400' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500/20 text-red-400' },
];

const paymentOptions = [
  { value: 'unpaid', label: 'Unpaid', color: 'bg-red-500/20 text-red-400' },
  { value: 'paid', label: 'Paid', color: 'bg-green-500/20 text-green-400' },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-500/20 text-gray-400' },
];

// Skeleton components
const SkeletonCard = () => (
  <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="h-7 w-48 bg-rb-silver/20 rounded" />
      <div className="h-6 w-20 bg-rb-silver/20 rounded-full" />
    </div>
    <div className="h-4 w-full bg-rb-silver/20 rounded mb-4" />
    <div className="h-4 w-3/4 bg-rb-silver/20 rounded mb-4" />
    <div className="flex flex-wrap gap-4">
      <div className="h-5 w-32 bg-rb-silver/20 rounded" />
      <div className="h-5 w-32 bg-rb-silver/20 rounded" />
      <div className="h-5 w-32 bg-rb-silver/20 rounded" />
    </div>
  </div>
);

const SkeletonActionCard = () => (
  <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15 animate-pulse">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-5 h-5 bg-rb-silver/20 rounded" />
      <div className="h-6 w-32 bg-rb-silver/20 rounded" />
    </div>
    <div className="space-y-4">
      <div className="h-10 w-full bg-rb-silver/20 rounded-lg" />
      <div className="h-20 w-full bg-rb-silver/20 rounded-lg" />
      <div className="h-10 w-full bg-rb-silver/20 rounded-lg" />
    </div>
  </div>
);

export const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [consultants, setConsultants] = useState<User[]>([]);
  const [selectedConsultant, setSelectedConsultant] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { applications } = await getAllApplications();
        const found = applications.find(a => a.id === id);
        if (found) setApplication(found);
        const consultantsList = await getConsultants();
        setConsultants(consultantsList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!application) return;
    setUpdating(true);
    try {
      await reviewApplication(application.id, newStatus as any, adminNotes);
      setApplication({ ...application, applicationStatus: newStatus as Application['applicationStatus'] });
      setAdminNotes('');
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignConsultant = async () => {
    if (!application || !selectedConsultant) return;
    setAssigning(true);
    try {
      await assignConsultant(application.id, selectedConsultant, adminNotes);
      setApplication({ ...application, applicationStatus: 'matched' });
      setSelectedConsultant('');
      setAdminNotes('');
      alert('Consultant assigned successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to assign consultant');
    } finally {
      setAssigning(false);
    }
  };

  // Skeleton loading view
  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-rb-silver/20 rounded-lg animate-pulse" />
          <div className="h-8 w-48 bg-rb-silver/20 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="space-y-6">
            <SkeletonActionCard />
            <SkeletonActionCard />
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-rb-gray">Application not found.</p>
          <button onClick={() => navigate('/dashboard/admin/applications')} className="mt-4 text-rb-blue hover:text-rb-silver">Back to Applications</button>
        </div>
      </div>
    );
  }

  const currentStatus = statusOptions.find(s => s.value === application.applicationStatus) || statusOptions[0];
  const currentPayment = paymentOptions.find(p => p.value === application.paymentStatus) || paymentOptions[0];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/dashboard/admin/applications')} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-rb-silver" />
        </button>
        <h1 className="text-2xl font-bold text-rb-silver">Application Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Info Card */}
          <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-rb-silver">{application.projectTitle}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
                {currentStatus.label}
              </span>
            </div>
            <p className="text-rb-gray text-sm mb-4">{application.projectDescription}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 text-rb-gray"><Code className="w-4 h-4" /> {application.techStack}</span>
              <span className="flex items-center gap-2 text-rb-gray"><Calendar className="w-4 h-4" /> Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
              <span className="flex items-center gap-2 text-rb-gray"><Clock className="w-4 h-4" /> Submitted: {new Date(application.createdAt).toLocaleDateString()}</span>
            </div>
            {application.blocker && (
              <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg text-yellow-400 text-sm">
                <strong>Blocker:</strong> {application.blocker}
              </div>
            )}
          </div>

          {/* Applicant Info Card */}
          <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
            <h3 className="text-lg font-semibold text-rb-silver mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5" /> Applicant</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-rb-gray"><UserIcon className="w-4 h-4" /> {application.applicantName}</div>
              <div className="flex items-center gap-3 text-sm text-rb-gray"><Mail className="w-4 h-4" /> {application.applicantEmail}</div>
              {application.applicantPhone && <div className="flex items-center gap-3 text-sm text-rb-gray"><Phone className="w-4 h-4" /> {application.applicantPhone}</div>}
              {application.university && <div className="flex items-center gap-3 text-sm text-rb-gray"><Briefcase className="w-4 h-4" /> {application.university} ({application.yearOfStudy})</div>}
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Payment */}
        <div className="space-y-6">
          {/* Payment Info */}
          <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
            <h3 className="text-lg font-semibold text-rb-silver mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5" /> Payment</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-rb-gray">Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentPayment.color}`}>{currentPayment.label}</span>
            </div>
            <button
              onClick={() => alert('Mark payment as paid – integrate with backend')}
              className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold text-sm"
            >
              Mark as Paid
            </button>
          </div>

          {/* Review Actions */}
          <div className="bg-rb-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-rb-silver/15">
            <h3 className="text-lg font-semibold text-rb-silver mb-4 flex items-center gap-2"><Shield className="w-5 h-5" /> Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Change Status</label>
                <select
                  value={application.applicationStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={updating}
                  className="w-full px-3 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-lg text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Admin Notes</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-lg text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
                  placeholder="Add notes (e.g., reason for status change)"
                />
              </div>
              {application.applicationStatus !== 'matched' && (
                <div>
                  <label className="block text-xs font-semibold text-rb-silver/50 mb-1">Assign Consultant</label>
                  <div className="flex gap-2">
                    <select
                      value={selectedConsultant}
                      onChange={(e) => setSelectedConsultant(e.target.value)}
                      className="flex-1 px-3 py-2 bg-rb-black/60 border border-rb-silver/15 rounded-lg text-rb-silver text-sm focus:border-rb-blue focus:outline-none"
                    >
                      <option value="">Select consultant</option>
                      {consultants.map(c => (
                        <option key={c.id} value={c.id}>{c.fullname} - {c.techStack || 'General'}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleAssignConsultant}
                      disabled={!selectedConsultant || assigning}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-rb-blue to-rb-steel text-rb-black font-semibold text-sm disabled:opacity-50"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};