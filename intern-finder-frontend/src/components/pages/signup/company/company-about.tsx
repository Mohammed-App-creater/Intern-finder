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

  const router = useRouter();
  const { errors, clearError } = useFormValidation();

  const handleInputChange = (field: keyof AboutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    let isValid = true;

    if (!formData.companyDescription.trim()) {
      isValid = false;
    }

    if (!formData.teamSize.trim()) {
      isValid = false;
    }

    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <motion.div
        initial={{ x: 800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 flex flex-col p-8 gap-25"
      >
        {/* Back Button */}
        {onBack && (
          <Button
            variant="none"
            onClick={onBack}
            className="absolute top-4 left-4 z-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}

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
          <div className="flex cursor-pointer">
            <span className="text-xl font-bold text-light">Intern Fin</span>
            <span className="text-xl font-bold text-dark">der</span>
          </div>
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
                  {errors.companyDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyDescription}
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
                  {errors.teamSize && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.teamSize}
                    </p>
                  )}
                </div>

                {/* Social Media Link */}
                <div className="space-y-2">
                  <Label
                    htmlFor="link"
                    className="text-sm font-medium text-dark"
                  >
                    Social Media Link (Optional)
                  </Label>
                  <Input
                    id="socialMediaLink"
                    type="url"
                    placeholder="www.facebook.com/company"
                    value={formData.socialMediaLink}
                    onChange={(e) =>
                      handleInputChange("socialMediaLink", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label
                    htmlFor="link"
                    className="text-sm font-medium text-dark"
                  >
                    LinkedIn (Optional)
                  </Label>
                  <Input
                    id="linkedIn"
                    type="url"
                    placeholder="www.linkedin.com/in/company"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    className="w-full"
                  />
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
