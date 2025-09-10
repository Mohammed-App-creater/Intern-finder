"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <Moon className="text-light" />
        <span className="sr-only">Toggle theme</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center cursor-pointer hover:scale-120"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="relative w-6 h-6">
        <Moon className="text-light absolute inset-0 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 dark:hidden" />
        <Sun className="text-light absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hidden dark:block" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
