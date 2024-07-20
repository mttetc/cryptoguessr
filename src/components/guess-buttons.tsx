import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from './ui/button';

type GuessButtonsProps = {
  onGuess: (direction: 'up' | 'down') => void;
} & ComponentPropsWithoutRef<'div'>;

const GuessButtons = ({ onGuess, ...restProps }: GuessButtonsProps) => {
  return (
    <div className="flex justify-center gap-2" {...restProps}>
      <Button
        variant="outline"
        className="w-24 flex gap-1 rounded-l-lg border-[#F7931A] text-[#F7931A] hover:bg-[#F7931A] hover:text-white"
        onClick={() => onGuess('up')}
      >
        <ArrowUpIcon size={14} />
        Up
      </Button>
      <Button
        variant="outline"
        className="w-24 flex gap-1 rounded-r-lg border-[#7B61FF] text-[#7B61FF] hover:bg-[#7B61FF] hover:text-white"
        onClick={() => onGuess('down')}
      >
        <ArrowDownIcon size={14} />
        Down
      </Button>
    </div>
  );
};

export default GuessButtons;
