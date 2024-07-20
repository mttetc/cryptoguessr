import useCountdown from '@/hooks/useCountdown';
import useStore from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { forwardRef, useImperativeHandle } from 'react';
import { CountdownComponent } from './guess-box';

const Countdown = forwardRef<CountdownComponent | null, unknown>((_, ref) => {
  const { selectedCrypto, selectedCurrency } = useStore();
  const { countdown, onStartCountdown } = useCountdown({
    crypto: selectedCrypto,
    currency: selectedCurrency,
  });
  const isCountdownVisible = countdown > 0;

  useImperativeHandle(ref, () => ({
    triggerGuess: direction => {
      onStartCountdown(direction);
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
});

Countdown.displayName = 'Countdown';
export default Countdown;
