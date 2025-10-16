import { getCandidates as getStoredCandidates, addCandidate as addStoredCandidate } from '../store/candidates';

export async function submitCandidate(formData) {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const candidate = addStoredCandidate(formData);

  return {
    success: true,
    candidate
  };
}

export async function getCandidates() {
  await new Promise(resolve => setTimeout(resolve, 300));

  return getStoredCandidates();
}
