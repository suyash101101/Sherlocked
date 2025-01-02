import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchLeaderboardData } from '../config/supabaseClient1';
import { Trophy, PipetteIcon, Medal, GraduationCap, Crown, Search } from 'lucide-react';

const LeaderboardRow = ({ rank, name, score, delay }) => {
  const getRankStyles = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-amber-900/40 to-stone-900/40 border-l-4 border-amber-400";
    if (rank === 2) return "bg-gradient-to-r from-stone-800/40 to-stone-900/40 border-l-4 border-stone-400";
    if (rank === 3) return "bg-gradient-to-r from-amber-800/40 to-stone-900/40 border-l-4 border-amber-700";
    return "bg-stone-900/20";
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="text-amber-400 w-8 h-8" />;
    if (rank === 2) return <Medal className="text-stone-400 w-7 h-7" />;
    if (rank === 3) return <Medal className="text-amber-700 w-6 h-6" />;
    if (rank <= 10) return <GraduationCap className="text-amber-200/60 w-5 h-5" />;
    return null;
  };

  return (
    <motion.tr 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
      className={`${getRankStyles(rank)} backdrop-blur-sm transition-all duration-300 hover:scale-[1.01]`}
    >
      <td className="px-6 py-5">
        <div className="flex items-center justify-center">
          <motion.div 
            className={`text-2xl font-serif ${
              rank === 1 ? 'text-amber-400' :
              rank === 2 ? 'text-stone-400' :
              rank === 3 ? 'text-amber-700' :
              'text-stone-400/60'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            #{rank}
          </motion.div>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center justify-center space-x-3">
          {getRankIcon(rank)}
          <span className={`font-medium ${
            rank <= 3 ? 'text-stone-100' : 'text-stone-300'
          }`}>
            {name}
          </span>
        </div>
      </td>
      <td className="px-6 py-5">
        <motion.div 
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className={`font-mono font-bold ${
            rank === 1 ? 'text-amber-400' :
            rank === 2 ? 'text-stone-400' :
            rank === 3 ? 'text-amber-700' :
            'text-stone-400/80'
          }`}>
            {score} pts
          </span>
        </motion.div>
      </td>
    </motion.tr>
  );
};

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeaderboard = async (query = '') => {
    setLoading(true);
    const { data, error } = await fetchLeaderboardData(query);

    if (error) {
      setError(error);
      console.error('Error fetching leaderboard data:', error);
    } else {
      setTeams(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeaderboard(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-stone-900/30 rounded-xl border border-stone-800/30 overflow-hidden shadow-2xl"
        >
          <div className="px-6 py-6 border-b border-stone-800/30">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/image.png" alt="Sherlocked Logo" className="h-12 w-auto" />
              <h2 className="text-2xl font-bold text-stone-100 font-serif">
                Victorian Era's Finest
              </h2>
            </div>
            <p className="text-stone-400 text-center mt-2 text-sm">
              The most brilliant minds of London, competing to become the next Sherlock Holmes
            </p>
          </div>
          
          <div className="px-6 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a detective..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-stone-800/50 border border-stone-700/30 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <Search className="absolute right-3 top-2.5 text-stone-500" size={20} />
            </div>
          </div>

          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <PipetteIcon className="w-8 h-8 text-amber-400 mx-auto animate-spin" />
              <p className="text-stone-300 mt-4">Gathering intelligence...</p>
            </motion.div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <p className="text-red-400">A mysterious error has occurred...</p>
            </div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-800/30">
                    <th className="px-6 py-4 text-sm font-semibold text-stone-400 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-4 text-sm font-semibold text-stone-400 uppercase tracking-wider">Detective</th>
                    <th className="px-6 py-4 text-sm font-semibold text-stone-400 uppercase tracking-wider">Cases Solved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/30">
                  {teams.map((team, index) => (
                    <LeaderboardRow
                      key={`${team.id}-${team.team_name}`} // Added compound key
                      rank={index + 1}
                      name={team.team_name}
                      score={team.total_score}
                      delay={index * 0.1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Leaderboard;
