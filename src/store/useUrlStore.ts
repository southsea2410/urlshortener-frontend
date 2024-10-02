import { create } from "zustand";

type UrlState = {
  shortenedUrls: string[];
}

type UrlAction = {
  addUrl: (urlId: string) => void;
  
}

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
