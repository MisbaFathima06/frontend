import { motion, AnimatePresence } from "framer-motion";
import { Shield, Fingerprint, CheckCircle2, AlertCircle, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useState, useEffect, useRef } from "react";

const generateZKIdentity = () => {
  const privateKey = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('');

  const commitment = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('');

  const nullifierHash = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('');

  return {
    privateKey,
    commitment,
    nullifierHash,
    timestamp: Date.now(),
    version: '1.0.0'
  };
};

const checkEligibility = async (method) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isEligible = Math.random() > 0.2;
      resolve({
        success: isEligible,
        method,
        message: isEligible
          ? 'Eligibility confirmed'
          : 'You are not eligible to vote in this election'
      });
    }, 2000);
  });
};

export default function VoterSessionInit() {
  const [step, setStep] = useState('intro');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [isGeneratingIdentity, setIsGeneratingIdentity] = useState(false);
  const [eligibilityError, setEligibilityError] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [showCommitment, setShowCommitment] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 1.5,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(3, 7, 18, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.z < 0 || p.z > 1000) p.vz *= -1;

        const scale = 1000 / (1000 + p.z);
        const size = Math.max(1, 2 * scale);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.6 * scale})`);
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleVerificationMethod = async (method) => {
    setSelectedMethod(method);
    setIsCheckingEligibility(true);
    setEligibilityError(null);

    if (method === 'Biometric') {
      window.history.pushState({}, '', '/biometric');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (method === 'DID') {
      window.history.pushState({}, '', '/did');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const maskCommitment = (commitment) => {
    if (!commitment) return '';
    return `${commitment.slice(0, 8)}...${commitment.slice(-8)}`;
  };

  const handleProceedToDashboard = () => {
    window.history.pushState({}, '', '/voter/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          zIndex: 1,
        }}
      />

      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" style={{ zIndex: 1 }} />

      <div className="relative z-10 w-full max-w-2xl px-4">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/30 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-blue-400" />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl text-white mb-6"
              >
                Your Voice Deserves a Sanctuary.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4 mb-8"
              >
                <p className="text-gray-300 text-lg">
                  In a world where every click is tracked and every choice is monitored,
                  <br />
                  your vote remains sacred.
                </p>
                <p className="text-gray-400">
                  No email. No password. No personal information. Just your voice,
                  <br />
                  cryptographically secured and completely anonymous.
                </p>
                <p className="text-blue-400">
                  Your identity stays with you. Your vote speaks for itself.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8"
              >
                <Button
                  size="lg"
                  onClick={() => setStep('verify')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 text-lg shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70 hover:scale-105"
                >
                  <Lock className="mr-2 w-5 h-5" />
                  Begin Private Session
                </Button>

                <p className="text-gray-400 text-sm mt-6 leading-relaxed">
                  By starting a session, you'll generate a one-time cryptographic identity that ensures
                  your vote is counted while keeping you completely anonymous. No traces. No tracking. Just democracy.
                </p>
              </motion.div>
            </motion.div>
          )}

          {step === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl text-white mb-4"
              >
                Enter the Sanctuary
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 mb-12"
              >
                Your identity will be protected by zero-knowledge proofs. No one—not even us—will know who you voted for.
              </motion.p>

              <AnimatePresence>
                {eligibilityError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-center gap-2 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>{eligibilityError}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-6 space-y-4"
              >
                <Button
                  size="lg"
                  onClick={() => handleVerificationMethod('DID')}
                  disabled={isCheckingEligibility}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 text-lg shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isCheckingEligibility && selectedMethod === 'DID' ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Verifying Eligibility...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                      Verify with Decentralized ID
                    </>
                  )}
                </Button>

                <Button
                  size="lg"
                  onClick={() => handleVerificationMethod('Biometric')}
                  disabled={isCheckingEligibility}
                  className="w-full bg-slate-700/50 hover:bg-slate-700/70 text-white py-6 text-lg border border-slate-600/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isCheckingEligibility && selectedMethod === 'Biometric' ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Verifying Eligibility...
                    </>
                  ) : (
                    <>
                      <Fingerprint className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                      Biometric Verification
                    </>
                  )}
                </Button>
              </motion.div>

              <Button
                variant="ghost"
                onClick={() => {
                  setStep('intro');
                  setEligibilityError(null);
                }}
                disabled={isCheckingEligibility}
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                Back to Home
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
