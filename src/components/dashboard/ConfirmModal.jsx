import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ProofProgress from './ProofProgress';

const ConfirmModal = ({ candidate, onClose }) => {
  const [showProofProgress, setShowProofProgress] = useState(false);

  const handleConfirm = () => {
    setShowProofProgress(true);
  };

  if (showProofProgress) {
    return <ProofProgress candidate={candidate} onClose={onClose} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative bg-slate-900 rounded-3xl max-w-lg w-full border border-cyan-500/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-morphism hover:bg-slate-700 transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="p-8">
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex p-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mb-4"
              >
                <AlertCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Confirm Your Vote</h2>
              <p className="text-gray-400">Please review your selection carefully</p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{candidate.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">◆</span>
                    <span className="text-sm text-gray-400">{candidate.party}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-xl p-4 mb-6 bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-sm text-gray-300 leading-relaxed">
                Your vote will be encrypted locally on your device before submission.
                Your identity will never be revealed.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 glass-morphism hover:bg-slate-800 text-gray-300 font-semibold rounded-lg transition-all"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
