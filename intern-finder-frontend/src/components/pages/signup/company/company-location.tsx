"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LocationInput } from "@/components/common/location";
import Logo from "@/components/icons/logo.png";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CompanyLocationFormProps {
  onSubmit: (data: object) => void;
  initialData?: object;
}

export default function CompanyLocationForm({
  onSubmit,
  initialData,
}: CompanyLocationFormProps) {
  const [formData, setFormData] = useState({
    location: "",
    otherLocation: "",
    workType: "",
    ...initialData,
  });

  const router = useRouter();

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
      <motion.div
        initial={{ x: 800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-gradient-to-br from-[#309689] to-[#1E3E57] flex flex-col p-12 gap-25 text-white z-10"
      >
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 mb-8"
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
          <div className="max-w-170">
            <h1 className="flex justify-center text-7xl font-bold leading-tight">
              Show interns where the magic happens — on-site, remote, or
              anywhere in between
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
          <h2 className="text-2xl font-extrabold text-dark mb-12">
            Where does your company operate?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Headquarters Location */}
            <div>
              <Label
                htmlFor="location"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Headquarters Location
              </Label>
              <LocationInput
                formData={{ location: formData.location }}
                handleInputChange={handleInputChange}
              />
            </div>

            {/* Other Branch/ Office (optional) */}
            <div>
              <Label
                htmlFor="location"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Other Branch/ Office (optional)
              </Label>
              <LocationInput
                formData={{ location: formData.otherLocation }}
                handleInputChange={handleInputChange}
              />
            </div>

            {/* Work Type */}
            <div>
              <Label
                htmlFor="workType"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Work Environment
              </Label>
              <Select
                value={formData.workType}
                onValueChange={(value: string) =>
                  handleInputChange("workType", value)
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
