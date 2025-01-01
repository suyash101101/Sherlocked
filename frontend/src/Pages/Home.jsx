import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Countdown from '../components/Countdown';

function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 pt-20 pb-12 px-4"
    >
      <div className="container mx-auto max-w-6xl relative">
        {/* Victorian decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-900/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-stone-800/10 rounded-full blur-3xl" />
        </div>

        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-b from-stone-900/50 to-stone-950/50 p-8 rounded-xl 
                     backdrop-blur-sm border border-stone-800/30 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[url('/victorian-pattern.png')] opacity-5" />
          <Countdown />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;

