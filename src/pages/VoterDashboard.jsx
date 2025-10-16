import { useState, useEffect } from 'react';
import RequireUser from '../components/auth/RequireUser';
import { useAuth } from '../components/auth/AuthProvider';
import { getCandidates } from '../lib/api/candidates';
import { submitVote } from '../lib/api/votes';
import { generateProof } from '../lib/zk/identity';
import { Shield, CheckCircle, ExternalLink, Vote, LogOut, AlertCircle } from 'lucide-react';

function VoterDashboardContent() {
  const { user, logout } = useAuth();
  const [commitment, setCommitment] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [voteResult, setVoteResult] = useState(null);

  useEffect(() => {
    const storedCommitment = sessionStorage.getItem('zkCommitment');

    if (!storedCommitment) {
      window.location.href = '/voter/session-init';
      return;
    }

    setCommitment(storedCommitment);
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await getCandidates();
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
      const proofData = generateProof({
        candidateId: candidate.id,
        commitment
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const result = await submitVote({
        candidateId: candidate.id,
        proof: proofData.proof,
        nullifierHash: proofData.nullifierHash,
        commitment
      });

      setVoteResult({
        candidate,
        txHash: result.txHash,
        blockNumber: result.blockNumber
      });
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setVoting(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (voteResult) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              Vote Recorded
            </h1>

            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Your anonymous vote for <span className="text-white font-medium">{voteResult.candidate.name}</span> has been cryptographically verified and recorded on the blockchain.
            </p>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Transaction Hash</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <p className="text-sm font-mono text-blue-400 break-all">
                      {voteResult.txHash}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Block Number</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <p className="text-sm font-mono text-white">
                      #{voteResult.blockNumber}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <button
                    disabled
                    className="w-full bg-gray-800 text-gray-500 font-medium py-3 px-6 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Audit Trail (Coming Soon)
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              End Session
            </button>

            <p className="text-xs text-gray-500 mt-6">
              Your identity remains completely anonymous and untraceable
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
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
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
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
          <h2 className="text-3xl font-bold text-white mb-2">
            Your Voice. Your Vote. Your Power.
          </h2>
          <p className="text-gray-400">
            Select your candidate. Your choice is completely anonymous and verifiable.
          </p>
        </div>

        {commitment && (
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium mb-2">ZK Identity Active</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Your anonymous identity is secured and ready for voting
                </p>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs font-mono text-blue-400 break-all">
                    {commitment.substring(0, 10)}...{commitment.substring(commitment.length - 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Loading candidates...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No candidates available at this time</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all"
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
                    <p className="text-sm text-gray-400 line-clamp-3">{candidate.biography}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleVote(candidate)}
                  disabled={voting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {voting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Vote...
                    </>
                  ) : (
                    <>
                      <Vote className="w-4 h-4" />
                      Vote for {candidate.name}
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
  return (
    <RequireUser>
      <VoterDashboardContent />
    </RequireUser>
  );
}
