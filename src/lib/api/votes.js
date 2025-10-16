const votes = [];

export async function submitVote(payload) {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const vote = {
    ...payload,
    txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    timestamp: new Date().toISOString(),
    blockNumber: Math.floor(Math.random() * 1000000) + 1000000
  };

  votes.push(vote);

  return vote;
}

export async function getVoteCount() {
  await new Promise(resolve => setTimeout(resolve, 200));

  return votes.length;
}
