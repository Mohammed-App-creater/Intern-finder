"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/icons/logo.png";
import Image from "next/image";

export function SignUpForm() {
  const router = useRouter();
  const [userType, setUserType] = useState<"talent" | "company">("talent");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const passwordRequirements = [
    {
      text: "Password must contain a minimum of 8 characters",
      met: formData.password.length >= 8,
    },
    {
      text: "Password must contain at least one symbol (e.g. @, #, $)",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    },
  ];

  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === "talent") {
      router.push("/signup/talent");
    } else {
      router.push("/signup/company");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 bg-white p-8 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <Image
            src={Logo}
            alt="Company Logo"
            width={30}
            height={30}
            priority
          />
          <div className="flex">
            <span className="text-xl font-bold text-[var(--text-light)]">
              Intern Fin
            </span>
            <span className="text-xl font-bold text-[var(--text-dark)]">
              der
            </span>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-[900] text-[var(--text-dark)] mb-8 text-center">
            Sign Up
          </h1>

          {/* User type toggle */}
          <div className="flex mb-8">
            <Button
              type="button"
              variant={userType === "talent" ? "default" : "outline"}
              className={`flex-1 rounded-r-none ${
                userType === "talent"
                  ? "bg-[var(--primary)] hover:bg-teal-700 text-white"
                  : "bg-white font-bold border-gray-300 text-[var(--text-dark)] hover:bg-gray-50"
              }`}
              onClick={() => setUserType("talent")}
            >
              Talent
            </Button>
            <Button
              type="button"
              variant={userType === "company" ? "default" : "outline"}
              className={`flex-1 rounded-l-none ${
                userType === "company"
                  ? "bg-[var(--primary)] hover:bg-teal-700 text-white"
                  : "bg-white border-gray-300 text-[var(--text-dark)] font-[900] hover:bg-[gray-50]"
              }`}
              onClick={() => setUserType("company")}
            >
              Company
            </Button>
          </div>

          <h2 className="text-xl font-[900] text-[var(--text-dark)] mb-6">
            Let's get you started
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full name */}
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm font-bold text-[var(--text-dark)]"
              >
                Full name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Ada Tiger"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-bold text-[var(--text-dark)]"
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
                className="text-sm font-bold text-[var(--text-dark)]"
              >
                Create password
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
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>

              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <p
                    key={index}
                    className={`text-xs ${
                      req.met ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {req.text}
                  </p>
                ))}
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-bold text-[var(--text-dark)]"
              >
                Confirm password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && (
                <p
                  className={`text-xs mt-1 ${
                    passwordsMatch ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {passwordsMatch
                    ? "Passwords match"
                    : "Passwords must match the created password"}
                </p>
              )}
            </div>

            {/* Sign up button */}
            <Button
              type="submit"
              className="w-full bg-[var(--primary)] hover:bg-teal-700 text-[var(--text-white)] py-3 mt-6"
            >
              Sign Up
            </Button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Already a user?{" "}
              <a
                href="#"
                className="text-[var(--primary)] hover:text-teal-700 font-medium"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Quote */}
      <div className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex items-center justify-center p-3">
        <div className="text-left text-[var(--text-white)] max-w-lg">
          <blockquote className="text-6xl font-bold leading-relaxed mb-8 text-[var(--text-white)] w-150">
            "Creativity is intelligence having fun"
          </blockquote>
          <cite className="text-lg font-medium">- Albert Einstein</cite>
        </div>
      </div>
    </div>
  );
}
