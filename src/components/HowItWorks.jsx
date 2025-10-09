import { LogIn, UserCheck, Vote, CheckCircle } from 'lucide-react';
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

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-teal-500 to-cyan-500 hidden md:block -translate-x-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col`}
            >
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} text-center mb-8 md:mb-0`}>
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-blue-400">{step.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-lg z-10">
                <step.icon className="w-8 h-8 text-white" />
              </div>

              <div className="w-full md:w-5/12 flex justify-center md:hidden mb-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
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
