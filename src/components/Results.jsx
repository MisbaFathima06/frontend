import { TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Results = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const results = [
    { name: 'Aarav Mehta', party: "People's Party", votes: 3420, percentage: 34, color: 'bg-blue-500' },
    { name: 'Sara Nair', party: 'People’s Alliance', votes: 2890, percentage: 29, color: 'bg-teal-500' },
    { name: 'Imran Qureshi', party: 'Innovation Party', votes: 2150, percentage: 21, color: 'bg-cyan-500' },
    { name: 'Meera Das', party: 'Unity Front', votes: 1540, percentage: 16, color: 'bg-indigo-500' },
  ];

  const blockchainEvents = [
    { id: '0x7f3a...b2c1', action: 'Vote Cast', timestamp: '2 min ago', status: 'Confirmed' },
    { id: '0x9e2d...8f4a', action: 'Vote Cast', timestamp: '3 min ago', status: 'Confirmed' },
    { id: '0x4b1c...5d7e', action: 'Vote Cast', timestamp: '5 min ago', status: 'Confirmed' },
    { id: '0x2a8f...9c3b', action: 'Vote Cast', timestamp: '7 min ago', status: 'Confirmed' },
  ];

  return (
    <section id="results" className="py-20 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-green-400 mb-4">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">LIVE RESULTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Current Vote Standings
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-time results verified securely on the blockchain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Vote distribution chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, type: "spring" }}
              className="glass-morphism rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Vote Distribution</h3>
              <div className="space-y-6">
                {results.map((result, index) => (
                  <motion.div
                    key={result.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{result.name}</h4>
                        <p className="text-sm text-gray-400">{result.party}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{result.percentage}%</p>
                        <p className="text-sm text-gray-400">{result.votes.toLocaleString()} votes</p>
                      </div>
                    </div>
                    
                    <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${result.percentage}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className={`h-full ${result.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Votes Cast</span>
                  <span className="text-2xl font-bold text-white">
                    {results.reduce((acc, r) => acc + r.votes, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Blockchain event log */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="glass-morphism rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-bold text-white">Blockchain Event Log</h3>
              </div>
              
              <div className="space-y-4">
                {blockchainEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <code className="text-sm text-blue-400">{event.id}</code>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{event.action}</span>
                      <span className="text-gray-500">{event.timestamp}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Live updates active</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Results;
