"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { useAuthStore } from "@/store/auth";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Component that uses useSearchParams
function AuthCallbackContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, setAuth } = useAuthStore();

  useEffect(() => {
    const token = params.get("token");
    console.log("Received token:", token, user);
    if (token) {
      setCookie("token", token, { path: "/" });
      setAuth(token, null);
      if (user?.role === "COMPANY") router.push("/client/dashboard");
      if (user?.role === "TALENT") router.push("/talent/dashboard");
    } else {
      router.replace("/login");
    }
  }, [params, router, setAuth, user?.role, user]);

  return <AuthCallbackUI />;
}

// UI component
function AuthCallbackUI() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 rounded-2xl bg-white/10 px-12 py-10 shadow-2xl backdrop-blur-lg"
      >
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <h1 className="text-xl font-semibold text-white">Signing you in…</h1>
        </div>

        <p className="text-center text-sm text-white/80">
          Please wait while we connect your Google account securely.
        </p>

        <motion.div
          className="h-1 w-48 overflow-hidden rounded-full bg-white/30"
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="h-full w-full rounded-full bg-white/80" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Main component with Suspense
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<AuthCallbackUI />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
