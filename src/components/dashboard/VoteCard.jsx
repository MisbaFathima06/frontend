import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VoteCard = ({ candidate, onSelect, isSelected }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(6,182,212,0.4)" }}
      className={`relative glass-morphism rounded-2xl p-6 cursor-pointer transition-all ${
        isSelected ? 'ring-4 ring-cyan-500 shadow-2xl shadow-cyan-500/50' : ''
      }`}
      onClick={() => onSelect(candidate)}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-cyan-500 rounded-full p-2 shadow-lg z-10"
        >
          <CheckCircle className="w-6 h-6 text-white" />
        </motion.div>
      )}

      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
      </div>

      <h3 className="text-2xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors">
        {candidate.name}
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-cyan-400">◆</span>
        <span className="text-sm text-gray-400 font-medium">{candidate.party}</span>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {candidate.bio}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(candidate);
        }}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        Select Candidate
      </button>
    </motion.div>
  );
};

export default VoteCard;
