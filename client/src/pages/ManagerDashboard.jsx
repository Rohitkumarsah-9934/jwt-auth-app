
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

export default function ManagerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchManagers = async () => {
      try {
        const response = await api.get('/auth/manager');

        if (active) {
          setManagers(
            Array.isArray(response.data?.managers)
              ? response.data.managers
              : []
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              'Manager data load nahi ho paya.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchManagers();

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Spinner />;

  const activities = [
    'Approved project proposal from Team A',
    'Reviewed performance reports',
    'Scheduled team meeting for next week',
    'Assigned new tasks to team members',
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
       
        <section className="mb-5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white shadow-md">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Manager Dashboard
          </h1>
          <p className="mt-2 text-sm text-white/90">
            Welcome, {user?.name || 'Manager'}! Manage your team efficiently.
          </p>
        </section>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        
        <section className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center justify-between rounded-lg border-l-4 border-blue-500 bg-white p-5 shadow-md">
            <div>
              <p className="text-sm text-gray-600">Team Members</p>
              <p className="mt-1 text-2xl font-bold">
                {managers.length}
              </p>
            </div>
            <span className="text-3xl">👥</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border-l-4 border-green-500 bg-white p-5 shadow-md">
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="mt-1 text-2xl font-bold">8</p>
            </div>
            <span className="text-3xl">📊</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border-l-4 border-yellow-500 bg-white p-5 shadow-md">
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="mt-1 text-2xl font-bold">4</p>
            </div>
            <span className="text-3xl">⌛</span>
          </div>
        </section>

       
        <section className="mb-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-lg bg-white p-5 shadow-md">
            <h2 className="mb-4 text-lg font-bold">
              📝 Recent Activities
            </h2>

            <ul className="space-y-3 text-sm text-gray-700">
              {activities.map((activity, index) => (
                <li key={activity} className="flex gap-2">
                  <span
                    className={[
                      'mt-1 h-2 w-2 shrink-0 rounded-full',
                      'bg-green-500',
                      'bg-blue-500',
                      'bg-yellow-500',
                      'bg-purple-500',
                    ][index]}
                  />
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-md">
            <h2 className="mb-4 text-lg font-bold">
              👤 Manager Information
            </h2>

            <div className="divide-y divide-gray-200 text-sm">
              <div className="grid grid-cols-[60px_1fr] gap-3 py-3">
                <span className="text-gray-600">Name:</span>
                <span className="break-words font-medium">
                  {user?.name || '-'}
                </span>
              </div>

              <div className="grid grid-cols-[60px_1fr] gap-3 py-3">
                <span className="text-gray-600">Email:</span>
                <span className="break-words font-medium">
                  {user?.email || '-'}
                </span>
              </div>

              <div className="grid grid-cols-[60px_1fr] gap-3 py-3">
                <span className="text-gray-600">Role:</span>
                <span>
                  <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold capitalize text-purple-700">
                    {user?.role || 'Manager'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

      
        <section className="mb-5 flex gap-3 border-l-4 border-blue-400 bg-blue-50 p-4 text-sm text-blue-800">
          <span className="text-xl">ℹ️</span>
          <p>
            <strong>Manager Access Level:</strong> You can manage team
            members, approve requests, and oversee projects.
          </p>
        </section>

        
        <section className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-blue-700 cursor-pointer"
          >
            View User Dashboard
          </button>

          <button
            onClick={() => navigate('/dashboard')}
          
            
            className="rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-red-700 cursor-pointer"
          >
            Go to Admin Dashboard
          </button>
        </section>
      </main>
    </div>
  );
}
