import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const MetricsRow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const metrics = [
    {
      value: '100%',
      label: 'Anonymous',
      description: 'Your identity never revealed',
    },
    {
      value: '\u221e',
      label: 'Tamper-Proof',
      description: 'Cryptographic verification on blockchain',
    },
    {
      value: '0',
      label: 'Zero Gas Fees',
      description: 'Free voting for everyone',
    },
  ];

  return (
    <section ref={ref} className="py-12 bg-slate-800 border-y border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center group"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2"
              >
                {metric.value}
              </motion.div>
              <div className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {metric.label}
              </div>
              <div className="text-sm text-gray-400">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsRow;
