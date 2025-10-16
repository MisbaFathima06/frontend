import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function RequireUser({ children }) {
  const { role } = useAuth();

  useEffect(() => {
    if (!role) {
      window.location.href = '/login';
    }
  }, [role]);

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-blue-400">Redirecting to login...</div>
      </div>
    );
  }

  return children;
}
