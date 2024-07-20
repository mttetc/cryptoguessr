import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { cryptoPriceKeys } from '@/services/cryptoPrice/queryKeys';
import { ReadCryptoPriceParams } from '@/services/cryptoPrice/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

const useCountdown = (params: ReadCryptoPriceParams) => {
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();

  const clearCountdown = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(
    (direction: 'up' | 'down') => {
      setCountdown(COUNTDOWN);
      clearCountdown();

      timerRef.current = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 1) {
            clearCountdown();

            queryClient.invalidateQueries({
              queryKey: cryptoPriceKeys.list(params),
            });
          }
          return prevCountdown > 0 ? prevCountdown - 1 : 0;
        });
      }, COUNTDOWN_INTERVAL);
    },
    [clearCountdown, queryClient, params],
  );

  useEffect(() => {
    return () => clearCountdown();
  }, [clearCountdown]);

  return { countdown, onStartCountdown: startCountdown };
};

export default useCountdown;
