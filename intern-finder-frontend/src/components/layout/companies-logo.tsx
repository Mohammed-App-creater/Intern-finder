"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  if (!mounted) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Image
            className="w-10 h-10 rounded-full flex items-center justify-center"
            src={"https://cdn-icons-png.flaticon.com/128/5968/5968835.png"}
            alt={"Profile Picture"}
            width={250}
            height={250}
          />
          <div>
            <p className="text-light font-medium text-md">Company</p>
            <p className="text-white text-lg">Nomad</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <Button
        variant="none"
        className="flex items-center gap-6 p-2 w-full sm:w-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          className="w-10 h-10 rounded-full flex items-center justify-center"
          src={"https://cdn-icons-png.flaticon.com/128/5968/5968835.png"}
          alt={"Profile Picture"}
          width={250}
          height={250}
        />
        <div>
          <p className="text-light font-medium text-md">Company</p>
          <p className="text-white text-lg">Nomad</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-white transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-48 rounded-md border bg-white shadow-lg z-50">
          <div className="flex justify-center p-2 space-y-1">No other companies</div>
        </div>
      )}
    </div>
  );
}
