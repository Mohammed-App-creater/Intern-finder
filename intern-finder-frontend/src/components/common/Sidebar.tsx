"use client";

import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Search,
  User,
  Settings,
  HelpCircle,
  Building2,
  UsersRound,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SidebarRectangle from "@/components/icons/sidebar_rectangle.png";
import UserProfile from "@/components/common/user-profile";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Handle navigation with conditional path building
  const handleNavigation = (href: string) => {
    // Check if we're in a talent or client dashboard
    if (
      pathname.startsWith("/talent/dashboard") ||
      pathname.startsWith("/client/dashboard")
    ) {
      // Extract the base path (/talent/dashboard or /client/dashboard)
      const basePath = pathname.split("/").slice(0, 3).join("/");
      // Navigate to basePath + href (e.g., /talent/dashboard/company)
      router.push(`${basePath}${href}`);
    } else {
      // Default navigation
      router.push(href);
    }
  };

  // Helper function to determine if a path is active
  const isActive = (href: string, isDashboard: boolean = false) => {
    if (isDashboard) {
      // For dashboard, check if we're exactly at /dashboard or /dashboard/ with nothing after
      return (
        pathname === "/talent/dashboard" ||
        pathname === "/client/dashboard" ||
        pathname === "/client/post"
      );
    }

    // For other links, check if the path includes the href
    return pathname.includes(href);
  };

  const navigationItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "",
      active: isActive("", true),
      isDashboard: true,
    },
    {
      icon: Building2,
      label: "Company Profile",
      href: "/profile",
      active: isActive("/profile"),
      isDashboard: false,
    },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/messages",
      active: isActive("/messages"),
      isDashboard: false,
    },
    {
      icon: UsersRound,
      label: "All Applicants",
      href: "/applicants",
      active: isActive("/applicants"),
      isDashboard: false,
    },
    {
      icon: FileText,
      label: "My Applications",
      href: "/applications",
      active: isActive("/applications"),
      isDashboard: false,
    },
    {
      icon: Search,
      label: "Company",
      href: "/company",
      active: isActive("/company"),
      isDashboard: false,
    },
    {
      icon: User,
      label: "My Profile",
      href: "/profile",
      active: isActive("/profile"),
      isDashboard: false,
    },
    {
      icon: ClipboardList,
      label: "Job Listing",
      href: "/joblisting",
      active: isActive("/joblisting"),
      isDashboard: false,
    },
  ];

  const settingsItems = [
    {
      icon: Settings,
      label: "Setting",
      href: "/settings",
      active: isActive("/settings"),
    },
    {
      icon: HelpCircle,
      label: "Support",
      href: "/#",
      active: isActive("/support"),
    },
  ];

  return (
    <div
      className={cn(
        "w-70 bg-secondary border-r border-border h-170 flex flex-col rounded-lg my-10 ml-10 pb-2 flex-shrink-0",
        className
      )}
    >
      <nav className="flex-1">
        <ul className="space-y-1 mb-4">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <div className="relative flex h-full w-full">
                {/* Vertical Line */}
                <div
                  className={cn(
                    "hidden",
                    item.active
                      ? "absolute top-2 flex items-center transition-colors"
                      : ""
                  )}
                >
                  <Image
                    src={SidebarRectangle}
                    alt={"Sidebar Rectangle Icon"}
                  />
                </div>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "flex items-center gap-4 px-3 py-2 text-md transition-colors w-full cursor-pointer",
                    item.active
                      ? item.isDashboard
                        ? "bg-[#30968930] text-primary font-medium px-4 rounded-t-lg"
                        : "bg-[#30968930] text-primary font-medium px-4"
                      : "text-dark px-4 hover:bg-primary/10"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 text-dark",
                      item.active ? "text-primary" : ""
                    )}
                  />
                  {item.label}
                </button>
              </div>
            </li>
          ))}
        </ul>
        {/* Horizontal Line */}
        <div className="border-1 border-text-light/20 w-full h-0.5"></div>
        {/* Setting Section */}
        <div className="mt-5">
          <h3 className="px-3 text-xs font-semibold text-dark uppercase tracking-wider mb-2">
            Settings
          </h3>
          <ul className="space-y-1">
            {settingsItems.map((item) => (
              <li key={item.label}>
                <div className="relative flex h-full w-full">
                  {/* Vertical Line for Settings Items */}
                  <div
                    className={cn(
                      "hidden",
                      item.active
                        ? "absolute top-2 flex items-center transition-colors"
                        : ""
                    )}
                  >
                    <Image
                      src={SidebarRectangle}
                      alt={"Sidebar Rectangle Icon"}
                    />
                  </div>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={cn(
                      "flex items-center gap-4 px-3 py-2 text-md transition-colors w-full cursor-pointer",
                      item.active
                        ? "bg-[#30968930] text-primary font-medium px-4"
                        : "text-dark px-4 hover:bg-primary/10"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 text-dark",
                        item.active ? "text-primary" : ""
                      )}
                    />
                    {item.label}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* User Profile Section */}
      <div className="flex justify-center mb-5">
        <UserProfile />
      </div>
    </div>
  );
}
