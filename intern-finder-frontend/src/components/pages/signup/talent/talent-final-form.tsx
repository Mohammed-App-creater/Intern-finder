"use client";

import { useState, useRef } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Logo from "@/components/icons/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import { create } from "zustand";

import { useUploadResume } from "@/hooks/useFileUpload";

interface FormData {
  linkedinUrl: string;
  website: string;
  bio: string;
  resumeUrl?: string;
}

interface TalentFinalFormProps {
  onSubmit: (data: object) => void;
  initialData?: object;
  onBack: () => void; // Add onBack prop
}

// Zustand store for form validation
interface FormValidationState {
  errors: {
    linkedinUrl: string;
    website: string;
    bio: string;
  };
  touched: {
    linkedinUrl: boolean;
    website: boolean;
    bio: boolean;
  };
  validateField: (name: string, value: string) => string;
  validateForm: (formData: FormData) => boolean;
  setFieldTouched: (field: string) => void;
}

const useFormValidationStore = create<FormValidationState>((set, get) => ({
  errors: {
    linkedinUrl: "",
    website: "",
    bio: "",
  },
  touched: {
    linkedinUrl: false,
    website: false,
    bio: false,
  },

  validateField: (name: string, value: string) => {
    switch (name) {
      case "bio":
        if (!value.trim()) return "Bio is required";
        if (value.length < 10) return "Bio must be at least 10 characters";
        return "";

      case "linkedinUrl":
        if (value && !/^https?:\/\/.+\..+/.test(value)) {
          return "Please enter a valid URL starting with http:// or https://";
        }
        return "";

      case "website":
        if (value && !/^https?:\/\/.+\..+/.test(value)) {
          return "Please enter a valid URL starting with http:// or https://";
        }
        return "";

      default:
        return "";
    }
  },

  validateForm: (formData: FormData) => {
    const { validateField } = get();
    const errors = {
      linkedinUrl: validateField("linkedinUrl", formData.linkedinUrl),
      website: validateField("website", formData.website),
      bio: validateField("bio", formData.bio),
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

export default function TalentFinalForm({
  onSubmit,
  initialData,
  onBack,
}: TalentFinalFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    linkedinUrl: "",
    website: "",
    bio: "",
    ...initialData,
  });

  // Use the Zustand validation store
  const { errors, touched, validateField, validateForm, setFieldTouched } =
    useFormValidationStore();

  const { mutate: uploadResume } = useUploadResume();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate field on change if it's been touched
    if (touched[field as keyof typeof touched]) {
      const error = validateField(field, value);
      useFormValidationStore.setState((state) => ({
        errors: { ...state.errors, [field]: error },
      }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setFieldTouched(field);
    const error = validateField(field, formData[field] || "");
    useFormValidationStore.setState((state) => ({
      errors: { ...state.errors, [field]: error },
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      uploadResume(file, {
        onSuccess: (data) => {
          setFormData((prev) => ({
            ...prev,
            resumeUrl: data.url,
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const isValid = validateForm(formData);
    if (!isValid) {
      // Mark all fields as touched to show errors
      Object.keys(touched).forEach((field) => {
        setFieldTouched(field);
      });
      return;
    }

    onSubmit(formData);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ x: 800, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 flex flex-col p-8 gap-25"
        >
          {/* Logo and Back Button */}
          <div className="flex items-center justify-between mb-8">
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
              <div className="flex">
                <span className="text-xl font-bold text-light">Intern Fin</span>
                <span className="text-xl font-bold text-dark">der</span>
              </div>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-dark text-lg cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 flex flex-col max-w-md mx-auto p-4 md:p-8 min-w-200">
            <h1 className="text-3xl font-bold text-dark mb-8">
              Let&apos;s go to the finishing steps
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Form Fields */}
                <div className="flex flex-col gap-6 flex-1">
                  {/* LinkedIn */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="linkedin"
                      className="text-sm font-medium text-dark"
                    >
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://www.linkedin.com/in/yourprofile"
                      value={formData.linkedinUrl}
                      onChange={(e) =>
                        handleInputChange("linkedinUrl", e.target.value)
                      }
                      onBlur={() => handleBlur("linkedinUrl")}
                      className="w-full"
                    />
                    {touched.linkedinUrl && errors.linkedinUrl && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.linkedinUrl}
                      </p>
                    )}
                  </div>

                  {/* Personal Website */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="website"
                      className="text-sm font-medium text-dark"
                    >
                      Personal Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.myportfolio.com"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      onBlur={() => handleBlur("website")}
                      className="w-full"
                    />
                    {touched.website && errors.website && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.website}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="bio"
                      className="text-sm font-medium text-dark"
                    >
                      Bio *
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself (minimum 10 characters)..."
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      onBlur={() => handleBlur("bio")}
                      className="w-full min-h-24"
                    />
                    {touched.bio && errors.bio && (
                      <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
                    )}
                  </div>
                </div>

                {/* CV Upload */}
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center min-h-60 border-2 border-dashed border-primary rounded-lg p-6 text-center bg-[var(--secondary)] w-full">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="cv-upload"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Button
                        type="button"
                        variant="default"
                        className="flex justify-center items-center bg-primary hover:bg-teal-700 text-white text-lg px-6 py-7 rounded-xl mb-3 cursor-pointer"
                        onClick={handleUploadClick}
                      >
                        Upload Your CV
                      </Button>
                      <div className="text-dark">
                        <p className="text-lg">or drop it here</p>
                        <p className="text-xs text-light mt-1">
                          PDF, DOC or TXT files
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-primary text-white py-3 mt-2 font-medium cursor-pointer flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                {isLoading ? "Uploading..." : "Done!"}
              </Button>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right Side - Message */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ x: -800, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex items-center justify-center p-6 z-10"
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-relaxed text-white max-w-170">
            One more step for the Masterpiece profile
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
