"use client";

import { useState } from "react";
import { ArrowLeft, Briefcase, FileText, Eye } from "lucide-react";
import { StepIndicator } from "@/components/pages/post/step-indicator";
import { JobInformationStep } from "@/components/pages/post/job-information-step";
import { JobDescriptionStep } from "@/components/pages/post/job-description-step";
import { JobReviewStep } from "@/components/pages/post/job-review-step";
import { useRouter } from "next/navigation";
import { useToastMessages } from "@/hooks/useToastMessages";
import { getErrorMessage, getValidationErrors } from "@/utils/error-handler";

export default function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Add toast hooks
  const { showSuccess, showError, showWarning } = useToastMessages();

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

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Job posted:", formData);

      // Handle job submission success - ONLY TOAST ON FINAL SUBMIT
      showSuccess("Job posted successfully!");

      // Optional: Redirect after successful submission
      setTimeout(() => {
        router.push("/client/dashboard/joblisting");
      }, 2000);
    } catch (error: unknown) {
      console.error("Job posting error:", error);

      // Handle validation errors from API using the referenced pattern
      const validationErrors = getValidationErrors(error);
      if (Object.keys(validationErrors).length > 0) {
        // Handle form field validation errors
        showWarning("Please fix the validation errors in the form");
        // You can map validation errors to specific form fields here
        console.log("Validation errors:", validationErrors);
      } else {
        // Handle other errors
        const errorMessage = getErrorMessage(error);
        showError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 mt-2">
      <div className="flex gap-4 mb-3">
        <button className="flex items-center space-x-2 text-dark hover:text-light transition-colors cursor-pointer">
          <ArrowLeft className="w-6 h-6" onClick={handleBack} />
        </button>
        <span className="font-medium text-2xl font-['Clash_Display']">
          Post a Job
        </span>
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
          <JobReviewStep
            formData={formData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
