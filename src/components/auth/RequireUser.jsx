import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function RequireUser({ children }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'voter') {
      window.history.pushState({}, '', '/voter/auth');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [user]);

  if (!user || user.role !== 'voter') {
    return null;
  }

  return children;
}
