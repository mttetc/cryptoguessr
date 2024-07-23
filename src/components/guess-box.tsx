import useStore from '@/store';
import { motion } from 'framer-motion';
import Countdown from './countdown';
import CryptoDisplay from './crypto-display';
import GuessButtons from './guess-buttons';
import Score from './score';
import ResetScoreButton from './reset-score-button';

export type CountdownComponent = {
  triggerGuess: (direction: 'up' | 'down') => void;
};

const GuessBox = () => {
  const { selectedCrypto, anonymousId } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(-10px)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      transition={{ duration: 0.5 }}
      className="self-center rounded-lg border bg-card text-card-foreground py-6 px-8 w-[400px]"
    >
      <div className="flex items-center justify-between gap-4">
        <CryptoDisplay />
        <div className="flex items-center gap-4">
          <Score />
          {anonymousId && <ResetScoreButton anonymousId={anonymousId} />}
        </div>
      </div>
      <div className="py-6 flex flex-col gap-6">
        <p className="text-lg text-muted-foreground font-light text-center">
          Will {selectedCrypto} price go up or down?
          <br />
          Take your guess!
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <GuessButtons />
          <Countdown />
        </div>
      </div>
    </motion.div>
  );
};

export default GuessBox;
