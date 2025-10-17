export function generateIdentity() {
  const commitment = '0x' + Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  const nullifierHash = '0x' + Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  return { commitment, nullifierHash };
}

export function maskHex(hex) {
  if (!hex || hex.length < 12) return hex;
  return `${hex.slice(0, 6)}…${hex.slice(-4)}`;
}

export function generateProof(identity, candidateId) {
  return {
    proof: '0x' + Array.from({ length: 128 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join(''),
    publicSignals: [identity.nullifierHash, candidateId],
    timestamp: Date.now()
  };
}

export async function submitVote(candidateId, proof) {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const txHash = '0x' + Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  const blockNumber = Math.floor(Math.random() * 1000000) + 15000000;

  return {
    ok: true,
    txHash,
    blockNumber,
    candidateId
  };
}

export function listCandidates() {
  const stored = localStorage.getItem('sv_candidates');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function submitCandidate(candidate) {
  const candidates = listCandidates();
  const newCandidate = {
    id: Date.now().toString(),
    ...candidate,
    hash: '0x' + Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join(''),
    timestamp: Date.now()
  };
  candidates.push(newCandidate);
  localStorage.setItem('sv_candidates', JSON.stringify(candidates));
  return newCandidate;
}
