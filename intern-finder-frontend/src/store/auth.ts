import { create } from "zustand";
import { CompanyDto, TalentDto } from "@/types/user";
import { tempoAuthState } from "@/types/auth"

interface AuthState {
  token: string | null;
  user: CompanyDto | TalentDto | null;
  setAuth: (token: string, user: CompanyDto | TalentDto | null) => void;
  clearAuth: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null }),
}));


export const tempoAuthstore = create<tempoAuthState>((set) => ({
  id: null,
  fullName: null,
  email: null,
  role: null,
  setAuth: (id: string | null, fullName: string | null, email: string | null, role: string | null) =>
    set({ id, fullName, email, role }),
  clearAuth: () => set({ id: null, fullName: null, email: null, role: null }),
}));

