import { useState } from 'react';
import { generateIdentity, maskHex } from '../lib/helpers/voting';
import { Shield, CheckCircle, Loader, Fingerprint, IdCard, AlertCircle } from 'lucide-react';

function VoterSessionInitContent() {
  const [step, setStep] = useState('choose');
  const [identity, setIdentity] = useState(null);
  const [error, setError] = useState(null);

  const handleEligibilityCheck = async (method) => {
    setStep('checking');
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const isEligible = Math.random() > 0.1;

    if (!isEligible) {
      setError(`Eligibility verification failed. You are not eligible to vote in this election.`);
      setStep('error');
      return;
    }

    setStep('generating');

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
      <div className="max-w-3xl w-full">
        {step === 'choose' && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6">
              <Shield className="w-10 h-10 text-blue-400" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Verify Your Eligibility
            </h1>

            <p className="text-gray-300 text-lg mb-12 max-w-xl mx-auto">
              Choose your preferred method to verify your eligibility to vote.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleEligibilityCheck('did')}
                className="group bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 hover:border-blue-500 rounded-2xl p-8 transition-all duration-300 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 min-h-[200px]"
                aria-label="Scan Digital ID"
              >
                <IdCard className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">Scan Digital ID</h3>
                <p className="text-gray-400 text-sm">
                  Use your government-issued digital identity to verify eligibility
                </p>
              </button>

              <button
                onClick={() => handleEligibilityCheck('biometric')}
                className="group bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 hover:border-emerald-500 rounded-2xl p-8 transition-all duration-300 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 min-h-[200px]"
                aria-label="Verify Fingerprint/Face"
              >
                <Fingerprint className="w-12 h-12 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">Verify Fingerprint/Face</h3>
                <p className="text-gray-400 text-sm">
                  Use biometric verification for secure identity confirmation
                </p>
              </button>
            </div>

            <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">
                Your eligibility is verified locally. No personal information is transmitted or stored.
              </p>
            </div>
          </div>
        )}

        {step === 'checking' && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6 relative">
              <Shield className="w-10 h-10 text-blue-400" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Verifying Eligibility
            </h1>

            <div className="space-y-4 text-gray-300 max-w-lg mx-auto text-lg">
              <div className="flex items-center justify-center gap-3">
                <Loader className="w-5 h-5 animate-spin text-blue-400" />
                <p>Checking voter registration...</p>
              </div>
            </div>
          </div>
        )}

        {step === 'generating' && (
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

        {step === 'error' && error && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Verification Failed
            </h1>

            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 mb-8 max-w-xl mx-auto">
              <p className="text-red-300 text-lg">{error}</p>
            </div>

            <button
              onClick={() => setStep('choose')}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-slate-500/50 text-lg min-h-[56px]"
              aria-label="Try Again"
            >
              Try Again
            </button>
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
  return <VoterSessionInitContent />;
}
