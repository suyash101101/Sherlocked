import React from 'react';
import { motion } from 'framer-motion';
import { Search, Scroll, PenTool, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative text-center py-32 rounded-2xl shadow-2xl mb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/detective-bg.jpg')] opacity-20 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/80 to-stone-900/90" />
      
      {/* Victorian decorative elements */}
      <div className="absolute inset-0 bg-[url('/victorian-pattern.png')] opacity-5 bg-repeat" />
      
      <div className="relative z-10">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
        >
          {[
            { icon: PenTool, text: "Decipher Codes" },
            { icon: Compass, text: "Navigate London" },
            { icon: Search, text: "Solve Mysteries" }
          ].map(({ icon: Icon, text }, index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <Icon className="w-10 h-10 mx-auto text-amber-400/80 mb-3" />
              <p className="text-stone-300/80 text-sm font-serif">{text}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-7xl font-serif mb-6 text-amber-100 tracking-tight"
        >
          Sherlocked
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="block text-2xl mt-4 font-sans text-amber-400/80"
          >
            The Cipher Hunt
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl mb-12 text-amber-200/60 max-w-2xl mx-auto font-serif italic"
        >
          "The game is afoot, dear Watson. London's shadows hold secrets only the keenest minds can unveil."
          <span className="block text-sm mt-4 not-italic text-stone-400">
            Are you ready to join the ranks of London's finest detectives?
          </span>
        </motion.p>
        
        <motion.button 
          onClick={() => navigate('/level')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 
                     text-amber-100 font-bold py-5 px-10 rounded-lg text-lg transition-all duration-300 
                     flex items-center justify-center mx-auto gap-3 shadow-xl border border-amber-700/20
                     backdrop-blur-sm"
        >
          <Search size={20} />
          <span className="font-serif">221B Baker Street Awaits</span>
        </motion.button>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-800/20 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-800/20 rounded-br-3xl" />
    </motion.section>
  );
}

export default HeroSection;

