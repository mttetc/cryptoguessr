import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createCountdownSlice } from './slices/countdown';
import { createMainSlice } from './slices/main';
import { createThemeSlice } from './slices/theme';
import { BoundStore } from './types';

const useStore = create<BoundStore>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createCountdownSlice(...a),
      ...createMainSlice(...a),
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
