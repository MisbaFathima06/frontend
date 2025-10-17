export function generateIdentity() {
  const commitment = `0x${Math.random().toString(16).substr(2, 60)}`;
  const nullifierHash = `0x${Math.random().toString(16).substr(2, 60)}`;

  return {
    commitment,
    nullifierHash,
    timestamp: new Date().toISOString()
  };
}

export function maskHex(hex) {
  if (!hex || hex.length < 10) return hex;
  return `${hex.substring(0, 6)}...${hex.substring(hex.length - 4)}`;
}

export function generateProof(candidateId, commitment) {
  const proof = {
    a: [
      `0x${Math.random().toString(16).substr(2, 64)}`,
      `0x${Math.random().toString(16).substr(2, 64)}`
    ],
    b: [
      [
        `0x${Math.random().toString(16).substr(2, 64)}`,
        `0x${Math.random().toString(16).substr(2, 64)}`
      ],
      [
        `0x${Math.random().toString(16).substr(2, 64)}`,
        `0x${Math.random().toString(16).substr(2, 64)}`
      ]
    ],
    c: [
      `0x${Math.random().toString(16).substr(2, 64)}`,
      `0x${Math.random().toString(16).substr(2, 64)}`
    ]
  };

  const nullifierHash = `0x${Math.random().toString(16).substr(2, 64)}`;

  return {
    proof,
    nullifierHash,
    candidateId,
    commitment,
    timestamp: new Date().toISOString()
  };
}
