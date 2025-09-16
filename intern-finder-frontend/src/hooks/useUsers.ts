import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/user.service";

export const useMe = () => {
  return useQuery({ queryKey: ["me"], queryFn: getMe });
};


