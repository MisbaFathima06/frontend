import { useState, useEffect } from 'react';
import RequireUser from '../components/auth/RequireUser';
import { generateIdentity } from '../lib/zk/identity';
import { Shield, CheckCircle, Loader } from 'lucide-react';

function VoterSessionInitContent() {
  const [step, setStep] = useState('loading');
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    initializeIdentity();
  }, []);

  const initializeIdentity = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newIdentity = generateIdentity();
    setIdentity(newIdentity);

    sessionStorage.setItem('zkCommitment', newIdentity.commitment);
    sessionStorage.setItem('zkNullifier', newIdentity.nullifier);

    setStep('success');
  };

  const handleProceed = () => {
    window.location.href = '/voter/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {step === 'loading' && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6 relative">
              <Shield className="w-10 h-10 text-blue-400" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              Initializing Anonymity Layer
            </h1>

            <div className="space-y-3 text-gray-400 max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-3">
                <Loader className="w-4 h-4 animate-spin text-blue-400" />
                <p className="text-sm">Generating Your ZK Identity...</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Loader className="w-4 h-4 animate-spin text-blue-400" />
                <p className="text-sm">Computing Nullifier Hash...</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Loader className="w-4 h-4 animate-spin text-blue-400" />
                <p className="text-sm">Securing Your Anonymous Session...</p>
              </div>
            </div>

            <div className="mt-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-500">
                Your identity is being generated locally in your browser. No personal information is transmitted.
              </p>
            </div>
          </div>
        )}

        {step === 'success' && identity && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              Identity Secured
            </h1>

            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              You are now a one-time, untraceable voter. Your commitment has been cryptographically sealed.
            </p>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Your ZK Commitment</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <p className="text-sm font-mono text-blue-400 break-all">
                      {identity.commitment.substring(0, 20)}...{identity.commitment.substring(identity.commitment.length - 20)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">100%</div>
                    <div className="text-xs text-gray-500">Anonymous</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">0</div>
                    <div className="text-xs text-gray-500">Data Stored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">1x</div>
                    <div className="text-xs text-gray-500">Vote Only</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Cast Your Anonymous Vote
            </button>

            <p className="text-xs text-gray-500 mt-6">
              Your session is active for this voting round only
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VoterSessionInit() {
  return (
    <RequireUser>
      <VoterSessionInitContent />
    </RequireUser>
  );
}
