import { create } from "zustand";

type ThemeState = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const useTheme = create<ThemeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
