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
import { useToastMessages } from "@/hooks/useToastMessages";
import { getErrorMessage, getValidationErrors } from "@/utils/error-handler";
import useFormValidation from "@/components/auth/useFormValidation";

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
  description: string;
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
    description: "",
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
  const { showSuccess, showError } = useToastMessages();

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
        showSuccess("Registration successful! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/client/dashboard");
        }, 2000);
      },
      onError: (error: unknown) => {
        console.error("Registration error:", error);

        // Handle validation errors from API
        const validationErrors = getValidationErrors(error);
        if (Object.keys(validationErrors).length > 0) {
          // You can map these to specific form fields if needed
          const errorMessage = Object.values(validationErrors).join(", ");
          showError(errorMessage);
        } else {
          const errorMessage = getErrorMessage(error);
          showError(errorMessage);
        }
      },
    });
    console.log("Complete form data:", completeData);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  return <div className="relative">{steps[currentStep].component}</div>;
}
