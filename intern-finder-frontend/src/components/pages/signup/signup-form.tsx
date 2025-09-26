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
import { create } from "zustand";

import {
  useTalentRegisterStep1,
  useCompanyRegisterStep1,
} from "@/hooks/useAuth";
import { tempoAuthstore } from "@/store/auth";
import { tempoAuthState } from "@/types/auth";
import { useToastMessages } from "@/hooks/useToastMessages";
import { getErrorMessage, getValidationErrors } from "@/utils/error-handler";

// Interface for form data
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Type for form field names
type FormField = keyof FormData;

// Zustand store for form validation
interface FormValidationState {
  errors: Record<FormField, string>;
  touched: Record<FormField, boolean>;
  validateField: (name: FormField, value: string, formData: FormData) => string;
  validateForm: (formData: FormData) => boolean;
  setFieldTouched: (field: FormField) => void;
  setFieldError: (field: FormField, error: string) => void;
  clearErrors: () => void;
}

const useFormValidationStore = create<FormValidationState>((set, get) => ({
  errors: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  touched: {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },

  validateField: (name: FormField, value: string, formData: FormData) => {
    switch (name) {
      case "fullName":
        if (!value) return "Name is required";
        if (value.length < 3) return "Name must be at least 3 letters";
        return "";

      case "email":
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "Password must contain at least one symbol";
        return "";

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords must match";
        return "";

      default:
        return "";
    }
  },

  validateForm: (formData: FormData) => {
    const { validateField } = get();
    const errors = {
      fullName: validateField("fullName", formData.fullName, formData),
      email: validateField("email", formData.email, formData),
      password: validateField("password", formData.password, formData),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword,
        formData
      ),
    };

    set({ errors });
    return (
      !errors.fullName &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    );
  },

  setFieldTouched: (field: FormField) => {
    set((state) => ({
      touched: { ...state.touched, [field]: true },
    }));
  },

  setFieldError: (field: FormField, error: string) => {
    set((state) => ({
      errors: { ...state.errors, [field]: error },
    }));
  },

  clearErrors: () => {
    set({
      errors: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
  },
}));

export function SignUpForm() {
  const router = useRouter();
  const [userType, setUserType] = useState<"talent" | "company">("talent");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const authStore = tempoAuthstore();
  const talentRegisterStep1 = useTalentRegisterStep1();
  const companyRegisterStep1 = useCompanyRegisterStep1();

  // Add toast hooks
  const { showSuccess, showError, showWarning } = useToastMessages();

  // Use the Zustand validation store
  const {
    errors,
    touched,
    validateField,
    validateForm,
    setFieldTouched,
    setFieldError,
    clearErrors,
  } = useFormValidationStore();

  const handleInputChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setFieldError(field, "");
    }

    // Validate field on change if it's been touched
    if (touched[field]) {
      const error = validateField(field, value, {
        ...formData,
        [field]: value,
      });
      if (error) {
        setFieldError(field, error);
      }
    }
  };

  const handleBlur = (field: FormField) => {
    setFieldTouched(field);
    const error = validateField(field, formData[field], formData);
    if (error) {
      setFieldError(field, error);
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate all fields before submission
    const isValid = validateForm(formData);
    if (!isValid) {
      // Mark all fields as touched to show errors
      (Object.keys(touched) as FormField[]).forEach((field) => {
        setFieldTouched(field);
      });
      showWarning("Please fix the form errors before submitting");
      return;
    }

    if (userType === "talent") {
      talentRegisterStep1.mutate(
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: "talent",
        },
        {
          onSuccess: (data: tempoAuthState) => {
            authStore.setAuth(data.id, data.email, data.fullName, "talent");
            showSuccess("Account created successfully! Redirecting...");
            setTimeout(() => {
              router.push("/signup/talent");
            }, 1500);
          },
          onError: (error: unknown) => {
            console.error("Registration error:", error);

            // Handle validation errors from API
            const validationErrors = getValidationErrors(error);
            if (Object.keys(validationErrors).length > 0) {
              // Map API validation errors to form fields
              Object.entries(validationErrors).forEach(([field, message]) => {
                const formField = field as FormField;
                if (formField in errors) {
                  setFieldError(formField, message);
                }
              });
              showWarning("Please fix the validation errors");
            } else {
              const errorMessage = getErrorMessage(error);
              showError(errorMessage);
            }
          },
        }
      );
    } else {
      companyRegisterStep1.mutate(
        {
          companyName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: "company",
        },
        {
          onSuccess: (data: tempoAuthState) => {
            authStore.setAuth(data.id, data.fullName, data.email, "company");
            showSuccess("Company account created successfully! Redirecting...");
            setTimeout(() => {
              router.push("/signup/company");
            }, 1500);
          },
          onError: (error: unknown) => {
            console.error("Registration error:", error);

            // Handle validation errors from API
            const validationErrors = getValidationErrors(error);
            if (Object.keys(validationErrors).length > 0) {
              // Map API validation errors to form fields
              Object.entries(validationErrors).forEach(([field, message]) => {
                const formField = field as FormField;
                if (formField in errors) {
                  setFieldError(formField, message);
                }
              });
              showWarning("Please fix the validation errors");
            } else {
              const errorMessage = getErrorMessage(error);
              showError(errorMessage);
            }
          },
        }
      );
    }
  };

  // Check if form has any errors
  const hasErrors = Object.values(errors).some((error) => error !== "");

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <motion.div
        initial={{ x: 800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 p-8 flex flex-col"
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
          <div className="flex">
            <span className="text-xl font-medium text-light">Intern Fin</span>
            <span className="text-xl font-medium text-dark">der</span>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-[900] text-dark mb-8 text-center">
            Sign Up
          </h1>

          {/* User type toggle */}
          <div className="flex mb-8">
            <Button
              type="button"
              variant={userType === "talent" ? "default" : "outline"}
              className={`flex-1 rounded-r-none ${
                userType === "talent"
                  ? "bg-primary hover:bg-teal-700 text-white cursor-pointer"
                  : "bg-white font-bold border-gray-300 text-dark hover:bg-gray-50 cursor-pointer"
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
                  ? "bg-primary hover:bg-teal-700 text-white cursor-pointer"
                  : "bg-text-white border-gray-300 text-dark font-[900] hover:bg-[gray-50] cursor-pointer"
              }`}
              onClick={() => setUserType("company")}
            >
              Company
            </Button>
          </div>

          <h2 className="text-xl font-[900] text-dark mb-6">
            Let&apos;s get you started
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full name / Company Name */}
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-dark"
              >
                {userType === "company" ? "Company Name" : "Full name"}
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder={
                  userType === "company"
                    ? "GoldenAge Technology PLC"
                    : "Ada Tiger"
                }
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                className="mt-1"
                aria-invalid={errors.fullName ? "true" : "false"}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

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

              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <p
                    key={index}
                    className={`text-xs ${
                      req.met ? "text-green-600" : "text-light"
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
                className="text-sm font-medium text-dark cursor-pointer"
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
                  onBlur={() => handleBlur("confirmPassword")}
                  className="pr-10"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-light" />
                  ) : (
                    <Eye className="h-4 w-4 text-light" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword &&
                !errors.confirmPassword && (
                  <p className="text-green-600 text-xs mt-1">Passwords match</p>
                )}
            </div>

            {/* Sign up button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-teal-700 text-white py-3 mt-6 cursor-pointer"
              disabled={
                talentRegisterStep1.isPending ||
                companyRegisterStep1.isPending ||
                hasErrors
              }
            >
              {talentRegisterStep1.isPending || companyRegisterStep1.isPending
                ? "Creating Account..."
                : "Sign Up"}
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

            {/* Login link */}
            <p className="text-center text-sm text-light mt-4">
              Already a user?{" "}
              <a
                href="/login"
                className="text-primary hover:text-teal-700 font-medium cursor-pointer"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </motion.div>

      {/* Right side - Quote */}
      <motion.div
        initial={{ x: -800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex items-center justify-center p-3 z-10"
      >
        <div className="text-left text-white max-w-lg">
          <blockquote className="text-6xl font-bold leading-relaxed mb-8 text-white w-150">
            &quot;Creativity is intelligence having fun&quot;
          </blockquote>
          <cite className="text-lg font-medium">- Albert Einstein</cite>
        </div>
      </motion.div>
    </div>
  );
}
