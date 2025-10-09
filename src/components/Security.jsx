import { Shield, GitBranch, Ban, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Security = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Zero-Knowledge Proofs',
      shortDesc: 'Prove eligibility without revealing identity',
      fullDesc: 'ZK-SNARKs allow voters to prove they are eligible to vote without revealing any personal information. The cryptographic proof verifies eligibility while maintaining complete anonymity.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: GitBranch,
      title: 'Merkle Trees',
      shortDesc: 'Efficient verification of large datasets',
      fullDesc: 'Merkle Trees enable efficient and secure verification of vote integrity. Each vote is hashed and combined into a tree structure, making tampering mathematically impossible to hide.',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: Ban,
      title: 'Nullifiers',
      shortDesc: 'Prevent double-voting without tracking identity',
      fullDesc: 'Unique nullifiers are generated for each vote to prevent double-voting. These one-time tokens ensure each person votes only once, without linking the vote to their identity.',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <section id="security" className="py-20 bg-slate-800 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-blue-400 mb-4">
            <Shield className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">ADVANCED CRYPTOGRAPHY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built with Military-Grade Security
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Understanding the technology that keeps your vote secure and anonymous
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative glass-morphism rounded-2xl p-8 hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.shortDesc}</p>
              
              <button
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                onMouseEnter={() => setActiveTooltip(index)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <Info className="w-4 h-4" />
                <span className="text-sm">Learn more</span>
              </button>

              {activeTooltip === index && (
                <div className="absolute z-20 top-full left-0 right-0 mt-2 p-4 bg-slate-900 rounded-lg shadow-xl border border-slate-700">
                  <p className="text-sm text-gray-300">{feature.fullDesc}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-morphism rounded-2xl p-8 bg-gradient-to-r from-blue-500/10 to-teal-500/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Security Audited & Verified</h3>
              <p className="text-gray-400">
                Our system has been independently audited by leading cybersecurity firms and cryptography experts.
              </p>
            </div>
            <button className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
              View Audit Report
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
