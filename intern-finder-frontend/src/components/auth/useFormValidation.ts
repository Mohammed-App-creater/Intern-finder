"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export default useFormValidation;
