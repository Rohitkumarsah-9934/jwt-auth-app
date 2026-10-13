
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/Spinner';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { NotFound, Unauthorized } from './pages/Status';

import { useAuth } from './context/AuthContext';
import { roleHome } from './utils/roles';

function PublicOnly({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (user) {
    return <Navigate to={roleHome(user.role)} replace />;
  }

  return children;
}

function Home() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  return (
    <Navigate
      to={user ? roleHome(user.role) : '/login'}
      replace
    />
  );
}

export default function App() {
  const location = useLocation();

  const hideNavbar = ['/login', '/register'].includes(
    location.pathname
  );

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicOnly>
                <Login />
              </PublicOnly>
            }
          />

          <Route
            path="/register"
            element={
              <PublicOnly>
                <Register />
              </PublicOnly>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['user', 'manager', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

         
          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={['manager', 'admin']}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

        
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
