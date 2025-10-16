import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    const storedUser = sessionStorage.getItem('user');

    if (storedRole && storedUser) {
      setRole(storedRole);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const setUserRole = (newRole, userData = null) => {
    setRole(newRole);
    setUser(userData);

    if (newRole && userData) {
      sessionStorage.setItem('userRole', newRole);
      sessionStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('user');
    }
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('zkCommitment');
    sessionStorage.removeItem('zkNullifier');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, setUserRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
