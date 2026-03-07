"use client";

import { useState, useEffect } from "react";
import TalentForm from "@/components/pages/signup/talent/talent-form";
import TalentFinalForm from "@/components/pages/signup/talent/talent-final-form";
import { useTalentRegisterStep2 } from "@/hooks/useAuth";
import { tempoAuthstore, useAuthStore } from "@/store/auth";
import { TalentRegisterStep2Dto } from "@/types/auth";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useToastMessages } from "@/hooks/useToastMessages";
import { getErrorMessage, getValidationErrors } from "@/utils/error-handler";

export default function Talent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { showSuccess, showError } = useToastMessages();

  const { mutate: registerTalent } = useTalentRegisterStep2();
  const tempo = tempoAuthstore.getState();
  const user = useAuthStore();

  // Load saved state on mount
  useEffect(() => { // Added import for useEffect if not present, checking imports next
    const savedData = localStorage.getItem("talentSignupData");
    const savedStep = localStorage.getItem("talentSignupStep");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
    setIsLoaded(true);
  }, []); // will need to add useEffect to imports

  // Save state on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("talentSignupData", JSON.stringify(formData));
      localStorage.setItem("talentSignupStep", currentStep.toString());
    }
  }, [formData, currentStep, isLoaded]);

  const handleFormSubmit = (data: object) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleFinalSubmit = (finalData: object) => {
    const completeData = {
      ...formData,
      ...finalData,
      location: "address",
      talentId: tempo.id || "",
    };

    registerTalent(completeData as TalentRegisterStep2Dto, {
      onSuccess: (response) => {
        user.setAuth(response.token, response.talent);
        setCookie("token", response.token);
        // Clear saved state on success
        localStorage.removeItem("talentSignupData");
        localStorage.removeItem("talentSignupStep");
        localStorage.removeItem("profileImageUrl"); // Also clear the profile image if stored
        showSuccess("Registration successful! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/talent/dashboard");
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
  };

  const handleBackToFirstForm = () => {
    setCurrentStep(1);
  };

  if (!isLoaded) {
    return null; // or loading spinner
  }

  return (
    <div>
      {currentStep === 1 && (
        <TalentForm onSubmit={handleFormSubmit} initialData={formData} />
      )}
      {currentStep === 2 && (
        <TalentFinalForm
          onSubmit={handleFinalSubmit}
          initialData={formData}
          onBack={handleBackToFirstForm}
        />
      )}
    </div>
  );
}
