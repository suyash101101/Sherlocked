import React from 'react';
import { motion } from 'framer-motion';
import { KeySquare, Map, Brain, Eye, Lock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();
  
  const iconFeatures = [
    { icon: KeySquare, text: "Break the Ciphers", desc: "Decrypt ancient codes" },
    { icon: Brain, text: "Test Your Wit", desc: "Solve intricate puzzles" },
    { icon: Eye, text: "Observe Carefully", desc: "Find hidden clues" },
    { icon: Lock, text: "Unlock Mysteries", desc: "Reveal the truth" }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative text-center py-32 rounded-2xl mb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/80 to-stone-900/90" />
      
      <div className="relative z-10">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="grid grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
        >
          {iconFeatures.map(({ icon: Icon, text, desc }, index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative inline-block mb-4"
              >
                <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full transform group-hover:scale-110 transition-all" />
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-700/40 to-stone-900/40 
                             backdrop-blur-sm border border-amber-700/20 p-3 relative z-10">
                  <Icon className="w-full h-full text-amber-400/90" />
                </div>
              </motion.div>
              <p className="text-amber-200/90 text-sm font-serif tracking-wide mb-1">{text}</p>
              <p className="text-stone-400/80 text-xs">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-serif mb-8 text-amber-100 tracking-tight"
        >
          Sherlocked
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="block text-3xl mt-6 font-sans text-amber-400/90 uppercase tracking-[0.2em]"
          >
            The Cipher Hunt
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl mb-16 text-amber-200/70 max-w-3xl mx-auto font-serif italic leading-relaxed"
        >
          "From cryptic messages to ancient ciphers, each clue leads deeper into London's labyrinth of mysteries.
          The game of shadows and secrets begins."
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="block text-base mt-6 not-italic text-stone-400/90 font-sans"
          >
            Can you decipher the truth that lies hidden in plain sight?
          </motion.span>
        </motion.p>
        
        <motion.button 
          onClick={() => navigate('/level')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 
                     text-amber-100 font-bold py-6 px-12 rounded-lg text-xl transition-all duration-300 
                     flex items-center justify-center mx-auto gap-4 shadow-2xl border border-amber-700/30
                     backdrop-blur-sm relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-transparent opacity-0 
                        group-hover:opacity-100 transition-all duration-300" />
          <Search size={24} />
          <span className="font-serif tracking-wider">"The Game is Afoot"</span>
        </motion.button>
      </div>

      {/* Decorative cipher elements */}
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-amber-800/30 rounded-tl-4xl 
                    [background:radial-gradient(circle_at_bottom_right,transparent_70%,rgba(217,119,6,0.1))]" />
      <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-amber-800/30 rounded-br-4xl 
                    [background:radial-gradient(circle_at_top_left,transparent_70%,rgba(217,119,6,0.1))]" />
    </motion.section>
  );
}

export default HeroSection;

