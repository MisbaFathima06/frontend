import { Activity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const LiveResultsPanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const results = [
    { name: 'Alexandra Chen', votes: 342, percentage: 35, color: 'from-blue-500 to-blue-600' },
    { name: 'Marcus Johnson', votes: 298, percentage: 30, color: 'from-teal-500 to-teal-600' },
    { name: 'Priya Sharma', votes: 245, percentage: 25, color: 'from-cyan-500 to-cyan-600' },
    { name: 'Robert Martinez', votes: 98, percentage: 10, color: 'from-green-500 to-green-600' },
  ];

  const recentEvents = [
    { time: '14:32', event: 'Vote recorded', tx: '0x3f4a...' },
    { time: '14:31', event: 'Proof verified', tx: '0x8b2c...' },
    { time: '14:29', event: 'Vote recorded', tx: '0x7e4d...' },
    { time: '14:27', event: 'Proof verified', tx: '0x2a1f...' },
  ];

  return (
    <section ref={ref} className="py-12 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-morphism rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Live Results</h3>
            </div>

            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={result.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{result.name}</span>
                    <span className="text-sm text-gray-400">{result.votes} votes ({result.percentage}%)</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${result.percentage}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${result.color} relative`}
                    >
                      <motion.div
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-morphism rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
            </div>

            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 glass-morphism rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div>
                      <span className="text-sm text-white font-medium">{event.event}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{event.time}</span>
                        <code className="text-xs text-cyan-400 font-mono">[tx: {event.tx}]</code>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveResultsPanel;
