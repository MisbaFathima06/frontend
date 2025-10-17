import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('sv_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        sessionStorage.removeItem('sv_user');
      }
    }
    setIsLoading(false);
  }, []);

  const setRole = (role, email = null) => {
    const userData = { role, email };
    setUser(userData);
    sessionStorage.setItem('sv_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('sv_user');
    sessionStorage.removeItem('sv_identity');
    sessionStorage.removeItem('sv_vote_result');
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
