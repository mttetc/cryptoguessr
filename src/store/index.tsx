import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreProps = {
  score: number;
  setScore: (score: number) => void;
};

const useStore = create(
  persist<StoreProps>(
    set => ({
      score: 0,
      setScore: score => set({ score }),
    }),
    {
      name: 'crypto-guessr-store',
      getStorage: () => localStorage,
    },
  ),
);

export default useStore;
