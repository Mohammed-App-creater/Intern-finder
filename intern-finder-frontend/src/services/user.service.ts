// src/services/user.service.ts
import api from "@/lib/axios";
import { CompanyDto, TalentDto } from "@/types/user";

export const getUsers = async (): Promise<TalentDto[] | CompanyDto[]> => {
  const res = await api.get("/users");
  return res.data;
};

