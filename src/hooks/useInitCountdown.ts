import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { getNewScore } from '@/helpers';
import useStore from '@/store';
import { useCallback } from 'react';
import useScore from './useScore';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';

const useInitCountdown = () => {
  const selectedCrypto = useStore(state => state.selectedCrypto);
  const selectedCurrency = useStore(state => state.selectedCurrency);
  const setCountdownActive = useStore(state => state.setCountdownActive);
  const setCountdown = useStore(state => state.setCountdown);

  const { score, invalidateCryptoPrices, getUpdatedPrice, handleScoreUpdate } =
    useScore();

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
          clearInterval(interval);
          await invalidateCryptoPrices();
          const updatedPrice = getUpdatedPrice();
          const newScore = getNewScore({
            updatedPrice,
            currentScore: score,
            price: cryptoPrice,
            direction,
          });
          setCountdownActive(false);
          handleScoreUpdate(newScore);
          return;
        }

        setCountdown(prev => prev - COUNTDOWN_INTERVAL / 1000);
      }, COUNTDOWN_INTERVAL);

      return () => clearInterval(interval);
    },
    [
      invalidateCryptoPrices,
      getUpdatedPrice,
      handleScoreUpdate,
      setCountdown,
      setCountdownActive,
      score,
      cryptoPrice,
    ],
  );
};

export default useInitCountdown;
