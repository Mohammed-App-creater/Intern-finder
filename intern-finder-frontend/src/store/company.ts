import { create } from "zustand";
import { companyQueryParams } from "../types/user";

interface CompanyFilterStore {
    filters: companyQueryParams;
    setFilters: (filters: Partial<companyQueryParams>) => void;
    resetFilters: () => void;
}

export const useCompanyFilterStore = create<CompanyFilterStore>((set) => ({
    filters: {
        page: 1,
        limit: 10,
        search: "",
        location: "",
        industries: [],
        teamSize: [],
        sortBy: "companyName",
        sortOrder: "asc",
    },
    setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
    resetFilters: () =>
        set({
            filters: {
                page: 1,
                limit: 10,
                search: "",
                location: "",
                industries: [],
                teamSize: [],
                sortBy: "companyName",
                sortOrder: "asc",
            },
        }),
}));
