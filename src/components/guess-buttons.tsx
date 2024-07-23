import useInitCountdown from '@/hooks/useInitCountdown';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from './ui/button';
import useStore from '@/store';

const GuessButtons = (props: ComponentPropsWithoutRef<'div'>) => {
  const isCountdownActive = useStore(state => state.isCountdownActive);
  const { startCountdown } = useInitCountdown();

  const handleStartCountdown = (direction: 'up' | 'down') => {
    startCountdown(direction);
  };

  return (
    <div className="flex justify-center gap-2" {...props}>
      <Button
        variant="default"
        className="w-24 flex gap-1"
        onClick={() => handleStartCountdown('up')}
        disabled={isCountdownActive}
      >
        <ArrowUpIcon size={14} />
        Up
      </Button>
      <Button
        variant="destructive"
        className="w-24 flex gap-1"
        onClick={() => handleStartCountdown('down')}
        disabled={isCountdownActive}
      >
        <ArrowDownIcon size={14} />
        Down
      </Button>
    </div>
  );
};

export default GuessButtons;
