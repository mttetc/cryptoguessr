import useInitCountdown from '@/hooks/useInitCountdown';
import useStore from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { forwardRef, useImperativeHandle } from 'react';

export type GuessBoxCountdownRef = {
  onStartCountdown: (direction: 'up' | 'down') => void;
};

const GuessBoxCountdown = forwardRef<GuessBoxCountdownRef | null, unknown>(
  (_, ref) => {
    const startCountdown = useInitCountdown();
    const countdown = useStore(state => state.countdown);
    const isCountdownVisible = countdown > 0;

    useImperativeHandle(ref, () => ({
      onStartCountdown: direction => {
        startCountdown(direction);
      },
    }));

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
  },
);

GuessBoxCountdown.displayName = 'GuessBoxCountdown';
export default GuessBoxCountdown;
