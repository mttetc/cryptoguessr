import { RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import useStore from '@/store';
import { AnimatePresence, motion } from 'framer-motion';

const buttonVariants = {
  hidden: { opacity: 0, width: 0, transition: { duration: 0.4 } },
  visible: { opacity: 1, width: 'auto', transition: { duration: 0.4 } },
};

const ResetScoreButton = () => {
  const { setScore, score } = useStore();

  const isButtonVisible = score > 0;

  const handleReset = () => {
    setScore(0);
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
              <Button onClick={handleReset} variant="secondary" size="icon">
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
