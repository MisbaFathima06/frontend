import { motion } from 'framer-motion';
import { useState } from 'react';
import VoteCard from './VoteCard';
import ConfirmModal from './ConfirmModal';

const VoteGrid = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const candidates = [
    {
      id: 1,
      name: 'Alexandra Chen',
      party: 'Progressive Alliance',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'Champion of rural development. 15 years public service.',
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      party: 'Unity Coalition',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
      bio: 'Champion of education reform. 20 years experience.',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      party: 'Innovation Party',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Champion of technology advancement. 12 years leadership.',
    },
    {
      id: 4,
      name: 'Robert Martinez',
      party: 'People First Movement',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Champion of workers rights. 18 years advocacy.',
    },
  ];

  const handleSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <VoteCard
              candidate={candidate}
              onSelect={handleSelect}
              isSelected={selectedCandidate?.id === candidate.id}
            />
          </motion.div>
        ))}
      </div>

      {showModal && (
        <ConfirmModal
          candidate={selectedCandidate}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default VoteGrid;
