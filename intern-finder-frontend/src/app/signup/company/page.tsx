"use client";

import CompanyForm from "@/components/pages/signup/company/company-form";
import CompanyLocationForm from "@/components/pages/signup/company/company-location";
import ContactInfoForm from "@/components/pages/signup/company/contact-info";
import CompanyAboutForm from "@/components/pages/signup/company/company-about";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCompanyRegisterStep2 } from "@/hooks/useAuth";
import { CompanyRegisterStep2Dto } from "@/types/auth";
import { useAuthStore, tempoAuthstore } from "@/store/auth";
import { setCookie } from "cookies-next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types for form data
interface CompanyFormData {
  organization: string;
  industries: string[];
  fieldOfStudy: string;
  websiteUrl: string;
  headQuarter: string;
  contactName: string;
  contactJobTitle: string;
  contactEmail: string;
  contactPhone: string;
  companyDescription: string;
  techStack: string[];
  teamSize: string;
  socialMediaLink: string;
  linkedinUrl: string;
  workType: string;
  otherLocation: string;
  logoUrl: string;
}

interface StepData {
  [key: string]: string | string[];
}

// Zustand store for form validation
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormValidationState {
  errors: Record<string, string>;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
  validateStep: (step: number, data: CompanyFormData) => boolean;
}

export const useFormValidation = create<FormValidationState>()(
  persist(
    (set, get) => ({
      errors: {},
      setError: (field: string, message: string) =>
        set((state) => ({
          errors: { ...state.errors, [field]: message },
        })),
      clearError: (field: string) =>
        set((state) => {
          const newErrors = { ...state.errors };
          delete newErrors[field];
          return { errors: newErrors };
        }),
      clearAllErrors: () => set({ errors: {} }),
      validateStep: (step: number, data: CompanyFormData) => {
        const { setError, clearError } = get();
        let isValid = true;

        switch (step) {
          case 0: // Company Form
            if (!data.organization?.trim()) {
              setError("organization", "Organization type is required");
              isValid = false;
            } else {
              clearError("organization");
            }

            if (
              !data.industries ||
              data.industries.length === 0 ||
              data.industries[0]?.trim() === ""
            ) {
              setError("industries", "At least one industry is required");
              isValid = false;
            } else {
              clearError("industries");
            }

            if (!data.logoUrl) {
              setError("logoUrl", "Company logo is required");
              isValid = false;
            } else {
              clearError("logoUrl");
            }
            break;

          case 1: // Contact Info
            if (!data.contactName?.trim()) {
              setError("contactName", "Contact name is required");
              isValid = false;
            } else {
              clearError("contactName");
            }

            if (!data.contactJobTitle?.trim()) {
              setError("contactJobTitle", "Job title is required");
              isValid = false;
            } else {
              clearError("contactJobTitle");
            }

            if (!data.contactEmail?.trim()) {
              setError("contactEmail", "Email is required");
              isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
              setError("contactEmail", "Please enter a valid email address");
              isValid = false;
            } else {
              clearError("contactEmail");
            }

            if (!data.contactPhone?.trim()) {
              setError("contactPhone", "Phone number is required");
              isValid = false;
            } else {
              clearError("contactPhone");
            }
            break;

          case 2: // Company Location
            if (!data.headQuarter?.trim()) {
              setError("headQuarter", "Headquarters location is required");
              isValid = false;
            } else {
              clearError("headQuarter");
            }

            if (!data.workType?.trim()) {
              setError("workType", "Work environment is required");
              isValid = false;
            } else {
              clearError("workType");
            }
            break;

          case 3: // Company About
            if (!data.companyDescription?.trim()) {
              setError("companyDescription", "Company description is required");
              isValid = false;
            } else {
              clearError("companyDescription");
            }

            if (!data.teamSize?.trim()) {
              setError("teamSize", "Team size is required");
              isValid = false;
            } else {
              clearError("teamSize");
            }
            break;
        }

        return isValid;
      },
    }),
    {
      name: "form-validation-storage",
    }
  )
);

// Main component that controls the form steps
export default function CompanySignup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CompanyFormData>({
    organization: "",
    industries: [""],
    fieldOfStudy: "",
    websiteUrl: "",
    headQuarter: "",
    contactName: "",
    contactJobTitle: "",
    contactEmail: "",
    contactPhone: "",
    companyDescription: "",
    techStack: [""],
    teamSize: "",
    socialMediaLink: "",
    linkedinUrl: "",
    workType: "",
    otherLocation: "",
    logoUrl: "",
  });

  const { mutate: registerCompanyStep2 } = useCompanyRegisterStep2();
  const tempo = tempoAuthstore.getState();
  const user = useAuthStore();
  const router = useRouter();
  const { validateStep, clearAllErrors } = useFormValidation();

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        window.history.pushState(null, "", window.location.href);
      }
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentStep]);

  const handleFormSubmit = (data: StepData) => {
    const newData = { ...formData, ...data };

    // Validate current step before proceeding
    if (!validateStep(currentStep, newData)) {
      return;
    }

    setFormData(newData);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Add to history when moving forward
      window.history.pushState(null, "", window.location.href);
    }
  };

  const handleFinalSubmit = (finalData: StepData) => {
    const completeData = {
      ...formData,
      ...finalData,
      companyId: tempo.id || "",
    };

    // Validate final step before submission
    if (!validateStep(currentStep, completeData)) {
      return;
    }

    registerCompanyStep2(completeData as unknown as CompanyRegisterStep2Dto, {
      onSuccess: (response) => {
        user.setAuth(response.token, response.company);
        setCookie("token", response.token);
        clearAllErrors();
        router.push("/client/dashboard");
      },
      onError: (error) => {
        console.error("Registration error:", error);
      },
    });
    console.log("Complete form data:", completeData);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Add to history when moving back via button
      window.history.pushState(null, "", window.location.href);
    }
  };

  const steps = [
    {
      title: "Company Information",
      component: (
        <CompanyForm
          onSubmit={handleFormSubmit}
          initialData={formData}
          onBack={handleBack}
        />
      ),
    },
    {
      title: "Contact Information",
      component: (
        <ContactInfoForm
          onSubmit={handleFormSubmit}
          initialData={formData}
          onBack={handleBack}
        />
      ),
    },
    {
      title: "Company Location",
      component: (
        <CompanyLocationForm
          onSubmit={handleFormSubmit}
          initialData={formData}
          onBack={handleBack}
        />
      ),
    },
    {
      title: "About Your Company",
      component: (
        <CompanyAboutForm
          onSubmit={handleFinalSubmit}
          initialData={formData}
          onBack={handleBack}
        />
      ),
    },
  ];

  return (
    <div className="relative">
      {currentStep > 0 && (
        <Button
          variant="none"
          onClick={handleBack}
          className="absolute top-4 left-4 z-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      )}
      {steps[currentStep].component}
    </div>
  );
}
