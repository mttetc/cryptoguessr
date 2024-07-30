import useStore from '@/store';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from '@/components/ui/button';

type GuessBoxButtonsProps = {
  onGuess: (direction: 'up' | 'down') => void;
} & ComponentPropsWithoutRef<'div'>;

const GuessBoxButtons = ({ onGuess, ...restProps }: GuessBoxButtonsProps) => {
  const isCountdownActive = useStore(state => state.isCountdownActive);
  const direction = useStore(state => state.direction);

  const handleGuess = (direction: 'up' | 'down') => () => {
    onGuess(direction);
  };

  return (
    <div className="flex justify-center gap-2" {...restProps}>
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
