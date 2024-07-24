import { useReadScore } from '@/services/scores/hooks';
import useStore from '@/store';
import { motion, Variants } from 'framer-motion';
import { TrophyIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const animationVariants: Variants = {
  animate: { scale: [1, 1.4, 1], transition: { duration: 0.4 } },
  initial: { scale: 1, transition: { duration: 0.4 } },
};

const Score = () => {
  const anonymousId = useStore(state => state.anonymousId);
  const { data = { score: 0 } } = useReadScore(anonymousId);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium text-secondary-foreground">
            {data.score}
          </span>
          <motion.div variants={animationVariants} animate={'animate'}>
            <TrophyIcon size={16} className="text-primary" />
          </motion.div>
        </div>
      </TooltipTrigger>
      <TooltipContent>Your score</TooltipContent>
    </Tooltip>
  );
};

export default Score;
