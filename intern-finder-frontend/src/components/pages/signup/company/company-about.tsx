"use client";

import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Logo from "@/components/icons/logo.png";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useFormValidation } from "@/app/signup/company/page";

interface AboutFormData {
  companyDescription: string;
  teamSize: string;
  socialMediaLink: string;
  linkedinUrl: string;
}

interface CompanyAboutFormProps {
  onSubmit: (data: Partial<AboutFormData>) => void;
  initialData?: Partial<AboutFormData>;
  onBack?: () => void;
}

// URL validation function
const isValidUrl = (url: string): boolean => {
  if (!url.trim()) return true; // Empty URLs are valid (optional fields)

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

// Function to format URL - add https:// if missing
const formatUrl = (url: string): string => {
  if (!url.trim()) return url;

  // If it already starts with http:// or https://, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Otherwise, add https://
  return `https://${url}`;
};

export default function CompanyAboutForm({
  onSubmit,
  initialData,
  onBack,
}: CompanyAboutFormProps) {
  const [formData, setFormData] = useState<AboutFormData>({
    companyDescription: "",
    teamSize: "",
    socialMediaLink: "",
    linkedinUrl: "",
    ...initialData,
  });

  const [localErrors, setLocalErrors] = useState<
    Partial<Record<keyof AboutFormData, string>>
  >({});

  const router = useRouter();
  const { errors, setError, clearError } = useFormValidation();

  const handleInputChange = (field: keyof AboutFormData, value: string) => {
    let formattedValue = value;

    // Auto-format URLs as user types (for optional fields)
    if (
      (field === "socialMediaLink" || field === "linkedinUrl") &&
      value.trim()
    ) {
      // Don't auto-format if user is deleting text
      if (value.length > formData[field].length) {
        formattedValue = formatUrl(value);
      }
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    clearError(field);
    // Also clear local errors when user starts typing
    setLocalErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AboutFormData, string>> = {};

    // Required field validation
    if (!formData.companyDescription.trim()) {
      newErrors.companyDescription = "Company description is required";
    }

    if (!formData.teamSize.trim()) {
      newErrors.teamSize = "Team size is required";
    }

    // URL validation for optional fields
    if (
      formData.socialMediaLink.trim() &&
      !isValidUrl(formData.socialMediaLink)
    ) {
      newErrors.socialMediaLink =
        "Please enter a valid URL starting with http:// or https://";
    }

    if (formData.linkedinUrl.trim() && !isValidUrl(formData.linkedinUrl)) {
      newErrors.linkedinUrl =
        "Please enter a valid URL starting with http:// or https://";
    }

    setLocalErrors(newErrors);

    // Also update the global form validation errors if needed
    Object.entries(newErrors).forEach(([field, error]) => {
      if (error && setError) {
        setError(field as keyof AboutFormData, error);
      }
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format URLs before submitting
    const formattedData = {
      ...formData,
      socialMediaLink: formData.socialMediaLink.trim()
        ? formatUrl(formData.socialMediaLink)
        : "",
      linkedinUrl: formData.linkedinUrl.trim()
        ? formatUrl(formData.linkedinUrl)
        : "",
    };

    if (validateForm()) {
      onSubmit(formattedData);
    }
  };

  // Use either localErrors or the global errors, depending on your setup
  const displayErrors =
    Object.keys(localErrors).length > 0 ? localErrors : errors;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
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
            onClick={onBack}
            className="flex items-center gap-2 text-dark text-lg cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex flex-col mx-auto p-4 md:p-8 w-150">
          <h1 className="text-3xl font-bold text-dark mb-8">
            Tell us About your Organization
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Form Fields */}
              <div className="flex flex-col gap-6 flex-1">
                {/* Company Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="text-sm font-medium text-dark"
                  >
                    Company Description *
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your company..."
                    value={formData.companyDescription}
                    onChange={(e) =>
                      handleInputChange("companyDescription", e.target.value)
                    }
                    className="w-full min-h-24"
                  />
                  {displayErrors.companyDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {displayErrors.companyDescription}
                    </p>
                  )}
                </div>

                {/* Team Size */}
                <div>
                  <Label
                    htmlFor="TeamSize"
                    className="text-sm font-medium text-dark mb-2 block"
                  >
                    Team Size *
                  </Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value: string) =>
                      handleInputChange("teamSize", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="50-100">50-100</SelectItem>
                      <SelectItem value="101-200">100-200</SelectItem>
                      <SelectItem value="201-500">201-500</SelectItem>
                      <SelectItem value="more than 500">
                        more than 500
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {displayErrors.teamSize && (
                    <p className="text-red-500 text-sm mt-1">
                      {displayErrors.teamSize}
                    </p>
                  )}
                </div>

                {/* Social Media Link */}
                <div className="space-y-2">
                  <Label
                    htmlFor="socialMediaLink"
                    className="text-sm font-medium text-dark"
                  >
                    Social Media Link (Optional)
                  </Label>
                  <Input
                    id="socialMediaLink"
                    type="text"
                    placeholder="https://www.facebook.com/company"
                    value={formData.socialMediaLink}
                    onChange={(e) =>
                      handleInputChange("socialMediaLink", e.target.value)
                    }
                    className="w-full"
                  />
                  {displayErrors.socialMediaLink && (
                    <p className="text-red-500 text-sm mt-1">
                      {displayErrors.socialMediaLink}
                    </p>
                  )}
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label
                    htmlFor="linkedIn"
                    className="text-sm font-medium text-dark"
                  >
                    LinkedIn (Optional)
                  </Label>
                  <Input
                    id="linkedIn"
                    type="text"
                    placeholder="https://www.linkedin.com/company"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    className="w-full"
                  />
                  {displayErrors.linkedinUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      {displayErrors.linkedinUrl}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-teal-700 text-white py-3 rounded-lg font-medium mt-8 cursor-pointer"
            >
              Done!
            </Button>
          </form>
        </div>
      </motion.div>

      {/* Right Side - Message */}
      <motion.div
        initial={{ x: -800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex items-center justify-center p-6 z-10"
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-relaxed text-white max-w-170">
          Share your story, what drives your mission and makes your company
          unique
        </h2>
      </motion.div>
    </div>
  );
}
