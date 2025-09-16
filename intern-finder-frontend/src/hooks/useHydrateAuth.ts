"use client"
import { getCookie } from "cookies-next";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

export function useHydrateAuth() {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const token = getCookie("token") as string | undefined;
    if (token) {
      setAuth(token, null);
    }
  }, [setAuth]);
}
