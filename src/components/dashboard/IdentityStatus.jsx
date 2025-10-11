import { CheckCircle, Download, Upload, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const IdentityStatus = () => {
  const [copied, setCopied] = useState(false);
  const commitment = "0x3f4a7b2c8d1e9f5a6b3c8d2e9f4a7b2c";

  const handleCopy = () => {
    navigator.clipboard.writeText(commitment);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const data = { commitment, timestamp: Date.now() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'identity.json';
    a.click();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            console.log('Imported identity:', data);
          } catch (error) {
            console.error('Invalid identity file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-morphism rounded-2xl p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(6,182,212,0.3)",
                "0 0 30px rgba(6,182,212,0.6)",
                "0 0 20px rgba(6,182,212,0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="p-3 rounded-full bg-gradient-to-br from-green-500 to-green-600"
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Identity Active</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-400">Commitment:</span>
              <code className="text-sm text-cyan-400 font-mono">
                {commitment.slice(0, 10)}...{commitment.slice(-8)}
              </code>
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
                aria-label="Copy commitment"
              >
                <Copy className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-green-400"
              >
                Copied to clipboard!
              </motion.span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 glass-morphism hover:bg-cyan-500/20 text-cyan-400 font-semibold rounded-lg transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Export Identity
          </button>
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-4 py-2 glass-morphism hover:bg-blue-500/20 text-blue-400 font-semibold rounded-lg transition-all hover:scale-105"
          >
            <Upload className="w-4 h-4" />
            Import Identity
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default IdentityStatus;
