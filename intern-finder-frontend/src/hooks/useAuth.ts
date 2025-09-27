import { useAuthStore } from "@/store/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CompanyRegisterStep1Dto, CompanyRegisterStep2Dto, TalentRegisterStep1Dto, TalentRegisterStep2Dto } from "@/types/auth";
import { login, getProfile, talentRegisterStep2, companyRegisterStep2, talentRegisterStep1, companyRegisterStep1, googleLogin } from "@/services/auth";
import { useCallback } from "react";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      setAuth(data.data.token, { ...data.data.user, role: data.data.role });
      setCookie("token", data.data.token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useGoogleLogin = () => {
  return useCallback(() => {
    googleLogin();
  }, []);
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth); 

  return () => {
    clearAuth();
    deleteCookie("token");
    queryClient.clear();
  };
};

export const useTalentRegisterStep1 = () => {
  return useMutation({
    mutationKey: ["register", "talent", "step1"],
    mutationFn: (registrationData: TalentRegisterStep1Dto) =>
      talentRegisterStep1(registrationData),
  });
};

export const useCompanyRegisterStep1 = () => {
  return useMutation({
    mutationKey: ["register", "company", "step1"],
    mutationFn: (registrationData: CompanyRegisterStep1Dto) =>
      companyRegisterStep1(registrationData),
  });
};

export const useTalentRegisterStep2 = () => {
  return useMutation({
    mutationKey: ["register", "talent", "step2"],
    mutationFn: (registrationData: TalentRegisterStep2Dto) =>
      talentRegisterStep2(registrationData),
  });
};

export const useCompanyRegisterStep2 = () => {
  return useMutation({
    mutationKey: ["register", "company", "step2"],
    mutationFn: (registrationData: CompanyRegisterStep2Dto) =>
      companyRegisterStep2(registrationData),
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getProfile,
    retry: false, // if unauthorized, don’t keep retrying
  });
};
