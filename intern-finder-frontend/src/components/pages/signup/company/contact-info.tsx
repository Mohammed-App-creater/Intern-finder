"use client";

import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Logo from "@/components/icons/logo.png";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface FormData {
  contactName: string;
  contactJobTitle: string;
  contactEmail: string;
  contactPhone: string;
}

interface ContactInfoFormProps {
  onSubmit: (data: object) => void;
  initialData?: object;
}

export default function ContactInfoForm({
  onSubmit,
  initialData,
}: ContactInfoFormProps) {
  const [formData, setFormData] = useState<FormData>({
    contactName: "",
    contactJobTitle: "",
    contactEmail: "",
    contactPhone: "",
    ...initialData,
  });

  const router = useRouter();
  
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
            Contact Information
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Form Fields */}
              <div className="flex flex-col gap-6 flex-1">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-dark"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Smith"
                    value={formData.contactName}
                    onChange={(e) =>
                      handleInputChange("contactName", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Job Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor="jobTitle"
                    className="text-sm font-medium text-dark"
                  >
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    type="text"
                    placeholder="Project Manager"
                    value={formData.contactJobTitle}
                    onChange={(e) =>
                      handleInputChange("contactJobTitle", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <Label
                    htmlFor="emailAddress"
                    className="text-sm font-medium text-dark"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    placeholder="johnsmith@gmail.com"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      handleInputChange("contactEmail", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-dark"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      handleInputChange("contactPhone", e.target.value)
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
              Continue
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
          Help us reach the right person when the perfect intern comes along!
        </h2>
      </motion.div>
    </div>
  );
}
