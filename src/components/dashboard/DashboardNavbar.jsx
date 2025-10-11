import { Shield, Sun, Moon, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const DashboardNavbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500"
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-white">SecureVote</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Dashboard
            </a>
            <a href="#results" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Results
            </a>
            <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg glass-morphism hover:bg-cyan-500/20 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-cyan-400" /> : <Moon className="w-5 h-5 text-cyan-400" />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg glass-morphism hover:bg-cyan-500/20 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-cyan-500/20"
        >
          <div className="px-4 py-4 space-y-3">
            <a href="#dashboard" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Dashboard
            </a>
            <a href="#results" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Results
            </a>
            <a href="#about" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              About
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
