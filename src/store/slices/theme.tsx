import { StateCreator } from 'zustand';

type Theme = 'dark' | 'light' | 'system';

export type ThemeSlice = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const createThemeSlice: StateCreator<
  ThemeSlice,
  [],
  [],
  ThemeSlice
> = set => ({
  theme: 'system',
  setTheme: (theme: Theme) => {
    set({ theme });
  },
});
