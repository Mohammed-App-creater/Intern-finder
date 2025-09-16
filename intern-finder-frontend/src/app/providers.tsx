"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState, useEffect } from "react";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* ✅ Hydrate after QueryClient is available */}
      <HydrateAuthWrapper>
        {mounted ? (
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        ) : (
          children
        )}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </HydrateAuthWrapper>
    </QueryClientProvider>
  );
}

function HydrateAuthWrapper({ children }: { children: ReactNode }) {
  useHydrateAuth();
  return <>{children}</>;
}
