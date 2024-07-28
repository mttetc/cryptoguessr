import { CountdownSlice } from '@/store/slices/countdown';
import { MainSlice } from '@/store/slices/main';
import { ThemeSlice } from '@/store/slices/theme';

export type BoundStore = ThemeSlice & MainSlice & CountdownSlice;
