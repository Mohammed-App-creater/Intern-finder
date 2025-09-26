"use client";

import { useState } from "react";
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
  const router = useRouter();
  const { showSuccess, showError } = useToastMessages();

  const { mutate: registerTalent } = useTalentRegisterStep2();
  const tempo = tempoAuthstore.getState();
  const user = useAuthStore();

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
