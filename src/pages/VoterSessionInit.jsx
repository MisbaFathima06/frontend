<<<<<<< HEAD
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
=======
import { motion } from "framer-motion";
import { CheckCircle2, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

export function IdentitySecured({ identity, onProceed }) {
  const canvasRef = useRef(null);

  // Animated background
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

  const maskCommitment = (commitment) => {
    if (!commitment) return "0x8a35...c79d";
    return `0x${commitment.slice(0, 4)}...${commitment.slice(-4)}`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden flex items-center justify-center">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
>>>>>>> ee26865 (Wire Biometric/DID pages, fix imports (framer-motion), normalize exports, add routes, image refs)

      {/* Grid overlay */}
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

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border-2 border-green-500/40 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-14 h-14 text-green-400" strokeWidth={2} />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl text-white mb-4"
          >
            Identity Secured.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg mb-12"
          >
            You are now a one-time, untraceable voter.
          </motion.p>

          {/* ZK Commitment Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8"
          >
            {/* Commitment section */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-3">Your ZK Commitment</p>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                <p className="text-blue-400 font-mono text-lg">
                  {maskCommitment(identity?.commitment)}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* 100% Anonymous */}
              <div className="text-center">
                <div className="text-4xl text-white mb-1">100%</div>
                <div className="text-gray-400 text-sm">Anonymous</div>
              </div>

<<<<<<< HEAD
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
=======
              {/* 0 Data Stored */}
              <div className="text-center border-x border-slate-700/50">
                <div className="text-4xl text-white mb-1">0</div>
                <div className="text-gray-400 text-sm">Data Stored</div>
              </div>
>>>>>>> ee26865 (Wire Biometric/DID pages, fix imports (framer-motion), normalize exports, add routes, image refs)

              {/* 1x Vote Only */}
              <div className="text-center">
                <div className="text-4xl text-white mb-1">1×</div>
                <div className="text-gray-400 text-sm">Vote Only</div>
              </div>
            </div>
          </motion.div>

          {/* Cast Vote Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-6"
          >
            <Button
              size="lg"
              onClick={onProceed}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-10 py-6 text-lg shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70 hover:scale-105"
            >
              <Shield className="mr-2 w-5 h-5" />
              Cast Your Anonymous Vote
            </Button>
          </motion.div>

          {/* Session Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-500 text-sm"
          >
            Your session is active for this voting round only
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
<<<<<<< HEAD

export default function VoterSessionInit() {
  return <VoterSessionInitContent />;
}
=======
>>>>>>> ee26865 (Wire Biometric/DID pages, fix imports (framer-motion), normalize exports, add routes, image refs)
