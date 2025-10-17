import { useAuth } from '../components/auth/AuthProvider';
import { Shield, Vote } from 'lucide-react';

export default function Login() {
  const { setRole } = useAuth();

  const handleBeginSession = () => {
    setRole('voter');
    window.history.pushState({}, '', '/voter/session-init');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6">
            <Shield className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Voice Deserves a Sanctuary.
          </h1>
          <div className="text-gray-300 text-lg leading-relaxed space-y-4 max-w-xl mx-auto">
            <p>
              In a world where every click is tracked and every choice is monitored, your vote remains sacred.
            </p>
            <p>
              No email. No password. No personal information. Just your voice, cryptographically secured and completely anonymous.
            </p>
            <p className="text-blue-400 font-medium">
              Your identity stays with you. Your vote speaks for itself.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mt-12">
          <button
            onClick={handleBeginSession}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-lg min-h-[56px]"
            aria-label="Begin Private Session"
          >
            <Vote className="w-6 h-6" />
            Begin Private Session
          </button>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-sm text-gray-400 text-center leading-relaxed">
              By starting a session, you'll generate a one-time cryptographic identity that ensures your vote is counted while keeping you completely anonymous. No traces. No tracking. Just democracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
