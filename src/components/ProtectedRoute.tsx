import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.hook';

interface ProtectedRouteProps {
  allowedRoles?: Array<'student' | 'consultant' | 'admin'>;
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-rb-black flex items-center justify-center">
        <div className="text-rb-silver">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};