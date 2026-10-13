
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { roleHome } from '../utils/roles';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setOpen(false);
      navigate('/login', { replace: true });
    }
  };

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-700 text-white'
        : 'text-white/90 hover:bg-blue-700'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
       
        <NavLink to="/" className="text-xl font-bold">
          JWT Auth
        </NavLink>

        
        <nav className="hidden items-center gap-3 sm:flex">
          {!user ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-sm">
                Welcome, {user.name || user.username || user.email || 'User'}
              </span>

              <NavLink to={roleHome(user.role)} className={linkClass}>
                {user.role
                  ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)} Dashboard`
                  : 'Dashboard'}
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          className="rounded-md p-2 hover:bg-blue-700 sm:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      
      {open && (
        <nav className="space-y-2 border-t border-blue-500 px-4 py-3 sm:hidden">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="block rounded-md px-3 py-2 hover:bg-blue-700"
                onClick={() => setOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="block rounded-md px-3 py-2 hover:bg-blue-700"
                onClick={() => setOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <p className="px-3 py-2 text-sm">
                Welcome, {user.name || user.username || user.email || 'User'}
              </p>

              <NavLink
                to={roleHome(user.role)}
                className="block rounded-md px-3 py-2 hover:bg-blue-700"
                onClick={() => setOpen(false)}
              >
                {user.role
                  ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)} Dashboard`
                  : 'Dashboard'}
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-md bg-red-500 px-4 py-2 text-left text-sm font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
