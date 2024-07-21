import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { cryptoPriceKeys } from '@/services/cryptoPrice/queryKeys';
import { QueryClient } from '@tanstack/react-query';
import { StateCreator } from 'zustand';
import { BoundStore } from '../types';

export type CountdownSlice = {
  countdown: number;
  isCountdownActive: boolean;
  startCountdown: ({
    direction,
    queryClient,
  }: {
    direction: 'up' | 'down';
    queryClient: QueryClient;
  }) => void;
};

export const createCountdownSlice: StateCreator<
  BoundStore,
  [],
  [],
  CountdownSlice
> = (set, get) => ({
  countdown: 0,
  isCountdownActive: false,
  startCountdown: ({ queryClient, direction }) => {
    set({ countdown: COUNTDOWN, isCountdownActive: true });

    const interval = setInterval(async () => {
      const state = get();

      if (state.countdown === 0) {
        clearInterval(interval);

        await queryClient.invalidateQueries({
          queryKey: cryptoPriceKeys.list({
            crypto: state.selectedCrypto,
            currency: state.selectedCurrency,
          }),
        });

        const updatedPrice =
          queryClient.getQueryData<number>(
            cryptoPriceKeys.list({
              crypto: state.selectedCrypto,
              currency: state.selectedCurrency,
            }),
          ) ?? state.price;

        const newScore = Math.max(
          0,
          direction === 'down'
            ? updatedPrice < state.price
              ? state.score + 1
              : state.score - 1
            : updatedPrice > state.price
              ? state.score + 1
              : state.score - 1,
        );

        set({
          score: newScore,
          countdown: 0,
          price: updatedPrice,
          isCountdownActive: false,
        });
        return;
      }
      set({ countdown: state.countdown - 1 });
    }, COUNTDOWN_INTERVAL);
  },
});
