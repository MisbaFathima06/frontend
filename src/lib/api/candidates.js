import { getCandidates as getStoredCandidates, addCandidate as addStoredCandidate } from '../store/candidates';

export async function listCandidates() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getStoredCandidates();
}

export async function submitCandidate(formData) {
  await new Promise(resolve => setTimeout(resolve, 1200));
  const candidate = addStoredCandidate(formData);
  return {
    success: true,
    candidate
  };
}
