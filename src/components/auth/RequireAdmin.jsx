import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function RequireAdmin({ children }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.history.pushState({}, '', '/admin/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return children;
}
