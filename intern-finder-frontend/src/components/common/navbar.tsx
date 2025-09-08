"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/components/icons/logo.png";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { NotificationPopup } from "../layout/notification-popup";
import { MessagesPopup } from "../layout/messages-popup";

export default function Navbar() {
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

  const handleSignupClick = () => {
    router.push("/signup");
  };

  return (
    <header className="flex items-center">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
          />
          <span className="text-xl font-bold bg-gradient-to-r from-[#fff] to-[#cccccc] bg-clip-text text-transparent">
            Intern Finder
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className={`hover:text-white transition-colors ${isActive(
              "/dashboard"
            )}`}
          >
            Dashboard
          </Link>
          <Link
            href="/"
            className={`hover:text-white transition-colors ${isActive("/")}`}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className={`hover:text-white transition-colors ${isActive(
              "/jobs"
            )}`}
          >
            Jobs
          </Link>
          <Link
            href="/about"
            className={`hover:text-white transition-colors ${isActive(
              "/about"
            )}`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`hover:text-white transition-colors ${isActive(
              "/contact"
            )}`}
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={"/login"}
            className="text-[var(--text-light)] hover:text-white cursor-pointer"
          >
            Login
          </Link>
          <Button
            onClick={handleSignupClick}
            className="bg-primary hover:bg-teal-600 text-white cursor-pointer"
          >
            Register
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <NotificationPopup />
          <MessagesPopup />
        </div>
      </div>
    </header>
  );
}
