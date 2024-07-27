import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import {
  getConfirmationToast,
  getCryptoPrice,
  getNewScore,
  invalidateCryptoPrices,
} from '@/helpers';
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

  const updateScore = useCallback(
    async (direction: 'up' | 'down') => {
      await invalidateCryptoPrices({
        queryClient,
        selectedCrypto,
        selectedCurrency,
      });

      const updatedPrice = getCryptoPrice({
        queryClient,
        selectedCrypto,
        selectedCurrency,
      });

      const newScore = getNewScore({
        updatedPrice,
        currentScore: score,
        price: cryptoPrice,
        direction,
      });

      const isSameScore = newScore === score;

      getConfirmationToast({
        newScore,
        previousScore: score,
      });

      // no need to update the score if it's the same
      if (isSameScore) {
        return;
      }

      handleScoreUpdate(newScore);
    },
    [
      queryClient,
      selectedCrypto,
      selectedCurrency,
      score,
      cryptoPrice,
      handleScoreUpdate,
    ],
  );

  const startCountdown = useCallback(
    (direction: 'up' | 'down') => {
      setCountdownActive(true);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === 0) {
            setCountdownActive(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            updateScore(direction);
            return COUNTDOWN;
          }

          return prev - COUNTDOWN_INTERVAL;
        });
      }, COUNTDOWN_INTERVAL * 1000);
    },
    [updateScore, setCountdown, setCountdownActive],
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
