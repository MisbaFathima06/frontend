import { motion } from "framer-motion";
import { Shield, Infinity, Users, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

export function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    // Create 3D particle network
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(3, 7, 18, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.z < 0 || p.z > 1000) p.vz *= -1;

        // 3D projection
        const scale = 1000 / (1000 + p.z);
        const x2d = p.x;
        const y2d = p.y;
        const size = Math.max(1, 3 * scale);

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 3);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.8 * scale})`);
        gradient.addColorStop(0.5, `rgba(37, 99, 235, ${0.4 * scale})`);
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dz = p.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.3 * scale;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          zIndex: 1,
        }}
      />

      {/* Gradient Orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" style={{ zIndex: 1 }} />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 flex items-center justify-between px-8 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-white tracking-tight">SecureVote</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#howitworks" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#candidates" className="text-gray-300 hover:text-white transition-colors">
            Candidates
          </a>
          <a href="#security" className="text-gray-300 hover:text-white transition-colors">
            Security
          </a>
          <a href="#results" className="text-gray-300 hover:text-white transition-colors">
            Results
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            Admin Access
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70 hover:scale-105">
            Login
          </Button>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Main Heading */}
          <h1 className="text-7xl md:text-8xl text-white mb-4 tracking-tight">
            Your Voice
          </h1>
          <h1 className="text-7xl md:text-8xl text-white mb-8 tracking-tight">
            Your Power
          </h1>

          {/* Subheading with gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-2xl md:text-3xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Secured by Cryptography
            </h2>
          </motion.div>

<<<<<<< HEAD
          <button
            onClick={() => {
              window.history.pushState({}, '', '/admin/login');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="group relative px-10 py-5 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(71,85,105,0.6)] w-full sm:w-auto min-h-[56px] focus:outline-none focus:ring-4 focus:ring-slate-500/50"
            aria-label="Admin Login"
=======
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed"
>>>>>>> ee26865 (Wire Biometric/DID pages, fix imports (framer-motion), normalize exports, add routes, image refs)
          >
            Your voice matters.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Completely transparent, completely safe.
            <br />
            Share your choice — it's yours and only yours.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-6 text-lg shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70 hover:scale-105 group"
            >
              Start Voting Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-500/50 text-white hover:bg-blue-500/10 hover:border-blue-400 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Voter Login
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl w-full px-4"
        >
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl text-white mb-3">100%</h3>
              <h4 className="text-blue-400 mb-2">Fully Anonymous</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your vote stays private—no one can trace it back to you.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/50">
                <Infinity className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl text-white mb-3">∞</h3>
              <h4 className="text-cyan-400 mb-2">Tamper-Proof</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Safely vote from anywhere. No one can alter your choice.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl text-white mb-3">0</h3>
              <h4 className="text-blue-400 mb-2">Free for All</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                No barriers—just honest votes and fair results.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 backdrop-blur-sm"
        >
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">
            End-to-end encrypted • Zero-knowledge proofs • Blockchain verified
          </span>
        </motion.div>
      </div>
    </div>
  );
}
