import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import useScore from '@/hooks/useScore';
import useStore from '@/store';
import { useCallback, useRef, useState } from 'react';

const useCountdown = () => {
  const [countdown, setCountdown] = useState(COUNTDOWN);
  const setCountdownActive = useStore(state => state.setCountdownActive);
  const setDirection = useStore(state => state.setDirection);

  const { onScoreUpdate } = useScore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = useCallback(
    (direction: 'up' | 'down') => {
      setCountdownActive(true);
      setDirection(direction);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === 0) {
            onScoreUpdate(direction);
            setCountdownActive(false);
            setDirection(undefined);
            clearInterval(intervalRef.current!);
            return COUNTDOWN;
          }
          return prev - COUNTDOWN_INTERVAL;
        });
      }, COUNTDOWN_INTERVAL * 1000);
    },
    [setCountdown, setDirection, setCountdownActive, onScoreUpdate],
  );

  return { countdown, startCountdown };
};

export default useCountdown;
