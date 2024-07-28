import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createCountdownSlice } from '@/store/slices/countdown';
import { createMainSlice } from '@/store/slices/main';
import { createThemeSlice } from '@/store/slices/theme';
import { BoundStore } from '@/store/types';

const version = 4;

const useStore = create<BoundStore>()(
  persist(
    (...args) => {
      const storeVersion = Number(localStorage.getItem('version'));
      if (storeVersion !== version) {
        localStorage.removeItem('crypto-guessr-store');
      }
      localStorage.setItem('version', version.toString());

      return {
        ...createThemeSlice(...args),
        ...createCountdownSlice(...args),
        ...createMainSlice(...args),
      };
    },
    {
      name: 'crypto-guessr-store',
      storage: createJSONStorage(() => localStorage),
      version,
      partialize: state => ({
        countdown: state.countdown,
        anonymousId: state.anonymousId,
        theme: state.theme,
        selectedCurrency: state.selectedCurrency,
        selectedCrypto: state.selectedCrypto,
      }),
    },
  ),
);

export default useStore;
