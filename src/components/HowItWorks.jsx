import { LogIn, UserCheck, Vote, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      icon: LogIn,
      step: 'STEP 1',
      title: 'Session Setup',
      description: 'Log in with your email or Google account. This is only for session management and is never linked to your vote.',
    },
    {
      icon: UserCheck,
      step: 'STEP 2',
      title: 'Anonymous Identity Creation',
      description: 'We generate a cryptographic Zero-Knowledge identity that proves you\'re eligible without revealing who you are.',
    },
    {
      icon: Vote,
      step: 'STEP 3',
      title: 'Secure Vote Casting',
      description: 'Select your candidate and submit. Your vote is encrypted, verified, and recorded on the blockchain anonymously.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-800 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to cast your secure, anonymous vote
          </p>
        </motion.div>

        <div className="relative overflow-x-auto pb-8">
          {/* Horizontal connecting line */}
          <div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 hidden lg:block" />
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8 min-w-full">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative flex-1 max-w-sm"
              >
                {/* Animated icon circle */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.3 + 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-2xl relative z-10"
                >
                  <step.icon className="w-10 h-10 text-white" />
                  
                  {/* Pulsing ring animation */}
                  <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
                </motion.div>

                {/* Step label */}
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    {step.step}
                  </span>
                </div>

                {/* Content card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
                  className="glass-morphism rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>

                {/* Connecting arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-32 -right-12 w-24 h-1">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 origin-left"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.3 + 1 }}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 text-cyan-400"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
            <CheckCircle className="w-5 h-5" />
            Ready to vote? Get started now!
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
