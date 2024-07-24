import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { getCryptoPrice, getNewScore, invalidateCryptoPrices } from '@/helpers';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import useStore from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import useScore from './useScore';

const useCountdown = () => {
  const queryClient = useQueryClient();
  const selectedCrypto = useStore(state => state.selectedCrypto);
  const selectedCurrency = useStore(state => state.selectedCurrency);
  const setCountdownActive = useStore(state => state.setCountdownActive);
  const setCountdown = useStore(state => state.setCountdown);

  const { score, handleScoreUpdate } = useScore();

  const { data: cryptoPrice = 0 } = useReadCryptoPrice({
    params: { crypto: selectedCrypto, currency: selectedCurrency },
  });

  return useCallback(
    (direction: 'up' | 'down') => {
      setCountdown(COUNTDOWN);
      setCountdownActive(true);

      const interval = setInterval(async () => {
        const countdown = useStore.getState().countdown;

        if (countdown === 0) {
          setCountdownActive(false);
          clearInterval(interval);

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

          handleScoreUpdate(newScore);
          return;
        }

        setCountdown(prev => prev - COUNTDOWN_INTERVAL / 1000);
      }, COUNTDOWN_INTERVAL);

      return () => clearInterval(interval);
    },
    [
      queryClient,
      selectedCrypto,
      selectedCurrency,
      handleScoreUpdate,
      setCountdown,
      setCountdownActive,
      score,
      cryptoPrice,
    ],
  );
};

export default useCountdown;
