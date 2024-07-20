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
        variant="outline"
        className="w-24 flex gap-1 rounded-l-lg border-[#F7931A] text-[#F7931A] hover:bg-[#F7931A] hover:text-white"
        onClick={() => handleStartCountdown('up')}
        disabled={isActive}
      >
        <ArrowUpIcon size={14} />
        Up
      </Button>
      <Button
        variant="outline"
        className="w-24 flex gap-1 rounded-r-lg border-[#7B61FF] text-[#7B61FF] hover:bg-[#7B61FF] hover:text-white"
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
