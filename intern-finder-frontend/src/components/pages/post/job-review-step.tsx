"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface JobFormData {
  jobDescription?: string;
  responsibilities?: string;
  skills?: string;
  jobTitle?: string;
  employmentTypes?: string[];
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
}

interface JobReviewStepProps {
  formData: JobFormData;
  onSubmit: () => void;
}

export function JobReviewStep({
  formData,
  onSubmit,
}: JobReviewStepProps) {
  const responsibilities =
    formData.responsibilities
      ?.split("\n")
      .filter((item: string) => item.trim()) || [];
  const skills =
    formData.skills?.split("\n").filter((item: string) => item.trim()) || [];

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-dark mb-2">Review</h2>
        <p className="text-light text-sm">Review the job before posting</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-dark mb-3">
            Job Description
          </h3>
          <p className="text-dark leading-relaxed">
            {formData.jobDescription || "No description provided"}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-dark mb-3">
            Key Responsibilities
          </h3>
          <div className="space-y-2">
            {responsibilities.map((responsibility: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-dark">{responsibility}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-dark mb-3">
            Professional Skills
          </h3>
          <div className="space-y-2">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-dark">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Post Job
        </Button>
      </div>
    </div>
  );
}
