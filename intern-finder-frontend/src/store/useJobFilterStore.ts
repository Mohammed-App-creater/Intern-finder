import { create } from "zustand";
import { JobFilters } from "@/types/job"; // your zod schema type

interface JobFilterStore {
  filters: JobFilters;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
}

interface JobFilterStore {
  filters: JobFilters;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
}

export const useJobFilterStore = create<JobFilterStore>((set) => ({
  filters: {},
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: {} }),
}));
