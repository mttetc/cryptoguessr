import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createCountdownSlice } from '@/store/slices/countdown';
import { createMainSlice } from '@/store/slices/main';
import { createThemeSlice } from '@/store/slices/theme';
import { BoundStore } from '@/store/types';

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
      version: 2,
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
