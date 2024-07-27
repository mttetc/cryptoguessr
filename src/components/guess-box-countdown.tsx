import useCountdown from '@/hooks/useCountdown';
import useStore from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { forwardRef, useImperativeHandle } from 'react';

const variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export type GuessBoxCountdownRef = {
  onStartCountdown: (direction: 'up' | 'down') => void;
};

const GuessBoxCountdown = forwardRef<GuessBoxCountdownRef | null, unknown>(
  (_, ref) => {
    const { startCountdown, countdown } = useCountdown();
    const isCountdownActive = useStore(state => state.isCountdownActive);
    const isCountdownVisible = countdown > 0 && isCountdownActive;
    const isPlural = countdown > 1;
    const secondText = isPlural ? 'seconds' : 'second';

    useImperativeHandle(ref, () => ({
      onStartCountdown: direction => {
        startCountdown(direction);
      },
    }));

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
  },
);

GuessBoxCountdown.displayName = 'GuessBoxCountdown';
export default GuessBoxCountdown;
