import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { getConfirmationToast, getNewScore } from '@/helpers';
import useScore from '@/hooks/useScore';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import useStore from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

const useCountdown = () => {
  const queryClient = useQueryClient();
  const setCountdown = useStore(state => state.setCountdown);
  const selectedCrypto = useStore(state => state.selectedCrypto);
  const selectedCurrency = useStore(state => state.selectedCurrency);
  const setCountdownActive = useStore(state => state.setCountdownActive);

  const { score, handleScoreUpdate } = useScore();

  const { data: cryptoPrice = 0 } = useReadCryptoPrice({
    params: { crypto: selectedCrypto, currency: selectedCurrency },
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateScore = useCallback(
    async (direction: 'up' | 'down') => {
      const newScore = await getNewScore({
        score,
        queryClient,
        cryptoPrice,
        direction,
      });

      getConfirmationToast({
        newScore,
        previousScore: score,
      });

      const isSameScore = newScore === score;
      if (!isSameScore) {
        handleScoreUpdate(newScore);
      }
    },
    [score, queryClient, cryptoPrice, handleScoreUpdate],
  );

  const startCountdown = useCallback(
    (direction: 'up' | 'down') => {
      setCountdown(COUNTDOWN);
      setCountdownActive(true);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === 0) {
            updateScore(direction);
            setCountdownActive(false);
            clearInterval(intervalRef.current!);
            return COUNTDOWN;
          }
          return prev - COUNTDOWN_INTERVAL;
        });
      }, COUNTDOWN_INTERVAL * 1000);
    },
    [setCountdown, setCountdownActive, updateScore],
  );

  return { startCountdown };
};

export default useCountdown;
