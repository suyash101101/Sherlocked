import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Countdown from '../components/Countdown';

function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-blend-overlay relative"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.92), 
            rgba(0, 0, 0, 0.88)
          ),
          url('/src/img.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Victorian era pattern using CSS grid */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(153, 123, 56, 0.1) 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="container mx-auto max-w-6xl relative pt-20 pb-12 px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-800/15 rounded-full blur-3xl" />
        </motion.div>

        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-gradient-to-b from-stone-900/70 to-stone-950/70 p-8 rounded-xl 
                     backdrop-blur-md border border-stone-800/40 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-800/20 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-800/20 rounded-br-3xl" />
          </div>
          <Countdown />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;

