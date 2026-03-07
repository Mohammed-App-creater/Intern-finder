"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/components/icons/logo.png";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { NotificationPopup } from "../layout/notification-popup";
import { MessagesPopup } from "../layout/messages-popup";
import { ThemeToggle } from "../layout/theme-toggle";
import { useAuthStore } from "@/store/auth";
import CompaniesLogo from "../layout/companies-logo";
import { Plus, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path ? "text-white" : "text-[var(--text-light)]";
    }
    return pathname.startsWith(path)
      ? "text-white"
      : "text-[var(--text-light)]";
  };

  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();

  const handleSignupClick = () => {
    router.push("/signup");
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex items-center relative">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex gap-8 sm:gap-10 md:gap-15 items-center">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={Logo}
              alt="Company Logo"
              width={30}
              height={30}
              priority
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#fff] to-[#cccccc] bg-clip-text text-transparent">
              Intern Finder
            </span>
          </div>

          {/* Company Logo */}
          {user?.role == "COMPANY" && (
            <div className="hidden sm:block">
              <CompaniesLogo />
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 lg:gap-8">
          {user && (
            <Link
              href={
                user?.role === "COMPANY"
                  ? "/client/dashboard"
                  : "/talent/dashboard"
              }
              className={`hover:text-[var(--text-white)] transition-colors text-sm lg:text-base ${isActive(
                user?.role === "COMPANY"
                  ? "/client/dashboard"
                  : "/talent/dashboard"
              )}`}
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/"
            className={`hover:text-[var(--text-white)] transition-colors text-sm lg:text-base ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className={`hover:text-[var(--text-white)] transition-colors text-sm lg:text-base ${isActive(
              "/jobs"
            )}`}
          >
            Jobs
          </Link>
          <Link
            href="/about"
            className={`hover:text-[var(--text-white)] transition-colors text-sm lg:text-base ${isActive(
              "/about"
            )}`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`hover:text-[var(--text-white)] transition-colors text-sm lg:text-base ${isActive(
              "/contact"
            )}`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-2 sm:gap-4">
             {/* User Actions - Visible on all screens */}
             {user && (
               <div className="flex items-center gap-4 mr-2 sm:mr-0">
                 <NotificationPopup />
                 <MessagesPopup />
               </div>
             )}

            {/* Desktop Only Actions */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {user && (
                <>
                  <ThemeToggle />
                  {user?.role == "COMPANY" && (
                    <Button
                      className="flex gap-2 text-white rounded-sm text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-2"
                      onClick={() => router.push("/client/dashboard/post")}
                    >
                      <Plus className="w-4 h-4" />
                      Post a Job
                    </Button>
                  )}
                </>
              )}

              {!user && (
                <div className="flex items-center gap-3 lg:gap-4">
                  <Link
                    href={"/login"}
                    className="text-[var(--text-light)] hover:text-[var(--text-white)] cursor-pointer text-sm lg:text-base"
                  >
                    Login
                  </Link>
                  <Button
                    onClick={handleSignupClick}
                    className="bg-primary hover:bg-teal-600 text-white cursor-pointer text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-2"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute top-0 right-0 h-full w-80 bg-black border-l border-gray-800 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Image
                    src={Logo}
                    alt="Company Logo"
                    width={30}
                    height={30}
                    priority
                  />
                  <span className="text-xl font-bold bg-gradient-to-r from-[#fff] to-[#cccccc] bg-clip-text text-transparent">
                    Intern Finder
                  </span>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-4 mb-8">
                {user && (
                  <button
                    onClick={() =>
                      handleNavigation(
                        user?.role === "COMPANY"
                          ? "/client/dashboard"
                          : "/talent/dashboard"
                      )
                    }
                    className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-base ${isActive(
                      user?.role === "COMPANY"
                        ? "/client/dashboard"
                        : "/talent/dashboard"
                    )}`}
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={() => handleNavigation("/")}
                  className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-base ${isActive(
                    "/"
                  )}`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("/jobs")}
                  className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-base ${isActive(
                    "/jobs"
                  )}`}
                >
                  Jobs
                </button>
                <button
                  onClick={() => handleNavigation("/about")}
                  className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-base ${isActive(
                    "/about"
                  )}`}
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-base ${isActive(
                    "/contact"
                  )}`}
                >
                  Contact Us
                </button>
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-4">
                {user && (
                  <>
                    <div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg">
                      <span className="text-sm text-gray-300">Theme</span>
                      <ThemeToggle />
                    </div>
                    {user?.role == "COMPANY" && (
                      <Button
                        className="w-full flex gap-2 text-white rounded-sm justify-center py-3"
                        onClick={() =>
                          handleNavigation("/client/dashboard/post")
                        }
                      >
                        <Plus className="w-4 h-4" />
                        Post a Job
                      </Button>
                    )}
                  </>
                )}

                {!user && (
                  <div className="space-y-3">
                    <Link
                      href={"/login"}
                      className="flex items-center justify-center w-full text-center py-3 px-4 text-[var(--text-light)] hover:text-[var(--text-white)] cursor-pointer border border-gray-600 rounded-lg hover:border-gray-400 transition-colors h-10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Button
                      onClick={handleSignupClick}
                      className="w-full bg-primary hover:bg-teal-600 text-white cursor-pointer py-3 h-10"
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>

              {/* Company Logo for Mobile */}
              {user?.role == "COMPANY" && (
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="sm:hidden">
                    <CompaniesLogo />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
