// src/services/user.service.ts
import api from "@/lib/axios";
import { CompanyDto, TalentDto } from "@/types/user";

export const getMe = async (): Promise<TalentDto | CompanyDto> => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

