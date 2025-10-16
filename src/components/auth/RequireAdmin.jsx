import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function RequireAdmin({ children }) {
  const { role } = useAuth();

  useEffect(() => {
    if (role !== 'admin') {
      window.location.href = '/admin/login';
    }
  }, [role]);

  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-blue-400">Redirecting to admin login...</div>
      </div>
    );
  }

  return children;
}
