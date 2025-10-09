import { Shield, Lock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TrustFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Shield,
      title: 'Complete Anonymity',
      description: 'No personal data stored. Your identity is protected by zero-knowledge cryptography.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Lock,
      title: 'Tamper-Proof',
      description: 'Blockchain-backed integrity ensures your vote cannot be altered or manipulated.',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: Globe,
      title: 'Global Voting',
      description: 'Transparent and accurate counting with real-time blockchain verification.',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Trust SecureVote?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built on cutting-edge cryptography and blockchain technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative glass-morphism rounded-2xl p-8 hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:shadow-lg transition-shadow`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustFeatures;
