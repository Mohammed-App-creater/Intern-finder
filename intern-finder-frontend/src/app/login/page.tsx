"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/icons/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", formData);
    // For demo purposes, redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Quote */}
      <motion.div
        initial={{ x: 800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex flex-col p-12 gap-30 text-[var(--text-white)] z-10"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
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

        {/* Main text */}
        <div className="flex justify-center">
          <div className="text-left text-[var(--text-white)] max-w-lg">
            <blockquote className="text-6xl font-bold leading-relaxed mb-8 text-[var(--text-white)] w-150">
              &quot;Small daily improvements over time lead to stunning
              results&quot;
            </blockquote>
            <cite className="text-lg font-medium">- Robin Sharma</cite>
          </div>
        </div>
      </motion.div>

      {/* Right side - Form */}
      <motion.div
        initial={{ x: -800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-white p-8 flex flex-col justify-center"
      >
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-[900] text-[var(--text-dark)] mb-8 text-center">
            Welcome back!
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[var(--text-dark)]"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-[var(--text-dark)]"
              >
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-[var(--text-light)]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[var(--text-light)]" />
                  )}
                </Button>
              </div>

              {/* Forgot password link */}
              <div className="mt-2 text-right">
                <a
                  href="/forgot-password"
                  className="text-xs text-[var(--primary)] hover:text-teal-700 cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login button */}
            <Button
              type="submit"
              className="w-full bg-[var(--primary)] hover:bg-teal-700 text-[var(--text-white)] py-3 mt-6 cursor-pointer"
            >
              Login
            </Button>

            {/* Sign up link */}
            <p className="text-center text-sm text-[var(--text-light)] mt-4">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-[var(--primary)] hover:text-teal-700 font-medium cursor-pointer"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
