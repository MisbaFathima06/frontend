import { Shield, Eye, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WhyTrust = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Shield,
      title: 'Zero-Knowledge Proofs',
      description: 'Every vote protected by zero-knowledge proofs',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Eye,
      title: 'Transparent & Auditable',
      description: 'Open-source code, public verification',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: FileCheck,
      title: 'Proven Technology',
      description: 'Built on battle-tested cryptography standards',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{ backgroundImage: 'url(/image.png)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Trust This System?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built on cutting-edge cryptography for absolute security
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative glass-morphism rounded-2xl p-8 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={isInView ? { rotate: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:shadow-2xl transition-all duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 -z-10"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrust;
