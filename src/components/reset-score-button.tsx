import { useReadScore, useUpdateScore } from '@/services/scores/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const buttonVariants = {
  hidden: { opacity: 0, width: 0, transition: { duration: 0.4 } },
  visible: { opacity: 1, width: 'auto', transition: { duration: 0.4 } },
};

type ResetScoreButtonProps = {
  anonymousId: string;
};

const ResetScoreButton = ({ anonymousId }: ResetScoreButtonProps) => {
  const { data = { score: 0 } } = useReadScore(anonymousId);
  const { mutate: updateScore } = useUpdateScore();

  const isButtonVisible = data.score > 0;

  const handleReset = () => {
    updateScore({ id: anonymousId, score: 0 });
  };

  return (
    <AnimatePresence>
      {isButtonVisible && (
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={buttonVariants}
            >
              <Button
                onClick={handleReset}
                variant="secondary"
                size="icon"
                data-testid="reset-score-button"
              >
                <RefreshCcw className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>Reset score</TooltipContent>
        </Tooltip>
      )}
    </AnimatePresence>
  );
};
export default ResetScoreButton;
