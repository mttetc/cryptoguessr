import useStore from '@/store';
import { motion } from 'framer-motion';
import GuessBoxFooter from '@/components/GuessBox/guess-box-footer';
import GuessBoxHeader from '@/components/GuessBox/guess-box-header';

export type CountdownComponent = {
  triggerGuess: (direction: 'up' | 'down') => void;
};

const GuessBox = () => {
  const selectedCrypto = useStore(state => state.selectedCrypto);

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(-10px)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      transition={{ duration: 0.5 }}
      className="self-center rounded-lg border bg-card text-card-foreground py-6 px-8 w-[400px]"
    >
      <GuessBoxHeader />
      <div className="py-6 flex flex-col gap-6">
        <p className="text-lg text-muted-foreground font-light text-center">
          Will {selectedCrypto} price go up or down?
          <br />
          Take your guess!
        </p>
        <GuessBoxFooter />
      </div>
    </motion.div>
  );
};

export default GuessBox;
