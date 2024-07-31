import useStore from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const GuessBoxCountdown = () => {
  const countdown = useStore(state => state.countdown);
  const isCountdownActive = useStore(state => state.isCountdownActive);
  const isCountdownVisible = countdown > 0 && isCountdownActive;
  const isPlural = countdown > 1;
  const secondText = isPlural ? 'seconds' : 'second';

  return (
    <AnimatePresence>
      {isCountdownVisible && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
          className="flex gap-1 items-center"
          data-testid="guess-box-countdown"
        >
          <Clock size={12} />
          {countdown} {secondText} left to vote again
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuessBoxCountdown;
