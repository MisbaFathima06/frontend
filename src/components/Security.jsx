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
      fullDesc: 'Voters confirm eligibility with ZK Proofs—completely anonymous.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: GitBranch,
      title: 'Merkle Trees',
      shortDesc: 'Quickly verify votes without compromise',
      fullDesc: 'Merkle Trees ensure tamper-proof verification of all votes ',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: Ban,
      title: 'Nullifiers',
      shortDesc: 'Prevent double-voting without tracking identity',
      fullDesc: 'Unique nullifiers guarantee one vote per voter, anonymously',
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
            Learn how cutting-edge cryptography keeps your vote secure and anonymous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative glass-morphism rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
            >
              {/* Animated SVG background */}
              <div className="absolute inset-0 opacity-10 overflow-hidden rounded-2xl">
                {index === 0 && (
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="80"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-blue-500"
                      initial={{ pathLength: 0, rotate: 0 }}
                      animate={isInView ? { pathLength: 1, rotate: 360 } : {}}
                      transition={{ duration: 2, delay: index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-blue-400"
                      initial={{ pathLength: 0, rotate: 180 }}
                      animate={isInView ? { pathLength: 1, rotate: -180 } : {}}
                      transition={{ duration: 2, delay: index * 0.2 + 0.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <motion.path
                      d="M 100 20 L 100 180 M 20 100 L 180 100"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-teal-500"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                      transition={{ duration: 1.5, delay: index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <motion.path
                      d="M 50 50 L 50 150 L 150 150 L 150 50 Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-teal-400"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: index * 0.2 + 0.3, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-cyan-500"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <motion.line
                      x1="100"
                      y1="30"
                      x2="100"
                      y2="170"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-cyan-400"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.5, delay: index * 0.2 + 0.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </svg>
                )}
              </div>

              {/* Icon with animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3, type: "spring" }}
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 relative z-10`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-20 top-full left-0 right-0 mt-2 p-4 bg-slate-900 rounded-lg shadow-xl border border-slate-700"
                >
                  <p className="text-sm text-gray-300">{feature.fullDesc}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-morphism rounded-2xl p-8 bg-gradient-to-r from-blue-500/10 to-teal-500/10 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Audited & Verified</h3>
              <p className="text-gray-400">
                Independent audits confirm vote security and privacy.
              </p>
            </div>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
              <span className="relative z-10 flex items-center gap-2">
                View Audit Report
                <Shield className="w-5 h-5" />
              </span>
              {/* Glowing animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 blur-xl opacity-50 group-hover:opacity-100 transition-opacity -z-10" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 opacity-0 group-hover:opacity-50"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
