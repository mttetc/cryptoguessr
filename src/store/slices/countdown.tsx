import { StateCreator } from 'zustand';
import { BoundStore } from '@/store/types';
import { COUNTDOWN } from '@/consts';

export type CountdownSlice = {
  countdown: number;
  setCountdown: (value: ((countdown: number) => number) | number) => void;
  isCountdownActive: boolean;
  setCountdownActive: (value: boolean) => void;
};

export const createCountdownSlice: StateCreator<
  BoundStore,
  [],
  [],
  CountdownSlice
> = set => ({
  countdown: COUNTDOWN,
  setCountdown: value => {
    set(state => ({
      countdown: typeof value === 'function' ? value(state.countdown) : value,
    }));
  },
  isCountdownActive: false,
  setCountdownActive: value => {
    set({ isCountdownActive: value });
  },
});
