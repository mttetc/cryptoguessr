import { StateCreator } from 'zustand';
import { BoundStore } from '../types';
import { COUNTDOWN } from '@/consts';

export type CountdownSlice = {
  direction: 'up' | 'down' | undefined;
  setDirection: (value: 'up' | 'down' | undefined) => void;
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
  direction: undefined,
  setDirection: value => {
    set({ direction: value });
  },
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
