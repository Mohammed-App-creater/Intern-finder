"use client";

import { useState } from "react";
import { ArrowLeft, Briefcase, FileText, Eye } from "lucide-react";
import { StepIndicator } from "@/components/pages/post/step-indicator";
import { JobInformationStep } from "@/components/pages/post/job-information-step";
import { JobDescriptionStep } from "@/components/pages/post/job-description-step";
import { JobReviewStep } from "@/components/pages/post/job-review-step";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const steps = [
    {
      number: 1,
      title: "Job Information",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      number: 2,
      title: "Job Description",
      icon: <FileText className="w-5 h-5" />,
    },
    { number: 3, title: "Job Review", icon: <Eye className="w-5 h-5" /> },
  ];

  const updateFormData = (newData: object) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    console.log("Job posted:", formData);
    // Handle job submission
  };

  return (
    <div className="min-h-screen p-6 mt-2">
      <div className="flex gap-4 mb-3">
        <button className="flex items-center space-x-2 text-dark hover:text-light transition-colors cursor-pointer">
          <ArrowLeft className="w-6 h-6" onClick={handleBack} />
        </button>
        <span className="font-medium text-2xl">Post a Job</span>
      </div>

      <div className="p-8">
        <StepIndicator currentStep={currentStep} steps={steps} />

        {currentStep === 1 && (
          <JobInformationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <JobDescriptionStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        )}

        {currentStep === 3 && (
          <JobReviewStep formData={formData} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
