import { BoundStore } from '@/store/types';
import { StateCreator } from 'zustand';

export type CountdownSlice = {
  direction: 'up' | 'down' | undefined;
  setDirection: (value: 'up' | 'down' | undefined) => void;
  isCountdownActive: boolean;
  setCountdownActive: (value: boolean) => void;
};

export const createCountdownSlice: StateCreator<
  BoundStore,
  [],
  [],
  CountdownSlice
> = set => ({
  direction: undefined,
  setDirection: value => {
    set({ direction: value });
  },
  isCountdownActive: false,
  setCountdownActive: value => {
    set({ isCountdownActive: value });
  },
});
