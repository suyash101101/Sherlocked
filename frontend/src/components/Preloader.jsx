import { motion } from 'framer-motion';

function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-stone-900"
    >
      <div className="relative">
        <motion.img
          src="/image.png"
          alt="Sherlock Loading"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-4 text-center"
        >
          <span className="text-amber-400 font-serif text-xl">The Game is Afoot...</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Preloader;

