import GuessBoxButtons from '@/components/GuessBox/guess-box-buttons';
import GuessBoxCountdown from '@/components/GuessBox/guess-box-countdown';

const GuessBoxFooter = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <GuessBoxButtons />
      <GuessBoxCountdown />
    </div>
  );
};

export default GuessBoxFooter;
