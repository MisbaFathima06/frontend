let candidates = [
  {
    id: 'cand_1',
    name: 'Sarah Johnson',
    party: 'Progressive Alliance',
    biography: 'Former educator with 15 years of experience in public service.',
    image: '/candidate1.png',
    hash: '0x7f3b2a1c8e5d4f9a6b2c1e8d7f3a2b5c4e1d9f8a7b6c5d4e3f2a1b0c9d8e7f6',
    createdAt: new Date().toISOString()
  },
  {
    id: 'cand_2',
    name: 'Michael Chen',
    party: 'Unity Party',
    biography: 'Business leader focused on economic growth and innovation.',
    image: '/candidate2.png',
    hash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8',
    createdAt: new Date().toISOString()
  },
  {
    id: 'cand_3',
    name: 'Emily Rodriguez',
    party: 'Green Future',
    biography: 'Environmental scientist committed to sustainable development.',
    image: '/candidate3.png',
    hash: '0x5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4',
    createdAt: new Date().toISOString()
  },
  {
    id: 'cand_4',
    name: 'David Thompson',
    party: 'Independent',
    biography: 'Healthcare advocate with a track record of community service.',
    image: '/candidate4.png',
    hash: '0x2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1',
    createdAt: new Date().toISOString()
  }
];

export function getCandidates() {
  return [...candidates];
}

export function addCandidate(candidate) {
  const newCandidate = {
    ...candidate,
    id: `cand_${Date.now()}`,
    hash: `0x${Math.random().toString(16).substr(2, 64)}`,
    createdAt: new Date().toISOString()
  };
  candidates.push(newCandidate);
  return newCandidate;
}

export function getCandidateById(id) {
  return candidates.find(c => c.id === id);
}
