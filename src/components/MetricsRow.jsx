import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const MetricsRow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const metrics = [
    {
      value: '100%',
      label: 'Fully Anonymous',
      description: 'Your vote stays private—no one can trace it back to you.'
    },
    {
      value: '∞',
      label: 'Tamper-Proof',
      description: 'Every vote is secure and verified, so the results are trustworthy.'
    },
    {
      value: '0',
      label: 'Free for All',
      description: 'No fees—everyone can vote easily and safely.'
    },
  ];

  return (
    <section ref={ref} className="py-12 bg-slate-800 border-y border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Emotional intro text */}
        <h1 className="text-5xl font-bold text-white text-center mb-4">
  Your vote matters.
</h1>
<p className="text-center text-gray-300 mb-8 text-lg">
  Experience secure, anonymous, and effortless voting.
</p>


        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center group"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
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
