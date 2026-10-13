
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');

    delete api.defaults.headers.common.Authorization;

    setUser(null);
  }, []);

  
  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        if (active) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

     
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get('/auth/me');

        if (active) {
          setUser(response.data?.user || null);
        }
      } catch (error) {
        if (active) {
          logout();
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      active = false;
    };
  }, [logout]);


  useEffect(() => {
    window.addEventListener('auth:logout', logout);

    return () => {
      window.removeEventListener('auth:logout', logout);
    };
  }, [logout]);

  
  const persist = useCallback((data) => {
    if (!data?.token || !data?.user) {
      throw new Error('Invalid authentication response');
    }

    localStorage.setItem('token', data.token);

    api.defaults.headers.common.Authorization =
      `Bearer ${data.token}`;

    setUser(data.user);

    return data.user;
  }, []);

  const register = useCallback(
    async (form) => {
      const response = await api.post('/auth/register', form);
      return persist(response.data);
    },
    [persist]
  );

  const login = useCallback(
    async (form) => {
      const response = await api.post('/auth/login', form);
      return persist(response.data);
    },
    [persist]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
