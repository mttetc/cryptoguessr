import { useRef } from 'react';
import GuessBoxButtons from '@/components/GuessBox/guess-box-buttons';
import GuessBoxCountdown, {
  GuessBoxCountdownRef,
} from '@/components/GuessBox/guess-box-countdown';

const GuessBoxFooter = () => {
  const countdownRef = useRef<GuessBoxCountdownRef | null>(null);

  const handleStartCountdown = (direction: 'up' | 'down') => {
    countdownRef.current?.onStartCountdown(direction);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <GuessBoxButtons onGuess={handleStartCountdown} />
      <GuessBoxCountdown ref={countdownRef} />
    </div>
  );
};

export default GuessBoxFooter;
