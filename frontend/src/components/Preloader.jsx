import { motion } from 'framer-motion';

function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-stone-900"
    >
      <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-amber-400 mb-4"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center"
        >
          <span className="text-amber-400 font-serif text-xl ">The Game is Afoot...</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Preloader;
