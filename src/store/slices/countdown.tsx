import { StateCreator } from 'zustand';
import { BoundStore } from '../types';

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
