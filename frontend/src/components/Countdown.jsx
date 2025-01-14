import { useState, useEffect } from 'react';
import { Clock, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

function Countdown() {
  const targetDate = new Date('2025-01-25T12:00:00');
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    function calculateTimeLeft() {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    }

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const timeRemaining = calculateTimeLeft();
      setTimeLeft(timeRemaining);
      
      if (!timeRemaining) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <section className="text-center py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-amber-400 font-serif"
        >
          The Game is On!
        </motion.div>
      </section>
    );
  }

  return (
    <section className="text-center py-8">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <Timer className="text-amber-400" size={28} />
        <h2 className="text-3xl font-bold text-amber-100 font-serif">The Chase Begins In</h2>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map(({ label, value }, index) => (
          <motion.div
            key={label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-stone-800/30 p-6 rounded-lg border border-stone-700/20 shadow-lg backdrop-blur-sm"
          >
            <motion.span
              key={value} // Force animation refresh on value change
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-amber-400 block font-mono"
            >
              {String(value).padStart(2, '0')}
            </motion.span>
            <span className="text-stone-300/70 text-sm uppercase tracking-wider mt-2 block">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Countdown;

