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

interface jobFormData {
  category: string;
  employmentTypes: string[];
  jobDescription: string;
  salaryMax: string;
  salaryMin: string;
  jobTitle: string;
  responsibilities: string;
  skills: string;
}

const parseSkills = (skillsInput: string): string[] => {
  return skillsInput
    .split(/[\n,]/)
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);
};

export default function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const postJobMutation = usePostJob();
  const user = useAuthStore().user;
  const companyId = user?.role === "COMPANY" ? (user?.id ?? "") : "";

  const convertToJobPosting = (source: jobFormData): JobPosting => {
    const skillsArray = parseSkills(source.skills || "");
    const salaryMin = Number(source.salaryMin) || 0;
    const salaryMax = Number(source.salaryMax) || 0;

    return {
      title: source.jobTitle || "",
      environmentType: "Remote", 
      categories: [source.category || ""].filter((cat) => cat.length > 0),
      salaryType: "paid", 
      minSalary: salaryMin, 
      maxSalary: salaryMax,
      responsibilities: source.responsibilities || "",
      description: source.jobDescription || "",
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
    setIsLoading(true);
    postJobMutation.mutate({ companyId, jobData: convertToJobPosting(formData as jobFormData) }, {
      onSuccess: () => {
        setIsLoading(false);
        router.push("/client/dashboard");
      },
      onError: (error) => {
        console.error("Error posting job:", error);
        setIsLoading(false);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-lg font-medium">Posting your job...</p>
        </div>
      </div>
    );
  } 
  return (
    <div className="min-h-screen p-6 mt-2">
      <div className="flex gap-4 mb-3">
        <button className="flex items-center space-x-2 text-dark hover:text-light transition-colors cursor-pointer">
          <ArrowLeft className="w-6 h-6" onClick={handleBack} />
        </button>
        <span className="font-medium text-2xl font-['Clash_Display']">
          Post a Job
        </span>
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
            isSubmitting={isLoading}
          />
        )}
      </div>
    </div>
  );
}
