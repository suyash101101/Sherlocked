import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Crown, Medal, Brain, Award as AwardIcon, Target } from 'lucide-react';

export default function ScoreBoard() {
  const [score, setScore] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [userId, setUserId] = useState(null);
  const [rank, setRank] = useState(null);

  const fetchUserId = async () => {
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
  
      const user = session?.session?.user;
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }
  
      const userEmail = user.email;
  
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id') 
        .eq('email', userEmail) 
        .single();
  
      if (userError) throw userError;
  
      if (userData) {
        setUserId(userData.id);
      }
    } catch (err) {
      console.error('Error fetching user ID:', err);
    }
  };

  const fetchScore = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leaderboard')
        .select('total_score')
        .eq('team_id', userId)

      if (error) throw error;

      if (data && data.length > 0) {
        setScore(data[0].total_score);
      } else {
        setScore(0);
      }
    } catch (err) {
      console.error('Error fetching score:', err);
      setError('Failed to fetch the score.');
    } finally {
      setLoading(false);
    }
  };

  const getRankMessage = (position) => {
    if (position === 1) return "London's Finest Detective";
    if (position === 2) return "Scotland Yard's Pride";
    if (position === 3) return "Master of Deduction";
    if (position <= 10) return "Rising Detective Star";
    if (position <= 20) return "Promising Investigator";
    return "Aspiring Detective";
  };

  const getRankIcon = (position) => {
    if (position === 1) return <Crown className="text-amber-400 w-6 h-6" />;
    if (position === 2) return <Medal className="text-stone-400 w-6 h-6" />;
    if (position === 3) return <Medal className="text-amber-700 w-6 h-6" />;
    if (position <= 10) return <Brain className="text-amber-500/80 w-5 h-5" />;
    return <Star className="text-amber-600/60 w-5 h-5" />;
  };

  const fetchRank = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('team_id')
        .order('total_score', { ascending: false });

      if (error) throw error;

      const position = data.findIndex(item => item.team_id === userId) + 1;
      setRank(position);
    } catch (err) {
      console.error('Error fetching rank:', err);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchScore();
    }
  }, [userId]);

  const fetchRank = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('team_id')
        .order('total_score', { ascending: false });

      if (error) throw error;

      const position = data.findIndex(item => item.team_id === userId) + 1;
      setRank(position);
    } catch (err) {
      console.error('Error fetching rank:', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRank();
    }
  }, [userId, score]);

  // Polling for updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (userId) {
        fetchScore();
        fetchRank(); // Re-fetch rank when score changes
      }
    }, 5000); // Poll every 5 seconds (adjust as needed)

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 bg-gradient-to-r from-amber-950/80 to-stone-900/80 backdrop-blur-md px-3 py-2 rounded-lg border border-amber-800/30 shadow-lg hover:shadow-amber-900/20"
      >
        {rank && getRankIcon(rank)}
        <div className="flex items-center gap-3">
          <Target className="w-4 h-4 text-amber-500/70" />
          <motion.span
            key={score}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-bold text-amber-400 font-mono tabular-nums"
          >
            {score || 0}
          </motion.span>
        </div>
      </motion.div>

      {/* Tooltip on hover */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 top-full mt-2 w-48 p-3 bg-stone-900/95 backdrop-blur-md rounded-lg border border-amber-800/30 shadow-xl invisible group-hover:visible"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-xs">Rank</span>
              <span className="text-amber-400 font-medium">#{rank}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-xs">Status</span>
              <span className="text-amber-300 text-xs font-medium">{getRankMessage(rank)}</span>
            </div>
            <div className="border-t border-stone-800/50 my-2" />
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-amber-500/80"
              >
                <AwardIcon className="w-5 h-5 mx-auto mb-1" />
              </motion.div>
              <span className="text-[10px] text-stone-400">Keep solving to rank up!</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
