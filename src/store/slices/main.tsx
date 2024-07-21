import { Crypto, Currency } from '@/services/cryptoPrice/types';
import { StateCreator } from 'zustand';

export type MainSlice = {
  price: number;
  score: number;
  setScore: (score: number) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  selectedCrypto: Crypto;
  setSelectedCrypto: (crypto: Crypto) => void;
};

export const createMainSlice: StateCreator<
  MainSlice,
  [],
  [],
  MainSlice
> = set => ({
  price: 0,
  selectedCurrency: 'USD',
  selectedCrypto: 'BTC',
  setSelectedCurrency: currency => set({ selectedCurrency: currency }),
  setSelectedCrypto: crypto => set({ selectedCrypto: crypto }),
  score: 0,
  setScore: score => set({ score }),
});
