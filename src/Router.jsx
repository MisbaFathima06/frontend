import { useState, useEffect } from 'react';

import App from './App';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import VoterSessionInit from './pages/VoterSessionInit';
import VoterDashboard from './pages/VoterDashboard';

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

  const routes = {
    '/': App,
    '/login': Login,
    '/admin/login': AdminLogin,
    '/admin/dashboard': AdminDashboard,
    '/voter/session-init': VoterSessionInit,
    '/voter/dashboard': VoterDashboard
  };

  const Component = routes[currentPath] || App;

  return <Component />;
}
