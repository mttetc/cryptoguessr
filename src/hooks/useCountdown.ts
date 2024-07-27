import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { getConfirmationToast, getNewScore } from '@/helpers';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import useStore from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import useScore from './useScore';

const useCountdown = () => {
  const queryClient = useQueryClient();
  const [countdown, setCountdown] = useState(COUNTDOWN);
  const selectedCrypto = useStore(state => state.selectedCrypto);
  const selectedCurrency = useStore(state => state.selectedCurrency);
  const setCountdownActive = useStore(state => state.setCountdownActive);

  const { score, handleScoreUpdate } = useScore();

  const { data: cryptoPrice = 0 } = useReadCryptoPrice({
    params: { crypto: selectedCrypto, currency: selectedCurrency },
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = useCallback(
    async (direction: 'up' | 'down') => {
      setCountdownActive(true);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      const newScore = await getNewScore({
        direction,
        score,
        queryClient,
        cryptoPrice,
      });

      getConfirmationToast({
        newScore,
        previousScore: score,
      });

      const isSameScore = newScore === score;
      if (!isSameScore) {
        handleScoreUpdate(newScore);
      }

      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === 0) {
            setCountdownActive(false);
            clearInterval(intervalRef.current!);
            return COUNTDOWN;
          }

          return prev - COUNTDOWN_INTERVAL;
        });
      }, COUNTDOWN_INTERVAL * 1000);
    },
    [score, handleScoreUpdate, queryClient, cryptoPrice, setCountdownActive],
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { countdown, startCountdown };
};

export default useCountdown;
