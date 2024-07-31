import { Button } from '@/components/ui/button';
import useCountdown from '@/hooks/useCountdown';
import useStore from '@/store';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

const GuessBoxButtons = (props: ComponentPropsWithoutRef<'div'>) => {
  const { startCountdown } = useCountdown();
  const isCountdownActive = useStore(state => state.isCountdownActive);
  const direction = useStore(state => state.direction);

  const handleGuess = (direction: 'up' | 'down') => () => {
    startCountdown(direction);
  };

  return (
    <div className="flex justify-center gap-2" {...props}>
      <div
        className={`border-2 rounded-lg ${direction === 'up' ? 'border-primary' : 'border-transparent'}`}
      >
        <Button
          variant="default"
          className="w-24 flex gap-1"
          onClick={handleGuess('up')}
          disabled={isCountdownActive}
          data-testid="guess-box-button-up"
        >
          <ArrowUpIcon size={14} />
          Up
        </Button>
      </div>
      <div
        className={`border-2 rounded-lg ${direction === 'down' ? 'border-primary' : 'border-transparent'}`}
      >
        <Button
          variant="destructive"
          className="w-24 flex gap-1"
          onClick={handleGuess('down')}
          disabled={isCountdownActive}
          data-testid="guess-box-button-down"
        >
          <ArrowDownIcon size={14} />
          Down
        </Button>
      </div>
    </div>
  );
};

export default GuessBoxButtons;
