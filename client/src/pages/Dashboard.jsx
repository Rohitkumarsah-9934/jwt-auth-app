
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/me');

        if (active) {
          setProfile(response.data?.user || user || null);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              'Profile load nahi ho paya.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Spinner />;

  const info = profile || user;
  const role =
    typeof info?.role === 'string'
      ? info.role
      : info?.role?.name || info?.role?.value || 'user';

  const roleHome = {
    user: '/dashboard',
    manager: '/manager',
    admin: '/admin',
  };

  const roleLabel =
    role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">

       
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold">
            User Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Welcome, {info?.name || 'User'}!
          </p>
        </section>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        
        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg bg-blue-500 p-5 text-white shadow-md">
            <div>
              <p className="text-sm font-medium">My Tasks</p>
              <p className="mt-1 text-3xl font-bold">5</p>
            </div>
            <span className="text-4xl">📋</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-green-500 p-5 text-white shadow-md">
            <div>
              <p className="text-sm font-medium">Notifications</p>
              <p className="mt-1 text-3xl font-bold">3</p>
            </div>
            <span className="text-4xl">🔔</span>
          </div>
        </section>

       
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">
            Your Information
          </h2>

          <div className="divide-y divide-gray-200 text-sm">
            <div className="grid grid-cols-[85px_1fr] gap-3 py-3">
              <span className="text-gray-600">Name:</span>
              <span className="break-words font-medium">
                {info?.name || '-'}
              </span>
            </div>

            <div className="grid grid-cols-[85px_1fr] gap-3 py-3">
              <span className="text-gray-600">Email:</span>
              <span className="break-words font-medium">
                {info?.email || '-'}
              </span>
            </div>

            <div className="grid grid-cols-[85px_1fr] gap-3 py-3">
              <span className="text-gray-600">Role:</span>
              <span>
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {roleLabel}
                </span>
              </span>
            </div>
          </div>
        </section>

       
        <section className="flex gap-3 border-l-4 border-yellow-400 bg-yellow-50 p-4 text-sm text-yellow-800">
          <span className="text-lg">ℹ️</span>
          <p>
            <strong>User Access Level:</strong>{' '}
            You have basic access to view your profile and tasks.
          </p>
        </section>

        
        <section className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/manager')}
            disabled={role.toLowerCase() !== 'manager'}
            className="rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Go to Manager Dashboard
          </button>

          <button
            onClick={() => navigate('/admin')}
            disabled={role.toLowerCase() !== 'admin'}
            className="rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Go to Admin Dashboard
          </button>
        </section>
      </main>
    </div>
  );
}
