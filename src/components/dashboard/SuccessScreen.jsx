import { CheckCircle, Download, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SuccessScreen = ({ candidate, onClose }) => {
  const receiptId = `null-0x${Math.random().toString(16).slice(2, 18)}`;

  const handleDownloadReceipt = () => {
    const receipt = {
      candidateName: candidate.name,
      timestamp: new Date().toISOString(),
      receiptId: receiptId,
      status: 'confirmed'
    };
    const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vote-receipt-${Date.now()}.json`;
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative bg-slate-900 rounded-3xl max-w-lg w-full border border-cyan-500/20 shadow-2xl p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass-morphism hover:bg-slate-700 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-6 relative"
          >
            <CheckCircle className="w-12 h-12 text-white" />
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute inset-0 rounded-full bg-green-500"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Vote Submitted Successfully!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-400 mb-8"
          >
            Your voice has been counted
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-morphism rounded-2xl p-6 mb-6 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Candidate</span>
              <span className="text-white font-semibold">{candidate.name}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Receipt ID</span>
              <code className="text-xs text-cyan-400 font-mono">
                {receiptId.slice(0, 16)}...
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Status</span>
              <span className="flex items-center gap-2 text-green-400 font-semibold">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Confirmed
              </span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 glass-morphism hover:bg-cyan-500/20 text-cyan-400 font-semibold rounded-lg transition-all mb-4 hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xs text-gray-500"
          >
            Keep this receipt for verification
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessScreen;
