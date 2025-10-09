import { Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Candidates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = [
    {
      id: 1,
      name: 'Alexandra Chen',
      party: 'Progressive Alliance',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'Former environmental scientist with 15 years of experience in sustainable policy development. Advocates for climate action, renewable energy, and equitable economic growth.',
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      party: 'Unity Coalition',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
      bio: 'Experienced civil rights attorney and community organizer. Focuses on social justice, healthcare reform, and education accessibility for all communities.',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      party: 'Innovation Party',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Tech entrepreneur and former city council member. Champions digital infrastructure, small business support, and modernizing public services through technology.',
    },
    {
      id: 4,
      name: 'Robert Martinez',
      party: 'People First Movement',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Veteran educator and labor union leader. Committed to workers rights, affordable housing, and strengthening public education systems.',
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
              className={`group relative glass-morphism rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                selectedCandidate === candidate.id ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/50' : 'hover:scale-[1.02]'
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-xl overflow-hidden">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {selectedCandidate === candidate.id && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{candidate.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-blue-400">◆</span>
                    <span className="text-sm text-gray-400">{candidate.party}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{candidate.bio}</p>
                  
                  <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                    Vote for this Candidate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Candidates;
