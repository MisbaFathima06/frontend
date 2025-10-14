import { Users, Wifi, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const RuralEmpowerment = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: Shield,
      title: 'Fully Anonymous',
      description: 'Your identity is never revealed; votes are private and secure.',
    },
    {
      icon: Wifi,
      title: 'Lightweight Verification',
      description: 'ZK Proofs are generated locally, keeping the process fast and efficient.',
    },
    {
      icon: Users,
      title: 'Inclusive & Accessible',
      description: 'No wallet setup or gas fees—anyone can vote safely from any device.',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 bg-slate-800 overflow-hidden">
      {/* Background Images & Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: 'url(/image.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Panel: Text + Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Empowering Every Voice
            </h2>
            <h3 className="text-2xl text-cyan-400 mb-6">
              Secure, Anonymous & Easy Voting
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
  <ul className="list-disc list-inside space-y-2">
    <li><strong>No Crypto Wallet Required:</strong> Users can vote without setting up any crypto wallets.</li>
    <li><strong>No Gas Fees:</strong> Voting is free for everyone—our system handles blockchain costs.</li>
    <li><strong>No Personal Data Collected:</strong> Your identity stays private and anonymous.</li>
    <li><strong>Lightweight Zero-Knowledge Proofs:</strong> Proofs are generated locally, ensuring fast and secure verification even on low-bandwidth connections.</li>
  </ul>
</p>


            {/* Feature Cards */}
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

          {/* Right Panel: Highlight Number Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
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
                No internet? No crypto experience? No problem. Our web-based platform ensures that anyone, anywhere, can vote securely and anonymously.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default RuralEmpowerment;
