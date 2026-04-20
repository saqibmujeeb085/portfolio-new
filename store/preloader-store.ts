import { create } from "zustand";

type PreloaderStore = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const usePreloaderStore = create<PreloaderStore>((set) => ({
  isLoading: true,
  setIsLoading: (value) => set({ isLoading: value }),
}));
