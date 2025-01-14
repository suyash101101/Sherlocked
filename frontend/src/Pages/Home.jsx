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
          {/* Timer first */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 bg-gradient-to-b from-stone-900/70 to-stone-950/70 p-8 rounded-xl 
                       backdrop-blur-md border border-stone-800/40 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-800/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-800/20 rounded-br-3xl" />
            </div>
            <Countdown />
          </motion.div>

          {/* Hero Section */}
          <HeroSection />
        </div>
      </div>
    </>
  );
}

export default Home;

