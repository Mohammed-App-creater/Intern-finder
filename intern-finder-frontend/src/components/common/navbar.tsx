import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "@/components/icons/logo.png";

export default function navbar() {
  return (
    <header className="flex items-center bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
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

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="hidden text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Jobs
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Login
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
