import useStore from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const Countdown = () => {
  const countdown = useStore(state => state.countdown);
  const isCountdownVisible = countdown > 0;

  return (
    <AnimatePresence>
      {isCountdownVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="flex gap-1 items-center"
        >
          <Clock size={12} />
          {countdown} seconds left to vote again
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Countdown;
