"use client";

import { useState, useRef } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Logo from "@/components/icons/logo.png";

interface FormData {
  linkedin: string;
  website: string;
  bio: string;
}

export default function FinishingTalentForm() {
  const [formData, setFormData] = useState<FormData>({
    linkedin: "",
    website: "",
    bio: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File uploaded:", file.name);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col p-8">
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

        {/* Form Content */}
        <div className="flex-1 flex flex-col max-w-md mx-auto p-4 md:p-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
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
                    className="text-sm font-medium text-gray-700"
                  >
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="www.linkedin.com/..."
                    value={formData.linkedin}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Personal Website */}
                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="text-sm font-medium text-gray-700"
                  >
                    Personal Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="www.myportfolio.com"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="text-sm font-medium text-gray-700"
                  >
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="w-full min-h-24"
                  />
                </div>
              </div>

              {/* CV Upload */}
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center min-h-60 border-2 border-dashed border-teal-300 rounded-lg p-6 text-center bg-[var(--secondary)] w-full">
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="cv-upload"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center">
                    <Button
                      type="button"
                      variant="default"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-xl mb-3"
                      onClick={handleUploadClick}
                    >
                      Upload Your CV
                    </Button>
                    <div className="text-gray-600">
                      <p className="text-sm">or drop it here</p>
                      <p className="text-xs text-gray-500 mt-1">
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
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium mt-8"
            >
              Done!
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Message */}
      <div className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex items-center justify-center p-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-relaxed text-white text-center max-w-md">
          One more step for the Masterpiece profile
        </h2>
      </div>
    </div>
  );
}