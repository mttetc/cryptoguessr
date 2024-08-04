import { COUNTDOWN } from '@/consts';
import { BoundStore } from '@/store/types';
import { StateCreator } from 'zustand';

export type CountdownSlice = {
  countdown: number;
  setCountdown: (value: number | ((prevValue: number) => number)) => void;
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
  countdown: COUNTDOWN,
  setCountdown: value => {
    set(state => ({
      countdown: typeof value === 'function' ? value(state.countdown) : value,
    }));
  },
  direction: undefined,
  setDirection: value => {
    set({ direction: value });
  },
  isCountdownActive: false,
  setCountdownActive: value => {
    set({ isCountdownActive: value });
  },
});
