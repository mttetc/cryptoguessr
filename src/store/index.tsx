import { COUNTDOWN, COUNTDOWN_INTERVAL } from '@/consts';
import { cryptoPriceKeys } from '@/services/cryptoPrice/queryKeys';
import { Crypto, Currency } from '@/services/cryptoPrice/types';
import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Theme = 'dark' | 'light' | 'system';

type StoreProps = {
  price: number;
  score: number;
  setScore: (score: number) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  selectedCrypto: Crypto;
  setSelectedCrypto: (crypto: Crypto) => void;
  countdown: number;
  isCountdownActive: boolean;
  startCountdown: ({
    direction,
    queryClient,
  }: {
    direction: 'up' | 'down';
    queryClient: QueryClient;
  }) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const useStore = create<StoreProps>()(
  persist(
    (set, get) => ({
      price: 0,
      selectedCurrency: 'USD',
      selectedCrypto: 'BTC',
      setSelectedCurrency: currency => set({ selectedCurrency: currency }),
      setSelectedCrypto: crypto => set({ selectedCrypto: crypto }),
      score: 0,
      setScore: score => set({ score }),
      theme: 'system',
      setTheme: theme => {
        set({ theme });
      },
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
    }),
    {
      name: 'crypto-guessr-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => {
        const { price, theme, score, selectedCurrency, selectedCrypto } = state;
        return { price, theme, score, selectedCurrency, selectedCrypto };
      },
    },
  ),
);

export default useStore;
