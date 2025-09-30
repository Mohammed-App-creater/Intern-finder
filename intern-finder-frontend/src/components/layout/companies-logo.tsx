"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import Image from "next/image";

export default function CompaniesDropdown() {
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

  const user = useAuthStore().user;

  if (!user) return <div>Loading...</div>;

  // Get profile image URL based on role
  const getProfileImageUrl = () => {
    if (user?.role === "TALENT") {
      return user?.profileImageUrl;
    } else {
      return (
        user?.logoUrl ||
        "https://cdn-icons-png.flaticon.com/128/5968/5968835.png"
      );
    }
  };

  // Get display name based on role
  const getDisplayName = () => {
    return user?.role === "TALENT"
      ? user?.fullName
      : user?.companyName || "Bright Tech";
  };

  // Current company data from user
  const currentCompany = {
    name: getDisplayName(),
    logo: getProfileImageUrl(),
    role: "Company",
  };

  // Mock companies list - replace with actual data from your API/store
  const companies = [
    {
      id: 1,
      name: "Bright Tech",
      logo: "https://cdn-icons-png.flaticon.com/128/5968/5968835.png",
      role: "Company",
    },
    {
      id: 2,
      name: "Tech Corp",
      logo: "https://cdn-icons-png.flaticon.com/128/5968/5968835.png",
      role: "Company",
    },
    {
      id: 3,
      name: "Innovate Inc",
      logo: "https://cdn-icons-png.flaticon.com/128/5968/5968835.png",
      role: "Company",
    },
  ];

  const handleCompanySwitch = (companyId: number) => {
    // Add your company switching logic here
    console.log("Switching to company:", companyId);
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Image
            className="w-10 h-10 rounded-full flex items-center justify-center"
            src={
              currentCompany.logo ??
              "https://cdn-icons-png.flaticon.com/128/5968/5968835.png"
            }
            alt={"Company Logo"}
            width={250}
            height={250}
          />
          <div>
            <p className="text-light font-medium text-md">
              {currentCompany.role}
            </p>
            <p className="text-white text-lg">{currentCompany.name}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Company Profile Button */}
      <Button
        variant="none"
        className="flex items-center gap-6 p-2 w-full sm:w-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <Image
            className="w-10 h-10 rounded-full"
            src={
              currentCompany.logo ??
              "https://cdn-icons-png.flaticon.com/128/5968/5968835.png"
            }
            alt="Company Logo"
            width={40}
            height={40}
          />
        </div>
        <div>
          <p className="text-light font-medium text-md">
            {currentCompany.role}
          </p>
          <p className="text-white text-lg">{currentCompany.name}</p>
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
          <div className="p-2 space-y-1">
            {/* Current Company */}
            <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b">
              Current Company
            </div>

            {/* Companies List */}
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleCompanySwitch(company.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer ${
                  company.name === currentCompany.name ? "bg-gray-100" : ""
                }`}
              >
                <Image
                  className="w-6 h-6 rounded-full"
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  width={24}
                  height={24}
                />
                <div className="text-left">
                  <p className="text-dark font-medium">{company.name}</p>
                  <p className="text-light text-xs">{company.role}</p>
                </div>
              </button>
            ))}

            {/* Add Company Option */}
            <button
              onClick={() => {
                // Add your add company logic here
                console.log("Add new company");
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors text-blue-600 cursor-pointer border-t mt-1"
            >
              <div className="w-6 h-6 rounded-full border-2 border-dashed border-blue-600 flex items-center justify-center">
                <span className="text-blue-600 text-xs">+</span>
              </div>
              <span>Add Company</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
