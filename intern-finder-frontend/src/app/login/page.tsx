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

// Login form component
import { useLogin } from "@/hooks/useAuth";
import { useToastMessages } from "@/hooks/useToastMessages";
import { getErrorMessage, getValidationErrors } from "@/utils/error-handler";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const loginMutation = useLogin();
  const { showSuccess, showError, showWarning } = useToastMessages();

  // Email validation function
  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email))
      return "Please enter a valid email address";
    return "";
  };

  // Password validation function
  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    return "";
  };

  // Validate individual field
  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      default:
        return "";
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Validate field in real-time if it's been touched
    if (touched[field]) {
      const error = validateField(field, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      showWarning("Please fix the form errors before submitting");
      return;
    }

    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        showSuccess("Login successful! Redirecting...");
        // Use the data returned from the mutation for redirect
        setTimeout(() => {
          if (data.data.role === "COMPANY") {
            router.push("/client/dashboard");
          } else if (data.data.role === "TALENT") {
            router.push("/talent/dashboard");
          } else {
            // Default redirect if role is not specified
            router.push("/");
          }
        }, 1500);
      },
      onError: (error: unknown) => {
        console.error("Login error:", error);

        // Handle validation errors from API
        const validationErrors = getValidationErrors(error);
        if (Object.keys(validationErrors).length > 0) {
          // Map API validation errors to form fields
          Object.entries(validationErrors).forEach(([field, message]) => {
            if (field in errors) {
              setErrors((prev) => ({
                ...prev,
                [field as keyof FormData]: message,
              }));
            }
          });
          showWarning("Please check your login credentials");
        } else {
          const errorMessage = getErrorMessage(error);

          // Handle specific login errors
          if (
            errorMessage.includes("401") ||
            errorMessage.includes("Invalid credentials")
          ) {
            showError("Invalid email or password. Please try again.");
          } else if (errorMessage.includes("Network error")) {
            showError("Network error: Please check your internet connection");
          } else if (errorMessage.includes("User not found")) {
            showError("No account found with this email address");
          } else {
            showError(errorMessage);
          }
        }
      },
    });
  };

  // Check if form has any errors
  const hasErrors = Object.values(errors).some((error) => error !== "");

  return (
    <div className="min-h-screen flex">
      {/* Left side - Quote */}
      <motion.div
        initial={{ x: 800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex flex-col p-12 gap-30 text-white z-10"
      >
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 mb-8 cursor-pointer"
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

        {/* Main text */}
        <div className="flex justify-center">
          <div className="text-left text-white max-w-lg">
            <blockquote className="text-6xl font-bold leading-relaxed mb-8 text-white w-150">
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
          <h1 className="text-2xl font-[900] text-dark mb-8 text-center">
            Welcome back!
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-dark">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className="mt-1"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-dark"
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
                  onBlur={() => handleBlur("password")}
                  className="pr-10"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-light" />
                  ) : (
                    <Eye className="h-4 w-4 text-light" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}

              {/* Forgot password link */}
              <div className="mt-2 text-right">
                <a
                  href="/forgot-password"
                  className="text-xs text-primary hover:text-teal-700 cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-teal-700 text-white py-3 mt-6 cursor-pointer"
              disabled={loginMutation.isPending || hasErrors}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>

            <Button
              type="button"
              className="flex gap-3 w-full bg-white text-dark py-3 cursor-pointer border-2 hover:bg-secondary"
            >
              <Image
                src={"https://cdn-icons-png.flaticon.com/128/281/281764.png"}
                alt={"Google Icon"}
                width={20}
                height={20}
              />
              <div>Continue with Google</div>
            </Button>
            <p className="text-center text-sm text-light mt-4">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-primary hover:text-teal-700 font-medium cursor-pointer"
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
