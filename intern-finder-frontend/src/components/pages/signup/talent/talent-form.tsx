"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, User } from "lucide-react";
import { LocationInput } from "@/components/common/location";
import Logo from "@/components/icons/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { create } from "zustand";

import { useUploadProfilePicture } from "@/hooks/useFileUpload";

interface TalentFormProps {
  onSubmit: (data: object) => void;
  initialData?: object;
}

// Zustand store for form validation
interface FormValidationState {
  errors: {
    profileImage: string;
    phoneNumber: string;
    institution: string;
    fieldOfStudy: string;
    program: string;
    workingEnvironment: string;
    preferredRole: string;
    location: string;
  };
  touched: {
    profileImage: boolean;
    phoneNumber: boolean;
    institution: boolean;
    fieldOfStudy: boolean;
    program: boolean;
    workingEnvironment: boolean;
    preferredRole: boolean;
    location: boolean;
  };
  validateField: (
    name: string,
    value: string,
    profileImage?: string | null
  ) => string;
  validateForm: (
    formData: { [key: string]: string },
    profileImage?: string | null
  ) => boolean;
  setFieldTouched: (field: string) => void;
}

const useFormValidationStore = create<FormValidationState>((set, get) => ({
  errors: {
    profileImage: "",
    phoneNumber: "",
    institution: "",
    fieldOfStudy: "",
    program: "",
    workingEnvironment: "",
    preferredRole: "",
    location: "",
  },
  touched: {
    profileImage: false,
    phoneNumber: false,
    institution: false,
    fieldOfStudy: false,
    program: false,
    workingEnvironment: false,
    preferredRole: false,
    location: false,
  },

  validateField: (
    name: string,
    value: string,
    profileImage?: string | null
  ) => {
    switch (name) {
      case "profileImage":
        if (!profileImage) return "Profile picture is required";
        return "";

      case "phoneNumber":
        if (!value) return "Phone number is required";
        if (!/^\+\d{1,4}\s?\d{6,14}$/.test(value))
          return "Phone number must start with country code (e.g., +251)";
        return "";

      case "institution":
        if (!value) return "Institution is required";
        if (value.length < 2)
          return "Institution name must be at least 2 characters";
        return "";

      case "fieldOfStudy":
        if (!value) return "Field of study is required";
        if (value.length < 2)
          return "Field of study must be at least 2 characters";
        return "";

      case "program":
        if (!value) return "Program is required";
        return "";

      case "workingEnvironment":
        if (!value) return "Work type is required";
        return "";

      case "preferredRole":
        if (!value) return "Preferred role is required";
        if (value.length < 2)
          return "Preferred role must be at least 2 characters";
        return "";

      case "location":
        if (!value) return "Location is required";
        if (value.length < 2) return "Location must be at least 2 characters";
        return "";

      default:
        return "";
    }
  },

  validateForm: (
    formData: { [key: string]: string },
    profileImage?: string | null
  ) => {
    const { validateField } = get();
    const errors = {
      profileImage: validateField("profileImage", "", profileImage),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber || ""),
      institution: validateField("institution", formData.institution || ""),
      fieldOfStudy: validateField("fieldOfStudy", formData.fieldOfStudy || ""),
      program: validateField("program", formData.program || ""),
      workingEnvironment: validateField(
        "workingEnvironment",
        formData.workingEnvironment || ""
      ),
      preferredRole: validateField(
        "preferredRole",
        formData.preferredRole || ""
      ),
      location: validateField("location", formData.location || ""),
    };

    set({ errors });
    return Object.values(errors).every((error) => error === "");
  },

  setFieldTouched: (field: string) => {
    set((state) => ({
      touched: { ...state.touched, [field]: true },
    }));
  },
}));

