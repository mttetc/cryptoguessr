import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createCountdownSlice } from '@/store/slices/countdown';
import { createMainSlice } from '@/store/slices/main';
import { createThemeSlice } from '@/store/slices/theme';
import { BoundStore } from '@/store/types';

const version = 6;

const useStore = create<BoundStore>()(
  persist(
    (...args) => {
      const storedData = localStorage.getItem('crypto-guessr-store');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const storeVersion = parsedData.version
          ? Number(parsedData.version)
          : null;
        if (storeVersion !== version) {
          localStorage.removeItem('crypto-guessr-store');
        }
      }

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
        anonymousId: state.anonymousId,
        theme: state.theme,
        selectedCurrency: state.selectedCurrency,
        selectedCrypto: state.selectedCrypto,
      }),
    },
  ),
);

export default useStore;
