"use client";

import CompanyForm from "@/components/pages/signup/company/company-form";
import CompanyLocationForm from "@/components/pages/signup/company/company-location";
import ContactInfoForm from "@/components/pages/signup/company/contact-info";
import CompanyAboutForm from "@/components/pages/signup/company/company-about";
import { useState } from "react";

// Main component that controls the form steps
export default function CompanySignup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    organization: "",
    industry: "",
    fieldOfStudy: "",
    website: "",
    location: "",
    fullName: "",
    jobTitle: "",
    emailAddress: "",
    phoneNumber: "",
    companyDescription: "",
    teamSize: "",
    socialMediaLink: "",
    linkedIn: "",
    workType: "",
    otherLocation: "",
  });

  const handleFormSubmit = (data: object) => {
    setFormData({ ...formData, ...data });
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinalSubmit = (finalData: object) => {
    const completeData = { ...formData, ...finalData };
    console.log("Complete form data:", completeData);
    alert("Form submitted successfully! Check console for data.");
  };

  const steps = [
    {
      title: "Company Information",
      component: (
        <CompanyForm onSubmit={handleFormSubmit} initialData={formData} />
      ),
    },
    {
      title: "Contact Information",
      component: (
        <ContactInfoForm onSubmit={handleFormSubmit} initialData={formData} />
      ),
    },
    {
      title: "Company Location",
      component: (
        <CompanyLocationForm
          onSubmit={handleFormSubmit}
          initialData={formData}
        />
      ),
    },
    {
      title: "About Your Company",
      component: (
        <CompanyAboutForm onSubmit={handleFinalSubmit} initialData={formData} />
      ),
    },
  ];

  return <div>{steps[currentStep].component}</div>;
}
