"use client";

import { useState } from "react";
import TalentForm from "@/components/pages/signup/talent-form";
import TalentFinalForm from "@/components/pages/signup/talent-final-form";

export default function Talent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleFinalSubmit = (finalData: any) => {
    // Combine all form data and submit
    const completeData = { ...formData, ...finalData };
    console.log("Complete form data:", completeData);
    // Here you would typically send the data to your backend
  };

  return (
    <div>
      {currentStep === 1 && (
        <TalentForm onSubmit={handleFormSubmit} initialData={formData} />
      )}
      {currentStep === 2 && (
        <TalentFinalForm onSubmit={handleFinalSubmit} initialData={formData} />
      )}
    </div>
  );
}