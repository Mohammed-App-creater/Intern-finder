"use client";

import CompanyForm from "@/components/pages/signup/company/company-form";
import CompanyLocationForm from "@/components/pages/signup/company/company-location";
import ContactInfoForm from "@/components/pages/signup/company/contact-info";
import CompanyAboutForm from "@/components/pages/signup/company/company-about";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompanyRegisterStep2 } from "@/hooks/useAuth";
import { CompanyRegisterStep2Dto } from "@/types/auth";
import { useAuthStore, tempoAuthstore } from "@/store/auth";
import { setCookie } from "cookies-next";

// Main component that controls the form steps
export default function CompanySignup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
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
  });

  const { mutate: registerCompanyStep2 } = useCompanyRegisterStep2();
  const tempo = tempoAuthstore.getState();
  const user = useAuthStore();
  const router = useRouter();

  const handleFormSubmit = (data: object) => {
    setFormData({ ...formData, ...data });
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinalSubmit = (finalData: object) => {
    const completeData = { ...formData, ...finalData, companyId: tempo.id || "" };
    registerCompanyStep2((completeData as unknown) as CompanyRegisterStep2Dto, {
      onSuccess: (response) => {
        user.setAuth(response.token, response.company);
        setCookie("token", response.token);
        router.push("/client/dashboard");
      },
      onError: (error) => {
        console.error("Registration error:", error);
      },
    });
    console.log("Complete form data:", completeData);
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
