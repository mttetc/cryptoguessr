import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { getNewScore } from '@/helpers';
import useStore from '@/store';
import { useCallback } from 'react';
import useScore from './useScore';

const useInitCountdown = () => {
  const { setCountdownActive, setCountdown, price, setPrice } = useStore();

  const { score, invalidateCryptoPrices, getUpdatedPrice, handleScoreUpdate } =
    useScore();

  const startCountdown = useCallback(
    (direction: 'up' | 'down') => {
      setCountdown(COUNTDOWN);
      setCountdownActive(true);

      const interval = setInterval(async () => {
        const countdown = useStore.getState().countdown;
        if (countdown === 0) {
          clearInterval(interval);

          await invalidateCryptoPrices();

          const updatedPrice = getUpdatedPrice();

          const newScore = getNewScore({
            updatedPrice,
            currentScore: score,
            price,
            direction,
          });

          setPrice(updatedPrice);
          setCountdownActive(false);

          handleScoreUpdate(newScore);
          return;
        }
        setCountdown(prev => prev - 1);
      }, COUNTDOWN_INTERVAL);

      return () => clearInterval(interval);
    },
    [
      invalidateCryptoPrices,
      getUpdatedPrice,
      handleScoreUpdate,
      setCountdown,
      setCountdownActive,
      setPrice,
      score,
      price,
    ],
  );

  return { startCountdown };
};

export default useInitCountdown;
