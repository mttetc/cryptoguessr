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
      version: 1,
      partialize: state => {
        const {
          countdown,
          anonymousId,
          theme,
          selectedCurrency,
          selectedCrypto,
          direction,
        } = state;
        return {
          direction,
          countdown,
          anonymousId,
          theme,
          selectedCurrency,
          selectedCrypto,
        };
      },
    },
  ),
);

export default useStore;
