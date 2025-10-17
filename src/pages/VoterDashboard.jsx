import { motion } from "framer-motion";
import { Shield, LogOut, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useEffect, useRef } from "react";

export default function VoterDashboard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 1.5,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(3, 7, 18, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.z < 0 || p.z > 1000) p.vz *= -1;

        const scale = 1000 / (1000 + p.z);
        const size = Math.max(1, 2 * scale);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.6 * scale})`);
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
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

  const candidates = [];

  const maskCommitment = (commitment) => {
    if (!commitment) return "0x8a35...c79d";
    return `0x${commitment.slice(0, 4)}...${commitment.slice(-4)}`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          zIndex: 1,
        }}
      />

      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" style={{ zIndex: 1 }} />

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-50 flex items-center justify-between px-8 py-6 border-b border-slate-800/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 text-white">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-lg">Cast Your Vote</span>
        </div>

        <Button
          variant="ghost"
          onClick={() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="text-gray-400 hover:text-white hover:bg-white/5"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </motion.nav>

      <div className="relative z-10 px-8 py-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-5xl text-white mb-4">
            Your Voice. Your Vote. Your Power.
          </h1>
          <p className="text-gray-400 text-lg">
            Select your candidate. Your choice is completely anonymous and verifiable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg mb-2">ZK Identity Active</h3>
              <p className="text-gray-400 text-sm mb-3">
                Your anonymous identity is secured and ready for voting
              </p>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3">
                <p className="text-blue-400 font-mono text-sm">
                  {maskCommitment(null)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12"
        >
          {candidates.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-slate-700/30 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-gray-500" strokeWidth={1.5} />
                </div>
              </motion.div>
              <h3 className="text-2xl text-white mb-3">
                No candidates available at this time
              </h3>
              <p className="text-gray-500">
                Please check back later when voting is active
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {candidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-white">{candidate.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl text-white mb-1">{candidate.name}</h4>
                      <p className="text-gray-400 text-sm">{candidate.party}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                    >
                      Select
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
