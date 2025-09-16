"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import Logo from "@/components/icons/logo.png";
import CompanyIcon from "@/components/icons/Company.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUploadProfilePicture } from "@/hooks/useFileUpload";
interface CompanyFormProps {
  onSubmit: (data: object) => void;
  initialData?: Partial<CompanyFormData>;
}

interface CompanyFormData {
  organization: string;
  industries: string[];
  websiteUrl: string;
  location: string;
  logoUrl?: string;
  [key: string]: string | string[] | undefined;
}

export default function CompanyForm({
  onSubmit,
  initialData,
}: CompanyFormProps) {
  const [formData, setFormData] = useState<CompanyFormData>({
    organization: "",
    industries: [""],
    websiteUrl: "",
    location: "",
    ...initialData,
  });

  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { mutate: uploadProfilePicture } = useUploadProfilePicture();

  useEffect(() => {
    const stored = localStorage.getItem("profileImage");
    if (stored) setProfileImage(stored);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if(field === "industries") {
      const industriesArray = value.split(',').map(ind => ind.trim());
      setFormData((prev) => ({ ...prev, [field]: industriesArray }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadProfilePicture(file, {
        onSuccess: (data) => {
          setProfileImage(data.url);
          handleInputChange("logoUrl", data.url);
          console.log("Uploaded image URL:", data.url);
          // keep in localStorage for reloads
          localStorage.setItem("profileImage", data.url);

          // inject into formData
          setFormData((prev) => ({
            ...prev,
            logoUrl: data.url,
          }));
        },
        onError: (error) => {
          console.error("Upload failed:", error);
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Teal background with text */}
      <motion.div
        initial={{ x: 800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex flex-col p-12 gap-25 text-white z-10"
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
              Let&apos;s build your company profile and connect you with the
              next generation of talent
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
            Tell us about your company or institution
          </h2>

          {/* Company Logo Upload */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-30 h-30 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-full"
                    width={120}
                    height={120}
                    style={{ objectFit: "cover", borderRadius: "9999px" }}
                    unoptimized
                  />
                ) : (
                  <Image
                    src={CompanyIcon}
                    alt="Company Icon"
                    width={50}
                    height={50}
                  />
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
            <span className="text-dark font-bold">Logo</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Organization Type */}
            <div>
              <Label
                htmlFor="organization"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Organization Type
              </Label>
              <Input
                id="organization"
                type="tel"
                placeholder="NGO"
                value={formData.organization}
                onChange={(e) =>
                  handleInputChange("organization", e.target.value)
                }
                className="w-full"
              />
            </div>

            {/* Industry/Field */}
            <div>
              <Label
                htmlFor="industry"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Industry/Field
              </Label>
              <Input
                id="industry"
                type="text"
                placeholder="Technology"
                value={formData.industries}
                onChange={(e) => handleInputChange("industries", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Official Website URL */}
            <div>
              <Label
                htmlFor="officialWebsiteURL"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Official Website URL
              </Label>
              <Input
                id="website"
                type="text"
                placeholder="www.example.com"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-white py-3 mt-2 font-medium cursor-pointer"
            >
              Continue
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
