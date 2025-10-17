import { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { submitCandidate, listCandidates } from '../lib/helpers/voting';
import { UserPlus, Users, CheckCircle, Hash, LogOut } from 'lucide-react';

function AdminDashboardContent() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    biography: '',
    image: ''
  });
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = () => {
    const data = listCandidates();
    setCandidates(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const result = submitCandidate(formData);

      setSuccess('Candidate Added & Hash Queued for Audit');

      setFormData({
        name: '',
        party: '',
        biography: '',
        image: ''
      });

      loadCandidates();
    } catch (error) {
      console.error('Error adding candidate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sv_user');
    sessionStorage.removeItem('sv_identity');
    sessionStorage.removeItem('sv_vote_result');
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">
            Enroll the Voices of Change.
          </h2>
          <p className="text-gray-300 text-lg">
            Candidate Certification and On-Chain Hashing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <UserPlus className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white">Add New Candidate</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter candidate name"
                />
              </div>

              <div>
                <label htmlFor="party" className="block text-sm font-medium text-gray-300 mb-2">
                  Political Party
                </label>
                <input
                  type="text"
                  id="party"
                  value={formData.party}
                  onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter party affiliation"
                />
              </div>

              <div>
                <label htmlFor="biography" className="block text-sm font-medium text-gray-300 mb-2">
                  Biography
                </label>
                <textarea
                  id="biography"
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  placeholder="Brief background and platform..."
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="text"
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="/candidate-photo.png"
                />
              </div>

              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-emerald-400 text-sm">{success}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-500/50 min-h-[56px]"
                aria-label="Add Candidate"
              >
                {loading ? 'Adding Candidate...' : 'Add Candidate'}
              </button>
            </form>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Registered Candidates</h3>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {candidates.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No candidates registered yet</p>
              ) : (
                candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {candidate.image && (
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium">{candidate.name}</h4>
                        <p className="text-sm text-gray-300">{candidate.party}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Hash className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400 font-mono truncate">
                            {candidate.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <AdminDashboardContent />;
}
