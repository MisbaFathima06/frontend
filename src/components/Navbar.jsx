import { useState, useEffect } from 'react';
import { Shield, Moon, Sun, Vote, Key } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Apply dark mode to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Candidates', href: '#candidates' },
    { name: 'Security', href: '#security' },
    { name: 'Results', href: '#results' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SecureVote</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                window.history.pushState({}, '', '/voter/auth');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Start Voting"
            >
              🗳️ Start Voting
            </button>

            <button
              onClick={() => {
                window.history.pushState({}, '', '/admin/login');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Admin Access"
            >
              🔑 Admin Access
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
