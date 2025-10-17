import { useState, useEffect } from 'react';
import RequireUser from '../components/auth/RequireUser';
import { generateIdentity, maskHex } from '../lib/zk/identity';
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

    sessionStorage.setItem('sv_identity', JSON.stringify(newIdentity));

    setStep('success');
  };

  const handleProceed = () => {
    window.history.pushState({}, '', '/voter/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {step === 'loading' && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6 relative">
              <Shield className="w-10 h-10 text-blue-400" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Initializing Anonymity Layer
            </h1>

            <div className="space-y-4 text-gray-300 max-w-lg mx-auto text-lg">
              <div className="flex items-center justify-center gap-3">
                <Loader className="w-5 h-5 animate-spin text-blue-400" />
                <p>Generating Your ZK Identity...</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Loader className="w-5 h-5 animate-spin text-blue-400" />
                <p>Computing Nullifier Hash...</p>
              </div>
            </div>

            <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">
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

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Identity Secured.
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto">
              You are now a one-time, untraceable voter.
            </p>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Your ZK Commitment</h3>
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <p className="text-base font-mono text-blue-400">
                      {maskHex(identity.commitment)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">100%</div>
                    <div className="text-xs text-gray-400">Anonymous</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">0</div>
                    <div className="text-xs text-gray-400">Data Stored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">1x</div>
                    <div className="text-xs text-gray-400">Vote Only</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-lg min-h-[56px]"
              aria-label="Cast Your Anonymous Vote"
            >
              <Shield className="w-6 h-6" />
              Cast Your Anonymous Vote
            </button>

            <p className="text-sm text-gray-400 mt-6">
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
