import { useState, useEffect } from 'react';
import RequireAdmin from './components/auth/RequireAdmin';
import RequireUser from './components/auth/RequireUser';

import App from './App';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import VoterSessionInit from './pages/VoterSessionInit';
import VoterDashboard from './pages/VoterDashboard';
import VoteConfirmed from './pages/VoteConfirmed';

export default function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      setCurrentPath(window.location.pathname);
    };

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.history.pushState = originalPushState;
    };
  }, []);

  const getRoute = () => {
    switch (currentPath) {
      case '/':
        return <App />;
      case '/voter/auth':
        return <Login />;
      case '/admin/login':
        return <AdminLogin />;
      case '/admin/dashboard':
        return (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        );
      case '/voter/session-init':
        return (
          <RequireUser>
            <VoterSessionInit />
          </RequireUser>
        );
      case '/voter/dashboard':
        return (
          <RequireUser>
            <VoterDashboard />
          </RequireUser>
        );
      case '/vote-confirmed':
        return (
          <RequireUser>
            <VoteConfirmed />
          </RequireUser>
        );
      default:
        return <App />;
    }
  };

  return getRoute();
}
