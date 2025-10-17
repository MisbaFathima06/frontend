import { motion } from "framer-motion";
import { Fingerprint, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export function BiometricScan({ onComplete }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('scanning'); // scanning, success, failed
  const [pulseRings, setPulseRings] = useState([]);

  useEffect(() => {
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate success (90% success rate)
          const success = Math.random() > 0.1;
          setScanStatus(success ? 'success' : 'failed');
          
          // Callback after animation
          setTimeout(() => {
            if (onComplete) {
              onComplete(success);
            }
          }, 1500);
          
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Generate pulse rings
    const ringsInterval = setInterval(() => {
      setPulseRings((prev) => [...prev, Date.now()]);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(ringsInterval);
    };
  }, [onComplete]);

  // Clean up old rings
  useEffect(() => {
    const cleanup = setInterval(() => {
      setPulseRings((prev) => prev.filter((time) => Date.now() - time < 3000));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden flex items-center justify-center">
      {/* Animated background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Fingerprint scanner */}
        <div className="relative w-80 h-80 flex items-center justify-center mb-12">
          {/* Pulse rings */}
          {pulseRings.map((time) => (
            <motion.div
              key={time}
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
            />
          ))}

          {/* Circular progress rings */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            {/* Background circles */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <circle
                key={i}
                cx="160"
                cy="160"
                r={140 - i * 15}
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1.5"
              />
            ))}
            
            {/* Animated progress ring */}
            <motion.circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 140}
              initial={{ strokeDashoffset: 2 * Math.PI * 140 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 140 * (1 - scanProgress / 100)
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Horizontal scan line */}
            <motion.line
              x1="40"
              x2="280"
              y1="160"
              y2="160"
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="2"
              initial={{ y1: 40, y2: 40 }}
              animate={{ 
                y1: scanStatus === 'scanning' ? [40, 280] : 160,
                y2: scanStatus === 'scanning' ? [40, 280] : 160
              }}
              transition={{ 
                duration: 2, 
                repeat: scanStatus === 'scanning' ? Infinity : 0,
                ease: "linear"
              }}
            />
          </svg>

          {/* Center icon */}
          <div className="relative z-10">
            {scanStatus === 'scanning' && (
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Fingerprint className="w-24 h-24 text-blue-400" strokeWidth={1.5} />
              </motion.div>
            )}
            
            {scanStatus === 'success' && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle2 className="w-24 h-24 text-green-400" strokeWidth={2} />
              </motion.div>
            )}
            
            {scanStatus === 'failed' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <XCircle className="w-24 h-24 text-red-400" strokeWidth={2} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Status text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {scanStatus === 'scanning' && (
            <>
              <h2 className="text-3xl text-white mb-3">Scanning biometric data</h2>
              <p className="text-blue-400 mb-4">{scanProgress}%</p>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Please hold still...</span>
              </div>
            </>
          )}
          
          {scanStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl text-white mb-3">Biometric Verified</h2>
              <p className="text-green-400">Identity confirmed successfully</p>
            </motion.div>
          )}
          
          {scanStatus === 'failed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl text-white mb-3">Verification Failed</h2>
              <p className="text-red-400">Unable to verify biometric data</p>
            </motion.div>
          )}
        </motion.div>

        {/* Progress bar */}
        {scanStatus === 'scanning' && (
          <motion.div
            className="w-64 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%]"
                animate={{ 
                  width: `${scanProgress}%`,
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  width: { duration: 0.3 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Security badge */}
        <motion.div
          className="mt-12 flex items-center gap-2 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Encrypted connection • Data not stored</span>
        </motion.div>
      </div>
    </div>
  );
}
