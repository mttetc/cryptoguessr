import useStore from '@/store';
import { motion } from 'framer-motion';
import { TrophyIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import usePrevious from '@/hooks/usePrevious';

const animationVariants = {
  animate: { scale: [1, 1.5, 1] },
  initial: { scale: 1 },
};

const Score = () => {
  const { score } = useStore();
  const previousScore = usePrevious(score);
  const isAnimationTriggered = previousScore !== score;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-medium text-white font-['Playfair_Display', 'serif']">
            {score}
          </span>
          <motion.div
            variants={animationVariants}
            animate={isAnimationTriggered ? 'animate' : 'initial'}
            transition={{ duration: 0.4 }}
          >
            <TrophyIcon size={16} className="text-[#7B61FF]" />
          </motion.div>
        </div>
      </TooltipTrigger>
      <TooltipContent>Your score</TooltipContent>
    </Tooltip>
  );
};

export default Score;
