import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://avitalsolutions-latest.onrender.com/avital/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // sends cookies (access_token) automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response:any) => response,
  (error:any) => {
    if (error.response?.status === 401) {
      // Unauthorized – redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========== Types ==========

export interface User {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: 'student' | 'consultant' | 'admin';
  isVerified: boolean;
  university?: string;
  yearOfStudy?: string;
  techStack?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  ticket_id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  projectTitle: string;
  projectDescription: string;
  university?: string;
  yearOfStudy?:string;
  techStack: string;
  deadline: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  applicationStatus: 'pending' | 'under_review' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  blocker?: string;
  referralSource?: string;
  groupType: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Match {
  id: string;
  applicationId: string;
  consultantId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'in_progress' | 'completed';
  paymentConfirmed: boolean;
  notes?: string;
  application?: Application;
  consultant?: User;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  completedApplications: number;
  totalConsultants: number;
  totalStudents: number;
  activeMatches: number;
}

// ========== Auth APIs ==========

export const register = async (data: {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  university?: string;
  yearOfStudy?: string;
}) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data; // { accessToken, user }
};

export const verifyCode = async (email: string, code: string) => {
  const response = await apiClient.post('/auth/verify', { email, code });
  return response.data;
};

export const resendVerificationCode = async (email: string) => {
  const response = await apiClient.post('/auth/resend-code', { email });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (email: string, code: string, newPassword: string) => {
  const response = await apiClient.post('/auth/reset-password', { email, code, newPassword });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

// ========== Application APIs ==========

export const createApplication = async (data: {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  university?: string;
  yearOfStudy?: string;
  projectTitle: string;
  projectDescription: string;
  techStack: string;
  deadline: string;
  urgency: string;
  blocker?: string;
  referralSource?: string;
  groupType?: string;
}): Promise<{ message: string; ticket_id: string }> => {
  const response = await apiClient.post('/applications', data);
  return response.data;
};

export const getApplicationByTicket = async (ticketId: string): Promise<Application> => {
  const response = await apiClient.get(`/applications/ticket/${ticketId}`);
  return response.data;
};

export const getUserApplications = async (): Promise<Application[]> => {
  const response = await apiClient.get('/applications/me');
  return response.data;
};

// ========== User Profile APIs ==========

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get('/users/me');
  return response.data;
};

export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const response = await apiClient.put('/users/me', data);
  return response.data;
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const response = await apiClient.post('/users/change-password', { currentPassword, newPassword });
  return response.data;
};

export const getConsultants = async (): Promise<User[]> => {
  const response = await apiClient.get('/consultants');
  return response.data;
};

// ========== Match APIs (Consultant) ==========

export const getConsultantMatches = async (): Promise<Match[]> => {
  const response = await apiClient.get('/consultant/matches');
  return response.data;
};

export const acceptMatch = async (matchId: string): Promise<Match> => {
  const response = await apiClient.put(`/matches/${matchId}/accept`);
  return response.data;
};

export const rejectMatch = async (matchId: string, reason?: string): Promise<Match> => {
  const response = await apiClient.put(`/matches/${matchId}/reject`, { reason });
  return response.data;
};

export const startConsultation = async (matchId: string): Promise<Match> => {
  const response = await apiClient.put(`/matches/${matchId}/start`);
  return response.data;
};

export const completeMatch = async (matchId: string): Promise<Match> => {
  const response = await apiClient.put(`/matches/${matchId}/complete`);
  return response.data;
};

// ========== Admin APIs ==========

export const getAllApplications = async (filters?: {
  status?: string;
  paymentStatus?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ applications: Application[]; total: number; page: number; limit: number }> => {
  const response = await apiClient.get('/admin/applications', { params: filters });
  return response.data;
};

export const reviewApplication = async (applicationId: string, status: string, adminNotes?: string) => {
  const response = await apiClient.post(`/admin/applications/review/${applicationId}`, { status, adminNotes });
  return response.data;
};

export const assignConsultant = async (applicationId: string, consultantId: string, notes?: string) => {
  const response = await apiClient.post('/admin/assign-consultant', { applicationId, consultantId, notes });
  return response.data;
};

export const confirmPayment = async (matchId: string) => {
  const response = await apiClient.put(`/matches/${matchId}/pay`);
  return response.data;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get('/admin/dashboard/stats');
  return response.data;
};

// ========== Helper to create match (admin) ==========
export const createMatch = async (applicationId: string, consultantId: string, notes?: string): Promise<Match> => {
  const response = await apiClient.post('/matches', { applicationId, consultantId, notes });
  return response.data;
};