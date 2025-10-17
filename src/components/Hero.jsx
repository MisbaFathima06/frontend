import { ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';

const EnhanceHero3D = lazy(() => import('./EnhanceHero3D'));

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[url('/page-1.png')] bg-cover bg-center bg-no-repeat">
      {/* Dark overlay for readability */}
 <div className="absolute inset-0 bg-white/90 backdrop-blur-sm -z-10" />
      {/* Optional gradient overlay */}
      <div className="absolute inset-0 gradient-bg -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-white/10 rounded-full backdrop-blur-sm">
            <Shield className="w-12 h-12 text-white animate-float" />
          </div>
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-white block mb-2">Your Voice</span>
          <span className="text-white block mb-2">Your Power</span>
          <span className="text-gradient block text-2xl md:text-3xl lg:text-4xl">Secured by Cryptography</span>

        </motion.h1>

        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="text-xs md:text-sm text-gray-300 mb-4 max-w-xl mx-auto leading-tight space-y-0.5"
>
  <p>Your voice matters.</p>
  <p>Completely transparent, completely safe.</p>
  <p>Share your choice — it’s yours and only yours.</p>
</motion.div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => {
              window.history.pushState({}, '', '/voter/auth');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] w-full sm:w-auto min-h-[56px] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            aria-label="Voter Login / Start Voting"
          >
            <span className="flex items-center justify-center gap-3">
              🗳️ Voter Login / Start Voting
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              window.history.pushState({}, '', '/admin/auth');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="group relative px-10 py-5 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(71,85,105,0.6)] w-full sm:w-auto min-h-[56px] focus:outline-none focus:ring-4 focus:ring-slate-500/50"
            aria-label="Admin Login"
          >
            <span className="flex items-center justify-center gap-3">
              🔑 Admin Login
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <Suspense fallback={<div className="h-64 bg-gray-900/20 rounded-2xl animate-pulse" />}>
            <EnhanceHero3D />
          </Suspense>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Shield className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
};

export default Hero;
