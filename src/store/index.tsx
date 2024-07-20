import { Crypto, Currency } from '@/services/cryptoPrice/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type StoreProps = {
  score: number;
  setScore: (score: number) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  selectedCrypto: Crypto;
  setSelectedCrypto: (crypto: Crypto) => void;
};

const useStore = create(
  persist<StoreProps>(
    set => ({
      selectedCurrency: 'USD',
      selectedCrypto: 'BTC',
      setSelectedCurrency: currency => set({ selectedCurrency: currency }),
      setSelectedCrypto: crypto => set({ selectedCrypto: crypto }),
      score: 0,
      setScore: score => set({ score }),
    }),
    {
      name: 'crypto-guessr-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useStore;
