import { Users, CheckCircle, X, Award, Briefcase, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Candidates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const candidates = [
  {
    id: 1,
    name: 'Aarav Mehta',
    party: "People's Party",
    image: '/candidate1.png',
    bio: 'Focused on youth development and modern education policies.',
    fullBio:
      'Aarav believes in a strong education system and creating more opportunities for young people. His goal is to prepare the next generation for leadership through innovation and learning.',
    achievements: [
      'Introduced youth mentorship programs',
      'Improved digital learning access',
      'Supported new education reforms'
    ],
    vision:
      'A future where education empowers every child to become a confident leader.'
  },
  {
    id: 2,
    name: 'Sara Nair',
    party: 'People’s Alliance',
    image: '/candidate2.png',
    bio: 'Committed to healthcare and social equality for all citizens.',
    fullBio:
      'Sara has worked for years to improve healthcare systems and women’s welfare. She believes that every person deserves access to affordable, quality healthcare and a safe society.',
    achievements: [
      'Built health awareness campaigns',
      'Supported women empowerment drives',
      'Improved rural medical access'
    ],
    vision:
      'To build a healthy, safe, and equal society for everyone.'
  },
  {
    id: 3,
    name: 'Imran Qureshi',
    party: 'Innovation Party',
    image: '/candidate3.png',
    bio: 'Advocates for digital transparency and technology-driven governance.',
    fullBio:
      'Imran aims to make government processes transparent and corruption-free using modern technology. He focuses on using blockchain, AI, and digital tools to make systems faster and fairer.',
    achievements: [
      'Launched e-governance projects',
      'Introduced tech literacy workshops',
      'Created digital complaint systems'
    ],
    vision:
      'To bring innovation and honesty together for a stronger, smarter future.'
  },
  {
    id: 4,
    name: 'Meera Das',
    party: 'Unity Front',
    image: '/candidate4.png',
    bio: "Works for women’s rights, equality, and inclusive growth.",
    fullBio:
      'Meera stands for fairness, inclusion, and community growth. She works to ensure women have equal access to opportunities and that social programs reach every part of society.',
    achievements: [
      'Founded community training centers',
      'Started equality awareness campaigns',
      'Introduced inclusive education policies'
    ],
    vision:
      'To build a united society where equality and respect guide every decision.'
  }
];


  return (
    <section id="candidates" className="py-20 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-teal-400 mb-4">
            <Users className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">MEET THE CANDIDATES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the Voices Shaping Tomorrow
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover their dreams, ideas, and the impact they want to make.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(candidate.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                selectedCandidate === candidate.id ? 'ring-4 ring-blue-500 shadow-2xl shadow-blue-500/50' : 'hover:shadow-2xl'
              }`}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative glass-morphism p-6">
                {/* Image with hover reveal */}
                <div className="relative mb-6">
                  <div className="w-full h-64 rounded-xl overflow-hidden">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover overlay with "View Details" */}
                    <div className={`absolute inset-0 bg-black/70 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredCard === candidate.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <button
                        onClick={() => setOpenModal(candidate)}
                        className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        Discover Their Story
                      </button>
                    </div>
                  </div>
                  {selectedCandidate === candidate.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2 shadow-lg"
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {candidate.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-400">◆</span>
                      <span className="text-sm text-gray-400 font-medium">{candidate.party}</span>
                    </div>
                  </div>
                  
                  {/* Bio with reveal animation */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {candidate.bio}
                  </p>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setSelectedCandidate(candidate.id)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Select Candidate
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setOpenModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setOpenModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors z-10"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Modal content */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="w-full md:w-1/3">
                      <img
                        src={openModal.image}
                        alt={openModal.name}
                        className="w-full rounded-2xl shadow-2xl"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-4xl font-bold text-white mb-3">{openModal.name}</h2>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-blue-400">◆</span>
                        <span className="text-gray-400 font-medium">{openModal.party}</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{openModal.fullBio}</p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-6 h-6 text-teal-400" />
                      <h3 className="text-2xl font-bold text-white">Key Achievements</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {openModal.achievements.map((achievement, idx) => (
                        <div key={idx} className="glass-morphism rounded-xl p-4 text-center">
                          <p className="text-sm text-gray-300">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="w-6 h-6 text-blue-400" />
                      <h3 className="text-2xl font-bold text-white">Vision</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-xl p-6">
                      {openModal.vision}
                    </p>
                  </div>

                  {/* Vote button */}
                  <button
                    onClick={() => {
                      setSelectedCandidate(openModal.id);
                      setOpenModal(null);
                    }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    Support {openModal.name}'s Vision
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Candidates;
