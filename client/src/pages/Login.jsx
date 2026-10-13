
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { roleHome } from '../utils/roles';
import AuthCard, {
  buttonClass,
  inputClass,
  labelClass,
} from '../components/AuthCard';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const user = await login(form);

      navigate(
        location.state?.from?.pathname || roleHome(user.role),
        { replace: true }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Is the server running?'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 px-4 py-8">
      <div className="w-full max-w-md">
        <AuthCard
          title="Login"
          footer={
            <>
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Register here
              </Link>
            </>
          }
        >
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className={labelClass} htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                className={inputClass}
                value={form.email}
                onChange={onChange}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="password">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className={inputClass}
                value={form.password}
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`${buttonClass} w-full disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
