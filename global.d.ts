import { BoundStore } from './src/store/types';

// global.d.ts
export {};

declare global {
  interface Window {
    store: BoundStore;
  }
}
