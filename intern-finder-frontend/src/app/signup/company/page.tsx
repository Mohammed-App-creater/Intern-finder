"use client";

import { useState } from "react";
import CompanyForm from "@/components/pages/signup/company-form";
import ContactInfoForm from "@/components/pages/signup/contact-info";

export default function Talent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data: object) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleFinalSubmit = (finalData: object) => {
    // Combine all form data and submit
    const completeData = { ...formData, ...finalData };
    console.log("Complete form data:", completeData);
    // Here you would typically send the data to your backend
  };

  return (
    <div>
      {currentStep === 1 && (
        <CompanyForm onSubmit={handleFormSubmit} initialData={formData} />
      )}
      {currentStep === 2 && (
        <ContactInfoForm onSubmit={handleFinalSubmit} initialData={formData} />
      )}
    </div>
  );
}