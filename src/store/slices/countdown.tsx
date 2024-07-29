import { BoundStore } from '@/store/types';
import { StateCreator } from 'zustand';

export type CountdownSlice = {
  isCountdownActive: boolean;
  setCountdownActive: (value: boolean) => void;
};

export const createCountdownSlice: StateCreator<
  BoundStore,
  [],
  [],
  CountdownSlice
> = set => ({
  isCountdownActive: false,
  setCountdownActive: value => {
    set({ isCountdownActive: value });
  },
});
