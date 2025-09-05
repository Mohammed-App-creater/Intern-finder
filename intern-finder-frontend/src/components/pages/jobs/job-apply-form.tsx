"use client";

import Image from "next/image";
import { useState } from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JobApplicationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  companyName?: string;
  logo?: string;
}

export default function JobApplicationPopup({
  isOpen,
  onClose,
  jobTitle = "",
  companyName = "",
  logo="/images/image_placeholder.jpg",
}: JobApplicationPopupProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    previousTitle: "",
    linkedinUrl: "",
    portfolioUrl: "",
    additionalInfo: "",
    resume: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-text-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="Company Logo" width={40} height={40} />
            <div>
              <DialogTitle className="text-lg font-semibold text-dark">
                {jobTitle}
              </DialogTitle>
              <p className="text-sm text-light">{companyName}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark mb-2">
              Submit your application
            </h3>
            <p className="text-sm text-light">
              The following is required and will only be shared with{" "}
              {companyName}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-dark"
              >
                Full name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-dark">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-dark">
                Phone number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="previousTitle"
                className="text-sm font-medium text-dark"
              >
                Current or previous internship title
              </Label>
              <Input
                id="previousTitle"
                type="text"
                placeholder="What's your current or previous job title?"
                value={formData.previousTitle}
                onChange={(e) =>
                  handleInputChange("previousTitle", e.target.value)
                }
                className="mt-1 mb-10"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-bold text-dark">LINKS</h4>

              <div>
                <Label
                  htmlFor="linkedin"
                  className="text-sm font-medium text-dark"
                >
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="Paste your LinkedIn URL"
                  value={formData.linkedinUrl}
                  onChange={(e) =>
                    handleInputChange("linkedinUrl", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label
                  htmlFor="portfolio"
                  className="text-sm font-medium text-dark"
                >
                  Portfolio URL
                </Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="Paste your portfolio URL"
                  value={formData.portfolioUrl}
                  onChange={(e) =>
                    handleInputChange("portfolioUrl", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="additionalInfo"
                className="text-sm font-medium text-dark"
              >
                Additional information
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Add a cover letter or anything else you want to share"
                value={formData.additionalInfo}
                onChange={(e) =>
                  handleInputChange("additionalInfo", e.target.value)
                }
                className="mt-1 min-h-[100px]"
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <span className="font-bold text-light">B</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <span className="italic text-light">I</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <span className="underline text-light">U</span>
                  </Button>
                </div>
                <span className="text-xs text-light">0 / 500</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-dark mb-2 block">
                Attach your resume
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="resume"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Paperclip className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-primary">
                      Attach Resume
                    </span>
                    <span className="text-xs text-light block">
                      or drag and drop
                    </span>
                  </div>
                </Label>
                {formData.resume && (
                  <p className="text-sm text-dark mt-2">
                    Selected: {formData.resume.name}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
            >
              Submit Application
            </Button>

            <p className="text-xs text-light text-center">
              By sending this request you can confirm that you accept our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
