import { CountdownSlice } from './slices/countdown';
import { MainSlice } from './slices/main';
import { ThemeSlice } from './slices/theme';

export type BoundStore = ThemeSlice & MainSlice & CountdownSlice;
