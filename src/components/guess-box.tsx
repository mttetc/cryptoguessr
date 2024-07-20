import useStore from '@/store';
import { motion } from 'framer-motion';
import Countdown from './countdown';
import CryptoDisplay from './crypto-display';
import GuessButtons from './guess-buttons';
import Score from './score';

export type CountdownComponent = {
  triggerGuess: (direction: 'up' | 'down') => void;
};

const GuessBox = () => {
  const { selectedCrypto } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(-10px)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      transition={{ duration: 0.5 }}
      className="bg-[#2D3142] rounded-lg shadow-lg p-8 w-full max-w-md"
    >
      <div className="flex justify-between items-center mb-4">
        <CryptoDisplay />
        <Score />
      </div>
      <div className="text-center mb-6">
        <p className="text-white font-['Playfair_Display', 'serif']">
          Will {selectedCrypto} price go up or down? Take your guess!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <GuessButtons />
        <Countdown />
      </div>
    </motion.div>
  );
};

export default GuessBox;
