import { useEffect, useState } from 'react';
import RequireUser from '../components/auth/RequireUser';
import { useAuth } from '../components/auth/AuthProvider';
import { CheckCircle, ExternalLink, LogOut } from 'lucide-react';

function VoteConfirmedContent() {
  const { logout } = useAuth();
  const [voteResult, setVoteResult] = useState(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('sv_vote_result');
    if (!storedResult) {
      window.history.pushState({}, '', '/voter/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    try {
      setVoteResult(JSON.parse(storedResult));
    } catch (e) {
      window.history.pushState({}, '', '/voter/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, []);

  const handleEndSession = () => {
    logout();
  };

  if (!voteResult) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Vote Recorded.
          </h1>

          <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto">
            Your anonymous vote for <span className="text-white font-semibold">{voteResult.candidateName}</span> has been cryptographically verified and recorded.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Transaction Hash</h3>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <p className="text-sm font-mono text-blue-400 break-all">
                    {voteResult.txHash}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Block Number</h3>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <p className="text-base font-mono text-white">
                    #{voteResult.blockNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled
              className="px-6 py-3 bg-slate-800 text-gray-500 font-medium rounded-xl cursor-not-allowed flex items-center justify-center gap-2 min-h-[56px]"
              aria-label="View Audit Trail (Coming Soon)"
            >
              <ExternalLink className="w-5 h-5" />
              View Audit Trail (Coming Soon)
            </button>

            <button
              onClick={handleEndSession}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-slate-500/50 min-h-[56px]"
              aria-label="End Session"
            >
              <LogOut className="w-5 h-5" />
              End Session
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-8">
            Your identity remains completely anonymous and untraceable
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VoteConfirmed() {
  return (
    <RequireUser>
      <VoteConfirmedContent />
    </RequireUser>
  );
}
