import { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { listCandidates, generateProof, maskHex, submitVote } from '../lib/helpers/voting';
import { Shield, Vote, LogOut, AlertCircle } from 'lucide-react';

function VoterDashboardContent() {
  const { logout } = useAuth();
  const [identity, setIdentity] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    const storedIdentity = sessionStorage.getItem('sv_identity');

    if (!storedIdentity) {
      window.history.pushState({}, '', '/voter/session-init');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    try {
      setIdentity(JSON.parse(storedIdentity));
    } catch (e) {
      window.history.pushState({}, '', '/voter/session-init');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = listCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error loading candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidate) => {
    setVoting(true);

    try {
      const proofData = generateProof(identity, candidate.id);

      const result = await submitVote(candidate.id, proofData);

      sessionStorage.setItem('sv_vote_result', JSON.stringify({
        candidateName: candidate.name,
        txHash: result.txHash,
        blockNumber: result.blockNumber
      }));

      window.history.pushState({}, '', '/vote-confirmed');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('Error submitting vote:', error);
      setVoting(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Vote className="w-5 h-5 text-blue-400" />
              </div>
              <h1 className="text-xl font-bold text-white">Cast Your Vote</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">
            Your Voice. Your Vote. Your Power.
          </h2>
          <p className="text-gray-300 text-lg">
            Select your candidate. Your choice is completely anonymous and verifiable.
          </p>
        </div>

        {identity && (
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold mb-2">ZK Identity Active</h3>
                <p className="text-sm text-gray-300 mb-3">
                  Your anonymous identity is secured and ready for voting
                </p>
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-sm font-mono text-blue-400">
                    {maskHex(identity.commitment)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-300 mt-4 text-lg">Loading candidates...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-300">No candidates available at this time</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all"
              >
                <div className="flex items-start gap-6 mb-6">
                  {candidate.image && (
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2">{candidate.name}</h3>
                    <p className="text-sm text-blue-400 mb-3">{candidate.party}</p>
                    <p className="text-sm text-gray-300 line-clamp-3">{candidate.biography}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleVote(candidate)}
                  disabled={voting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-500/50 min-h-[48px]"
                  aria-label={`Vote for ${candidate.name}`}
                >
                  {voting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Vote...
                    </>
                  ) : (
                    <>
                      <Vote className="w-5 h-5" />
                      Vote
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VoterDashboard() {
  return <VoterDashboardContent />;
}
