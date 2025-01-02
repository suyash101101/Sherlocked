import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Countdown from '../components/Countdown';

function Home() {
  return (
    <>
      {/* Fixed background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, 
              rgba(0, 0, 0, 0.75), 
              rgba(0, 0, 0, 0.7)
            ),
            url('/img.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Victorian pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(153, 123, 56, 0.1) 2px, transparent 2px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Scrollable content wrapper */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto max-w-6xl pt-20 pb-12 px-4">
          {/* Blur effects */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none"
          >
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-stone-800/15 rounded-full blur-3xl" />
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
      </div>
    </>
  );
}

export default Home;

