import { create } from "zustand";
import { JobFilterStore } from "@/types/job"; // your zod schema type



export const useJobFilterStore = create<JobFilterStore>((set) => ({
  filters: {},
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: {} }),
}));
