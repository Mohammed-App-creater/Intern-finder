"use client";
import { getCookie } from "cookies-next";
import { useAuthStore } from "@/store/auth";
import { useMe } from "@/hooks/useUsers";
import { useEffect } from "react";

export function useHydrateAuth() {
  const { setAuth } = useAuthStore();
  const token = getCookie("token") as string | undefined;

  // Fetch the user if we have a token
  const { data: user } = useMe();
  useEffect(() => {
    if (token) {
      setAuth(token, user ?? null);
    }
  }, [token, user, setAuth]);
}
