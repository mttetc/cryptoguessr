import { StateCreator } from 'zustand';
import { BoundStore } from '../types';

export type CountdownSlice = {
  countdown: number;
  isCountdownActive: boolean;
  setCountdown: (value: ((countdown: number) => number) | number) => void;
  setCountdownActive: (value: boolean) => void;
};

export const createCountdownSlice: StateCreator<
  BoundStore,
  [],
  [],
  CountdownSlice
> = set => ({
  countdown: 0,
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
