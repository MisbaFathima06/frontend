import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, XCircle, Loader2, Scan } from "lucide-react";
import { useState, useEffect } from "react";

export default function DIDScan() {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('scanning');
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const success = Math.random() > 0.1;
          setScanStatus(success ? 'success' : 'failed');

          setTimeout(() => {
            if (success) {
              window.history.pushState({}, '', '/voter/dashboard');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }, 1500);

          return 100;
        }
        return prev + 2;
      });
    }, 60);

    const scanInterval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

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

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <div className="relative mb-12">
          <motion.div
            className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: scanStatus === 'scanning' ? Infinity : 0,
              ease: "easeInOut"
            }}
          />

          <div className="relative w-[400px] h-[250px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-12 h-12 border border-blue-400 rounded-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border border-cyan-400 rounded" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-blue-400 rounded-full" />
            </div>

            {scanStatus === 'scanning' && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                style={{ top: `${scanLine}%` }}
              />
            )}

            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400" />

            <div className="relative h-full flex items-center justify-center p-8">
              <div className="flex gap-6 items-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-slate-700/50 border-2 border-blue-500/30 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
                    <CreditCard className="w-12 h-12 text-blue-400/50" />
                  </div>
                  {scanStatus === 'success' && (
                    <motion.div
                      className="absolute -top-2 -right-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-400 bg-slate-900 rounded-full" />
                    </motion.div>
                  )}
                  {scanStatus === 'failed' && (
                    <motion.div
                      className="absolute -top-2 -right-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <XCircle className="w-8 h-8 text-red-400 bg-slate-900 rounded-full" />
                    </motion.div>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-slate-700/50 rounded w-32" />
                  <div className="h-3 bg-slate-700/30 rounded w-24" />
                  <div className="h-3 bg-slate-700/30 rounded w-28" />
                  <div className="space-y-1 mt-4">
                    <div className="h-2 bg-slate-700/20 rounded w-full" />
                    <div className="h-2 bg-slate-700/20 rounded w-3/4" />
                  </div>
                </div>
              </div>
            </div>

            {scanStatus === 'scanning' && (
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/5 to-blue-500/0" />
            )}
          </div>

          {scanStatus === 'scanning' && (
            <motion.div
              className="absolute -right-16 top-1/2 -translate-y-1/2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Scan className="w-12 h-12 text-blue-400" />
            </motion.div>
          )}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {scanStatus === 'scanning' && (
            <>
              <h2 className="text-3xl text-white mb-3">Scanning Digital ID</h2>
              <p className="text-blue-400 mb-4">Verifying credentials... {scanProgress}%</p>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Reading document information...</span>
              </div>
            </>
          )}

          {scanStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl text-white mb-3">ID Verified</h2>
              <p className="text-green-400">Digital credentials confirmed</p>
            </motion.div>
          )}

          {scanStatus === 'failed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl text-white mb-3">Verification Failed</h2>
              <p className="text-red-400">Unable to verify digital ID</p>
            </motion.div>
          )}
        </motion.div>

        {scanStatus === 'scanning' && (
          <motion.div
            className="w-96 mt-8"
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

        {scanStatus === 'scanning' && (
          <motion.div
            className="mt-8 grid grid-cols-3 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3">
              <div className="text-blue-400 text-xs mb-1">Reading</div>
              <div className="text-white text-sm">Photo</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3">
              <div className="text-blue-400 text-xs mb-1">Extracting</div>
              <div className="text-white text-sm">Data</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3">
              <div className="text-blue-400 text-xs mb-1">Validating</div>
              <div className="text-white text-sm">Signature</div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-12 flex items-center gap-2 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Secure document verification • ISO/IEC 27001 compliant</span>
        </motion.div>
      </div>
    </div>
  );
}
