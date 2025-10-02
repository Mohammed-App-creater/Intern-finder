"use client";

import { useState } from "react";
import { ArrowLeft, Briefcase, FileText, Eye } from "lucide-react";
import { StepIndicator } from "@/components/pages/post/step-indicator";
import { JobInformationStep } from "@/components/pages/post/job-information-step";
import { JobDescriptionStep } from "@/components/pages/post/job-description-step";
import { JobReviewStep } from "@/components/pages/post/job-review-step";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { usePostJob } from "@/hooks/useJob";
import { JobPosting } from "@/types/job";
import { useToastMessages } from "@/hooks/useToastMessages";
import { getErrorMessage, getValidationErrors } from "@/utils/error-handler";
import { useJobFormStore } from "@/store/job-form-store";

const parseSkills = (skillsInput: string): string[] => {
  return skillsInput
    .split(/[\n,]/)
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);
};

export default function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const postJobMutation = usePostJob();
  const user = useAuthStore().user;
  const companyId = user?.role === "COMPANY" ? user?.id ?? "" : "";
  const { showSuccess, showError, showWarning } = useToastMessages();

  // Use the Zustand store instead of local state
  const { formData, clearErrors } = useJobFormStore();

  const convertToJobPosting = (): JobPosting => {
    const skillsArray = parseSkills(formData.skills || "");
    const salaryMin = formData.salaryMin || 0;
    const salaryMax = formData.salaryMax || 0;

    return {
      title: formData.jobTitle || "",
      environmentType: "Remote",
      categories: [formData.category || ""].filter((cat) => cat.length > 0),
      salaryType: salaryMin > 0 || salaryMax > 0 ? "paid" : "unpaid",
      minSalary: salaryMin,
      maxSalary: salaryMax,
      responsibilities: formData.responsibilities || "",
      description: formData.jobDescription || "",
      professionalSkills: skillsArray,
      tags: skillsArray,
      minExperienceYears: 0,
      degree: "",
      location: "Remote",
      capacity: 1,
      requiredSkills: skillsArray,
    };
  };

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

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      clearErrors();
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    postJobMutation.mutate(
      { companyId, jobData: convertToJobPosting() },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          showSuccess("Job posted successfully!");
          router.push("/client/dashboard");
        },
        onError: (error) => {
          console.error("Error posting job:", error);
          setIsSubmitting(false);

          const validationErrors = getValidationErrors(error);
          if (Object.keys(validationErrors).length > 0) {
            showWarning("Please fix the validation errors in the form");
            console.log("Validation errors:", validationErrors);
          } else {
            const errorMessage = getErrorMessage(error);
            showError(errorMessage);
          }
        },
      }
    );
  };

  if (isSubmitting) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center pb-10 mb-10">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-4xl font-bold text-primary">Posting your job...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-2">
      <div className="flex gap-4 mb-3">
        <button
          className="flex items-center space-x-2 text-dark hover:text-light transition-colors cursor-pointer"
          onClick={handleBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="font-medium text-2xl font-['Clash_Display']">
          Post a Job
        </span>
      </div>

      <div className="p-8">
        <StepIndicator currentStep={currentStep} steps={steps} />

        {currentStep === 1 && <JobInformationStep onNext={handleNext} />}

        {currentStep === 2 && <JobDescriptionStep onNext={handleNext} />}

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
