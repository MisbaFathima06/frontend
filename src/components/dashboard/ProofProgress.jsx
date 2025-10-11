import { CheckCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SuccessScreen from './SuccessScreen';

const ProofProgress = ({ candidate, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { label: 'Encrypting vote...', duration: 2000 },
    { label: 'Building Merkle proof...', duration: 3000 },
    { label: 'Submitting to blockchain...', duration: 2500 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowSuccess(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, steps[currentStep].duration);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  if (showSuccess) {
    return <SuccessScreen candidate={candidate} onClose={onClose} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-slate-900 rounded-3xl max-w-lg w-full border border-cyan-500/20 shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Generating Your Proof</h2>
          <p className="text-gray-400">Please wait while we process your vote</p>
        </div>

        <div className="space-y-6 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-4"
            >
              {index < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-2 rounded-full bg-green-500"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
              ) : index === currentStep ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="p-2 rounded-full bg-cyan-500"
                >
                  <Loader className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <div className="p-2 rounded-full bg-slate-700">
                  <div className="w-5 h-5" />
                </div>
              )}
              <span
                className={`text-sm font-medium ${
                  index <= currentStep ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
            >
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center gap-2 text-cyan-400"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProofProgress;
