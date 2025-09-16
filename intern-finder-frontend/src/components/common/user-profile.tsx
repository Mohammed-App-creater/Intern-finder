"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const router = useRouter();

  if (!user) return <div>Loading...</div>;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Image
            className="w-10 h-10 rounded-full flex items-center justify-center"
            src={
              (user?.role == "TALENT" ? user.profileImageUrl : user?.logoUrl) ||
              "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg"
            }
            alt={"Profile Picture"}
            width={250}
            height={250}
          />
          <div>
            <p className="text-dark font-medium text-sm">{user?.role === "TALENT" ? user?.fullName : user?.companyName}</p>
            <p className="text-light text-xs">{user?.role === "TALENT" ? user?.fieldOfStudy : user?.industries}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <Button
        variant="ghost"
        className="flex items-center gap-2 p-2 hover:bg-accent w-full sm:w-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          className="w-10 h-10 rounded-full flex items-center justify-center"
          src={
            (user?.role == "TALENT" ? user.profileImageUrl : user?.logoUrl) ||
            "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg"
          }
          alt={"Profile Picture"}
          width={250}
          height={250}
        />
        <div className="hidden sm:block text-left">
          <p className="text-dark font-medium text-sm">John Doe</p>
          <p className="text-light text-xs dark:text-gray-400">
            Software Engineer
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-48 rounded-md border bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 z-50">
          <div className="p-2 space-y-1">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors text-red-600 dark:text-red-400 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
