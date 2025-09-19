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

  const user = useAuthStore().user;
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

  // Get first letters for fallback avatar
  const getInitials = () => {
    if (user?.role === "TALENT") {
      return (
        user?.fullName
          ?.split(" ")
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join("") || ""
      );
    } else {
      return (
        user?.companyName
          ?.split(" ")
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join("") || ""
      );
    }
  };

  // Get profile image URL based on role
  const getProfileImageUrl = () => {
    if (user?.role === "TALENT") {
      return user?.profileImageUrl;
    } else {
      return user?.logoUrl;
    }
  };

  // Get display name based on role
  const getDisplayName = () => {
    return user?.role === "TALENT" ? user?.fullName : user?.companyName;
  };

  // Get subtitle text based on role
  const getSubtitle = () => {
    if (user?.role === "TALENT") {
      return user?.fieldOfStudy
        ? user.fieldOfStudy.length > 20
          ? user.fieldOfStudy.substring(0, 20) + "..."
          : user.fieldOfStudy
        : "";
    } else {
      return user?.industries || "";
    }
  };

  if (!mounted) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
            {getProfileImageUrl() ? (
              <Image
                className="w-10 h-10 rounded-full"
                src={getProfileImageUrl() || "/placeholder-avatar.png"}
                alt="Profile Picture"
                width={40}
                height={40}
              />
            ) : (
              <span className="text-dark font-medium">
                {getInitials() || "U"}
              </span>
            )}
          </div>
          <div>
            <p className="text-dark font-medium text-sm">
              {getDisplayName() || "User"}
            </p>
            <p className="text-light text-xs">{getSubtitle()}</p>
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
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
          {getProfileImageUrl() ? (
            <Image
              className="w-10 h-10 rounded-full"
              src={getProfileImageUrl() || "/placeholder-avatar.png"}
              alt="Profile Picture"
              width={40}
              height={40}
            />
          ) : (
            <span className="text-dark font-medium">
              {getInitials() || "U"}
            </span>
          )}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-dark font-medium text-sm">
            {getDisplayName() || "User"}
          </p>
          <p className="text-light text-xs dark:text-gray-400">
            {getSubtitle()}
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
