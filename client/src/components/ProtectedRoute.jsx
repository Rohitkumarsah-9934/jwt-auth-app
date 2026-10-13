
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  const rawRole =
    typeof user.role === 'string'
      ? user.role
      : user.role?.value || user.role?.name;

  const role = rawRole?.trim().toLowerCase();
  const allowed = allowedRoles.map((item) =>
    item.trim().toLowerCase()
  );

 
  if (role === 'admin') return children;

  if (!role || !allowed.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
