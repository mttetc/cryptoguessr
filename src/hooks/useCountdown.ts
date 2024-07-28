import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { getConfirmationToast, getNewScore } from '@/helpers';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import useStore from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import useScore from '@/hooks/useScore';

const useCountdown = () => {
  const queryClient = useQueryClient();
  const direction = useStore(state => state.direction);
  const countdown = useStore(state => state.countdown);
  const setCountdown = useStore(state => state.setCountdown);
  const selectedCrypto = useStore(state => state.selectedCrypto);
  const selectedCurrency = useStore(state => state.selectedCurrency);
  const setCountdownActive = useStore(state => state.setCountdownActive);
  const setDirection = useStore(state => state.setDirection);

  const { score, handleScoreUpdate } = useScore();

  const { data: cryptoPrice = 0 } = useReadCryptoPrice({
    params: { crypto: selectedCrypto, currency: selectedCurrency },
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  const startInterval = useCallback(() => {
    setCountdownActive(true);

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev === 0) {
          setCountdownActive(false);
          setDirection(undefined);
          clearInterval(intervalRef.current!);
          return COUNTDOWN;
        }
        return prev - COUNTDOWN_INTERVAL;
      });
    }, COUNTDOWN_INTERVAL * 1000);
  }, [setCountdown, setCountdownActive, setDirection]);

  const startCountdown = useCallback(
    async (direction: 'up' | 'down') => {
      setCountdown(COUNTDOWN);
      setDirection(direction);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

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

      startInterval();
    },
    [
      setCountdown,
      startInterval,
      setDirection,
      score,
      handleScoreUpdate,
      queryClient,
      cryptoPrice,
    ],
  );

  // Continue countdown if it was already started and the user reloads
  useEffect(() => {
    const hasOngoingDirection = !!direction;
    const hasOngoingCountdown = countdown > 0 && countdown < COUNTDOWN;
    const shouldCountdownStartOnLoad =
      hasOngoingDirection && hasOngoingCountdown;
    if (!initializedRef.current && shouldCountdownStartOnLoad) {
      startInterval();
      initializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { startCountdown };
};

export default useCountdown;
