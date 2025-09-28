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
import { ArrowLeft } from "lucide-react";
import { useFormValidation } from "@/app/signup/company/page";

interface LocationFormData {
  headQuarter: string;
  otherLocation: string;
  workType: string;
}

interface CompanyLocationFormProps {
  onSubmit: (data: Partial<LocationFormData>) => void;
  initialData?: Partial<LocationFormData>;
  onBack?: () => void;
}

export default function CompanyLocationForm({
  onSubmit,
  initialData,
  onBack,
}: CompanyLocationFormProps) {
  const [formData, setFormData] = useState<LocationFormData>({
    headQuarter: "",
    otherLocation: "",
    workType: "",
    ...initialData,
  });

  const router = useRouter();
  const { errors, clearError } = useFormValidation();

  const handleInputChange = (field: keyof LocationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    let isValid = true;

    if (!formData.headQuarter.trim()) {
      isValid = false;
    }

    if (!formData.workType.trim()) {
      isValid = false;
    }

    if (isValid) {
      onSubmit(formData);
    }
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
        {/* Back Button */}
        {onBack && (
          <Button
            variant="none"
            onClick={onBack}
            className="absolute top-4 left-4 z-50 flex items-center gap-2 text-white"
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
                Headquarters Location *
              </Label>
              <LocationInput
                formData={{ location: formData.headQuarter }}
                handleInputChange={(field: string, value: string) =>
                  handleInputChange("headQuarter", value)
                }
                field="headQuarter"
              />
              {errors.headQuarter && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.headQuarter}
                </p>
              )}
            </div>

            {/* Other Branch/ Office (optional) */}
            <div>
              <Label
                htmlFor="location"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Other Branch/ Office (Optional)
              </Label>
              <LocationInput
                formData={{ location: formData.otherLocation }}
                handleInputChange={(field: string, value: string) =>
                  handleInputChange("otherLocation", value)
                }
                field="otherLocation"
              />
            </div>

            {/* Work Type */}
            <div>
              <Label
                htmlFor="workType"
                className="text-sm font-medium text-dark mb-2 block"
              >
                Work Environment *
              </Label>
              <Select
                value={formData.workType}
                onValueChange={(value: string) =>
                  handleInputChange("workType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select work environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="on-site">On-site</SelectItem>
                </SelectContent>
              </Select>
              {errors.workType && (
                <p className="text-red-500 text-sm mt-1">{errors.workType}</p>
              )}
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
