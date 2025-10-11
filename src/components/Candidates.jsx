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
      name: 'Alexandra Chen',
      party: 'Progressive Alliance',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'Former environmental scientist with 15 years of experience in sustainable policy development.',
      fullBio: 'Alexandra Chen brings 15 years of environmental science expertise to public service. Her work in sustainable policy development has led to groundbreaking initiatives in climate action and renewable energy. She advocates for equitable economic growth that doesn\'t compromise our planet\'s future.',
      achievements: ['Led 50+ sustainability projects', 'Published climate research', 'Award-winning policy maker'],
      vision: 'Building a sustainable future where economic growth and environmental protection go hand in hand.'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      party: 'Unity Coalition',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
      bio: 'Experienced civil rights attorney and community organizer.',
      fullBio: 'Marcus Johnson has dedicated his career to fighting for social justice and equality. As a civil rights attorney, he has successfully represented countless communities in their fight for fair treatment. His grassroots organizing has brought together diverse groups to create lasting change.',
      achievements: ['Won 100+ civil rights cases', 'Founded 3 community centers', 'Healthcare reform advocate'],
      vision: 'Creating a society where justice, healthcare, and education are accessible to all, regardless of background.'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      party: 'Innovation Party',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Tech entrepreneur and former city council member.',
      fullBio: 'Priya Sharma combines technological innovation with public service experience. As a successful tech entrepreneur, she understands how to leverage technology for social good. Her tenure on city council modernized public services and supported small businesses.',
      achievements: ['Built 2 successful startups', 'Digital infrastructure pioneer', 'Small business champion'],
      vision: 'Modernizing public services through technology while ensuring no one is left behind in the digital age.'
    },
    {
      id: 4,
      name: 'Robert Martinez',
      party: 'People First Movement',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Veteran educator and labor union leader.',
      fullBio: 'Robert Martinez has spent 20 years fighting for workers\' rights and educational excellence. As a veteran educator, he understands the challenges facing our education system. His leadership in labor unions has secured better conditions and fair wages for thousands of workers.',
      achievements: ['30 years in education', 'Led successful union campaigns', 'Affordable housing advocate'],
      vision: 'Strengthening workers\' rights, affordable housing, and public education to build thriving communities.'
    },
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
            Choose Your Candidate
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Learn about each candidate's background, experience, and vision for the future
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
                        View Full Profile
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
                    Vote for {openModal.name}
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