export default function TalentForm({ onSubmit, initialData }: TalentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    institution: "",
    fieldOfStudy: "",
    program: "",
    workingEnvironment: "",
    preferredRole: "",
    location: "",
    ...initialData,
  });

  // Use the Zustand validation store
  const { errors, touched, validateField, validateForm, setFieldTouched } =
    useFormValidationStore();

  const { mutate: uploadProfilePicture } = useUploadProfilePicture();

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("profileImage");
    if (stored) setProfileImage(stored);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate field on change if it's been touched
    if (touched[field as keyof typeof touched]) {
      const error = validateField(field, value, profileImage);
      useFormValidationStore.setState((state) => ({
        errors: { ...state.errors, [field]: error },
      }));
    }
  };

  const handleBlur = (field: string) => {
    setFieldTouched(field);
    const error = validateField(
      field,
      formData[field as keyof typeof formData] as string,
      profileImage
    );
    useFormValidationStore.setState((state) => ({
      errors: { ...state.errors, [field]: error },
    }));
  };

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      uploadProfilePicture(file, {
        onSuccess: (data) => {
          setProfileImage(data.url);

          // keep in localStorage for reloads
          localStorage.setItem("profileImageUrl", data.url);

          // inject into formData
          setFormData((prev) => ({
            ...prev,
            profileImageUrl: data.url,
          }));

          // Validate profile image after upload
          const error = validateField("profileImage", "", data.url);
          useFormValidationStore.setState((state) => ({
            errors: { ...state.errors, profileImage: error },
          }));

          setIsLoading(false);
        },
        onError: (error) => {
          setIsLoading(false);
          console.error("Upload failed:", error);
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const isValid = validateForm(formData, profileImage);
    if (!isValid) {
      // Mark all fields as touched to show errors
      Object.keys(touched).forEach((field) => {
        setFieldTouched(field);
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Teal background with text */}
      <motion.div
        initial={{ x: 800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex flex-col p-12 gap-50 text-white z-10"
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
          <div className="max-w-150">
            <h1 className="flex justify-center text-7xl font-bold leading-tight">
              Let&apos;s fill some details to make you stand out from the rest
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Right side - Form */}
      <motion.div
        initial={{ x: -800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 p-8 flex flex-col justify-center"
      >
        <div className="max-w-md mx-auto w-full">
          {/* Header text */}
          <h2 className="text-2xl font-extrabold text-dark mb-8">
            Share your skills and interests to find your perfect internship
            match
          </h2>

          {/* Profile Picture Upload */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-30 h-30 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", borderRadius: "9999px" }}
                  />
                ) : (
                  <User className="w-14 h-14 text-light" />
                )}
              </div>

              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleProfilePictureUpload(e);
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setProfileImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Plus button */}
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-600 transition-colors cursor-pointer"
                onClick={() =>
                  document.getElementById("profileUpload")?.click()
                }
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <span className="text-dark font-bold">Profile Picture</span>
          </div>
          {touched.profileImage && errors.profileImage && (
            <p className="text-red-500 text-xs mt-1 mb-4">
              {errors.profileImage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number */}
            <div>
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+251 91 234 5678"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                onBlur={() => handleBlur("phoneNumber")}
                className="w-full"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Institution */}
            <div>
              <Label
                htmlFor="institution"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Institution
              </Label>
              <Input
                id="institution"
                type="text"
                placeholder="MIT"
                value={formData.institution}
                onChange={(e) =>
                  handleInputChange("institution", e.target.value)
                }
                onBlur={() => handleBlur("institution")}
                className="w-full"
              />
              {touched.institution && errors.institution && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.institution}
                </p>
              )}
            </div>

            {/* Field of Study */}
            <div>
              <Label
                htmlFor="fieldOfStudy"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Field of Study
              </Label>
              <Input
                id="fieldOfStudy"
                type="text"
                placeholder="Computer Engineering"
                value={formData.fieldOfStudy}
                onChange={(e) =>
                  handleInputChange("fieldOfStudy", e.target.value)
                }
                onBlur={() => handleBlur("fieldOfStudy")}
                className="w-full"
              />
              {touched.fieldOfStudy && errors.fieldOfStudy && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fieldOfStudy}
                </p>
              )}
            </div>

            {/* Program */}
            <div>
              <Label
                htmlFor="program"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Program
              </Label>
              <Select
                value={formData.program}
                onValueChange={(value: string) =>
                  handleInputChange("program", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Diploma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="degree">Degree</SelectItem>
                  <SelectItem value="masters">Masters</SelectItem>
                  <SelectItem value="phd">Phd</SelectItem>
                  <SelectItem value="other">other</SelectItem>
                </SelectContent>
              </Select>
              {touched.program && errors.program && (
                <p className="text-red-500 text-xs mt-1">{errors.program}</p>
              )}
            </div>

            {/* Work Type */}
            <div>
              <Label
                htmlFor="workType"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Work Type
              </Label>
              <Select
                value={formData.workingEnvironment}
                onValueChange={(value: string) =>
                  handleInputChange("workingEnvironment", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Remote" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fulltime">Remote</SelectItem>
                  <SelectItem value="parttime">Hybrid</SelectItem>
                  <SelectItem value="contract">On-site</SelectItem>
                </SelectContent>
              </Select>
              {touched.workingEnvironment && errors.workingEnvironment && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.workingEnvironment}
                </p>
              )}
            </div>

            {/* Preferred Roles */}
            <div>
              <Label
                htmlFor="preferredRoles"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Preferred Roles
              </Label>
              <Input
                id="preferredRoles"
                type="text"
                placeholder="Software Development"
                value={formData.preferredRole}
                onChange={(e) =>
                  handleInputChange("preferredRole", e.target.value)
                }
                onBlur={() => handleBlur("preferredRole")}
                className="w-full"
              />
              {touched.preferredRole && errors.preferredRole && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.preferredRole}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label
                htmlFor="location"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Location
              </Label>
              <LocationInput
                formData={formData}
                handleInputChange={handleInputChange}
                field="location"
              />
              {touched.location && errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary text-white py-3 mt-2 font-medium cursor-pointer flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
              {isLoading ? "Uploading..." : "Continue"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}