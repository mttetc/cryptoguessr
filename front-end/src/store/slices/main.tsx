import { Crypto, Currency } from '@/services/cryptoPrice/types';
import { StateCreator } from 'zustand';

export type MainSlice = {
  anonymousId: string | undefined;
  setAnonymousId: (id: string) => void;
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
  anonymousId: undefined,
  setAnonymousId: id => set({ anonymousId: id }),
  selectedCurrency: 'USD',
  selectedCrypto: 'BTC',
  setSelectedCurrency: currency => set({ selectedCurrency: currency }),
  setSelectedCrypto: crypto => set({ selectedCrypto: crypto }),
});
