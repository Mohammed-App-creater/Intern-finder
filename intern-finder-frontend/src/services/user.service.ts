// src/services/user.service.ts
import api from "@/lib/axios";
import { User } from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (data: { name: string; email: string }) => {
  const res = await api.post("/users", data);
  return res.data;
};
