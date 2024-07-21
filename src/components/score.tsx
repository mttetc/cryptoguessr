import useStore from '@/store';
import { motion, Variants } from 'framer-motion';
import { TrophyIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import usePrevious from '@/hooks/usePrevious';

const animationVariants: Variants = {
  animate: { scale: [1, 1.4, 1], transition: { duration: 0.4 } },
  initial: { scale: 1, transition: { duration: 0.4 } },
};

const Score = () => {
  const { score } = useStore();
  const previousScore = usePrevious(score);
  const isAnimationTriggered =
    previousScore !== undefined && previousScore !== score;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium text-secondary-foreground">
            {score}
          </span>
          <motion.div
            variants={animationVariants}
            animate={isAnimationTriggered ? 'animate' : 'initial'}
          >
            <TrophyIcon size={16} className="text-primary" />
          </motion.div>
        </div>
      </TooltipTrigger>
      <TooltipContent>Your score</TooltipContent>
    </Tooltip>
  );
};

export default Score;
