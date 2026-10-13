
import { useEffect, useState } from 'react';
import api from '../api/axios';
import Spinner from '../components/Spinner';
import { PageShell, StatCard, UserTable } from '../components/UI';

export default function AdminDashboard() {
  const [data, setData] = useState({
    stats: { total: 0, user: 0, manager: 0, admin: 0 },
    users: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    api
      .get('/auth/admin')
      .then((res) => {
        if (active) {
          setData({
            stats: {
              total: res.data?.stats?.total ?? 0,
              user: res.data?.stats?.user ?? 0,
              manager: res.data?.stats?.manager ?? 0,
              admin: res.data?.stats?.admin ?? 0,
            },
            users: Array.isArray(res.data?.users)
              ? res.data.users
              : [],
          });
        }
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
              'Failed to load users. Please try again.'
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Spinner />;

  const { stats, users } = data;

  const actions = [
    {
      title: 'Manage Users',
      description: 'Add, edit, or remove users',
      style: 'bg-blue-50 text-blue-700',
      icon: '👥',
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      style: 'bg-purple-50 text-purple-700',
      icon: '⚙️',
    },
    {
      title: 'View Logs',
      description: 'Access system audit logs',
      style: 'bg-green-50 text-green-700',
      icon: '📊',
    },
    {
      title: 'Security Settings',
      description: 'Manage security configurations',
      style: 'bg-red-50 text-red-700',
      icon: '🔒',
    },
  ];

  const activities = [
    { title: 'User account created', time: '2 hours ago', color: 'bg-green-500' },
    { title: 'System backup completed', time: '5 hours ago', color: 'bg-blue-500' },
    { title: 'Security patch applied', time: '1 day ago', color: 'bg-yellow-500' },
    { title: 'Database optimized', time: '2 days ago', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-slate-800">
     
      

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-5">
        
        <section className="mb-5 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 p-6 text-white shadow-md">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="mt-1 text-sm">
            Welcome, Admin! You have full system control.
          </p>
        </section>

        
        {error && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

     
        <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow-md">
            <p className="text-sm text-gray-500">Total Users</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.total}</span>
              <span className="text-2xl">👤</span>
            </div>
          </div>

          <div className="rounded-lg border-l-4 border-purple-500 bg-white p-4 shadow-md">
            <p className="text-sm text-gray-500">Total Managers</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.manager}</span>
              <span className="text-2xl">👥</span>
            </div>
          </div>

          <div className="rounded-lg border-l-4 border-red-500 bg-white p-4 shadow-md">
            <p className="text-sm text-gray-500">Total Admins</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.admin}</span>
              <span className="text-2xl">⚡</span>
            </div>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow-md">
            <p className="text-sm text-gray-500">System Health</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">Good</span>
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </section>

        
        <section className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-lg bg-white p-5 shadow-md">
            <h3 className="mb-4 text-lg font-bold">
              🔧 Admin Actions
            </h3>

            <div className="space-y-3">
              {actions.map((action) => (
                <div
                  key={action.title}
                  className={`rounded-lg p-3 ${action.style}`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">
                      {action.title}
                    </h4>
                    <span>{action.icon}</span>
                  </div>
                  <p className="mt-1 text-xs opacity-80">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-md">
            <h3 className="mb-4 text-lg font-bold">
              📊 Recent Admin Activities
            </h3>

            <div>
              {activities.map((activity) => (
                <div
                  key={activity.title}
                  className="flex gap-3 border-b border-gray-200 py-3 last:border-b-0"
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${activity.color}`}
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

       
        <section className="mb-5 rounded-lg bg-white p-5 shadow-md">
          <h3 className="mb-4 text-lg font-bold">
            User Management
          </h3>
          <UserTable users={users} />
        </section>

      
        <section className="mb-5 flex gap-3 border-l-4 border-red-400 bg-red-50 p-4 text-sm text-red-700">
          <span className="text-xl">⚠️</span>
          <p>
            <strong>Admin Access Level:</strong> You have access to
            system features and user management. Use this access
            responsibly.
          </p>
        </section>

      
        <section className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              window.location.href = '/dashboard';
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-blue-700"
          >
            View User Dashboard
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = '/manager';
            }}
            className="rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-purple-700"
          >
            View Manager Dashboard
          </button>
        </section>
      </main>
    </div>
  );
}
