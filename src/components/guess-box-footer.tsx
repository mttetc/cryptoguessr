import { useRef } from 'react';
import GuessBoxButtons from './guess-box-buttons';
import GuessBoxCountdown, { GuessBoxCountdownRef } from './guess-box-countdown';

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
