import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Leaderboard from '../components/Leaderboard_';

function App() {
  return (
    <div className="min-h-screen flex flex-col text-stone-100 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
      <main className="flex-1 relative container mx-auto px-4 py-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-12">
            <Trophy className="text-amber-300/80" size={40} />
            <h2 className="text-4xl font-bold text-stone-100 font-serif">Scotland Yard's Finest</h2>
          </div>
          <div className="bg-gradient-to-b from-stone-900/70 to-stone-950/70 backdrop-blur-sm rounded-xl border border-stone-800/30 shadow-xl">
            <Leaderboard />
          </div>
        </motion.div>
      </main>

      <footer className="bg-stone-900/80 backdrop-blur-sm mt-auto border-t border-amber-900/20">
      </footer>
    </div>
  );
}

export default App;
