import { useStartCountdown } from '@/hooks/useStartCountdown';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from './ui/button';
import { useQueryClient } from '@tanstack/react-query';

const GuessButtons = (props: ComponentPropsWithoutRef<'div'>) => {
  const queryClient = useQueryClient();
  const { isActive, startCountdown } = useStartCountdown();

  const handleStartCountdown = (direction: 'up' | 'down') => {
    startCountdown({ queryClient, direction });
  };

  return (
    <div className="flex justify-center gap-2" {...props}>
      <Button
        variant="default"
        className="w-24 flex gap-1"
        onClick={() => handleStartCountdown('up')}
        disabled={isActive}
      >
        <ArrowUpIcon size={14} />
        Up
      </Button>
      <Button
        variant="destructive"
        className="w-24 flex gap-1"
        onClick={() => handleStartCountdown('down')}
        disabled={isActive}
      >
        <ArrowDownIcon size={14} />
        Down
      </Button>
    </div>
  );
};

export default GuessButtons;
