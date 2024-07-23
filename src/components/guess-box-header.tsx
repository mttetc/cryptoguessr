import useStore from '@/store';
import CryptoDisplay from './crypto-display';
import Score from './score';
import ResetScoreButton from './reset-score-button';

const GuessBoxHeader = () => {
  const anonymousId = useStore(state => state.anonymousId);

  return (
    <div className="flex items-center justify-between gap-4">
      <CryptoDisplay />
      <div className="flex items-center gap-4">
        <Score />
        {anonymousId && <ResetScoreButton anonymousId={anonymousId} />}
      </div>
    </div>
  );
};

export default GuessBoxHeader;
