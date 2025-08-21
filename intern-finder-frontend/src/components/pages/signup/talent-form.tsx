"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface TalentFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function TalentForm({ onSubmit, initialData }: TalentFormProps) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    institution: "",
    fieldOfStudy: "",
    program: "",
    workType: "",
    preferredRoles: "",
    location: "",
    ...initialData
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("profileImage");
    if (stored) setProfileImage(stored);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Teal background with text */}
      <div className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex flex-col p-12 gap-50 text-[var(--text-white)]">
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
          <div className="max-w-150">
            <h1 className="flex justify-center text-7xl font-bold leading-tight">
              Let&apos;s fill some details to make you stand out from the rest
            </h1>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Header text */}
          <h2 className="text-2xl font-extrabold text-[var(--text-dark)] mb-8">
            Share your skills and interests to find your perfect internship
            match
          </h2>

          {/* Profile Picture Upload */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-30 h-30 rounded-full border-2 border-[var(--primary)] flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-14 h-14 text-[var(--text-light)]" />
                )}
              </div>

              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      localStorage.setItem(
                        "profileImage",
                        reader.result as string
                      );
                      window.location.reload();
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Plus button */}
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-[var(--text-white)] hover:bg-teal-600 transition-colors cursor-pointer"
                onClick={() =>
                  document.getElementById("profileUpload")?.click()
                }
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[var(--text-dark)] font-bold">
              Profile Picture
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number */}
            <div>
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-[var(--text-dark)] mb-2 block"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="w-full"
              />
            </div>

            {/* Institution */}
            <div>
              <Label
                htmlFor="institution"
                className="text-sm font-medium text-[var(--text-dark)] mb-2 block"
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
                className="w-full"
              />
            </div>

            {/* Field of Study */}
            <div>
              <Label
                htmlFor="fieldOfStudy"
                className="text-sm font-medium text-[var(--text-dark)] mb-2 block"
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
                className="w-full"
              />
            </div>

            {/* Program */}
            <div>
              <Label
                htmlFor="program"
                className="text-sm font-medium text-[var(--text-dark)] mb-2 block"
              >
                Program
              </Label>
              <Select
                value={formData.program}
                onValueChange={(value) => handleInputChange("program", value)}
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
            </div>

            {/* Work Type */}
            <div>
              <Label
                htmlFor="workType"
                className="text-sm font-medium text-[var(--text-dark)] mb-2 block"
              >
                Work Type
              </Label>
              <Select
                value={formData.workType}
                onValueChange={(value) => handleInputChange("workType", value)}
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
            </div>

            {/* Preferred Roles */}
            <div>
              <Label
                htmlFor="preferredRoles"
                className="text-sm font-medium text-[var(--text-dark)] mb-2 block"
              >
                Preferred Roles
              </Label>
              <Input
                id="preferredRoles"
                type="text"
                placeholder="Software Development"
                value={formData.preferredRoles}
                onChange={(e) =>
                  handleInputChange("preferredRoles", e.target.value)
                }
                className="w-full"
              />
            </div>

            {/* Location */}
            <LocationInput
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Continue Button */}
            <Button
              type="submit"
              className="w-full bg-[var(--primary)] text-[var(--text-white)] py-3 mt-2 font-medium"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}