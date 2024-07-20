import useStore from '@/store';
import { TrophyIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Score = () => {
  const { score } = useStore();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-medium text-white font-['Playfair_Display', 'serif']">
            {score}
          </span>
          <TrophyIcon size={16} className=" text-[#7B61FF]" />
        </div>
      </TooltipTrigger>
      <TooltipContent>Your score</TooltipContent>
    </Tooltip>
  );
};

export default Score;
