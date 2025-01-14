import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SingleQuestion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="p-4 rounded-lg bg-stone-900/50 border border-stone-800/30 hover:border-amber-800/30 transition-all"
      whileHover={{ scale: 1.005 }}
    >
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-amber-200">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-amber-400"
        >
          <ChevronDown />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-amber-100/80 leading-relaxed pl-4 border-l-2 border-amber-800/30">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
