import { Users, Wifi, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const RuralEmpowerment = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: Wifi,
      title: 'Low-Bandwidth Mode',
      description: 'Optimized for 2G/3G networks',
    },
    {
      icon: MessageSquare,
      title: 'SMS Voting',
      description: 'Vote via simple text message',
    },
    {
      icon: Users,
      title: 'Community Centers',
      description: 'Offline voting hubs',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 bg-slate-800 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: 'url(/image.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Empowering Every Voice
            </h2>
            <h3 className="text-2xl text-cyan-400 mb-6">
              From Cities to Villages
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Even in rural areas with limited access, our system ensures secure and anonymous voting
              through low-bandwidth verification and lightweight proof generation.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-center gap-4 glass-morphism rounded-xl p-4"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-morphism rounded-3xl p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                  100%
                </div>
                <div className="text-xl text-gray-300">Inclusive Access</div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                No internet? No smartphone? No problem. Our multi-channel voting system
                ensures everyone can participate in democracy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RuralEmpowerment;
