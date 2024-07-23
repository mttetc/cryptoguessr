import useStore from '@/store';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from './ui/button';

type GuessBoxButtonsProps = {
  onGuess: (direction: 'up' | 'down') => void;
} & ComponentPropsWithoutRef<'div'>;

const GuessBoxButtons = ({ onGuess, ...restProps }: GuessBoxButtonsProps) => {
  const isCountdownActive = useStore(state => state.isCountdownActive);

  const handleGuess = (direction: 'up' | 'down') => () => {
    onGuess(direction);
  };

  return (
    <div className="flex justify-center gap-2" {...restProps}>
      <Button
        variant="default"
        className="w-24 flex gap-1"
        onClick={handleGuess('up')}
        disabled={isCountdownActive}
      >
        <ArrowUpIcon size={14} />
        Up
      </Button>
      <Button
        variant="destructive"
        className="w-24 flex gap-1"
        onClick={handleGuess('down')}
        disabled={isCountdownActive}
      >
        <ArrowDownIcon size={14} />
        Down
      </Button>
    </div>
  );
};

export default GuessBoxButtons;
