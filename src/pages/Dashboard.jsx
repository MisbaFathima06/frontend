import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import IdentityStatus from '../components/dashboard/IdentityStatus';
import VoteGrid from '../components/dashboard/VoteGrid';
import LiveResultsPanel from '../components/dashboard/LiveResultsPanel';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Voting Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Select your candidate and cast your secure vote
          </p>
        </motion.div>

        <IdentityStatus />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <VoteGrid />
        </motion.div>
      </div>

      <LiveResultsPanel />
    </div>
  );
};

export default Dashboard;
