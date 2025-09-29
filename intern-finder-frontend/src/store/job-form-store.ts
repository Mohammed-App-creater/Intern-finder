// stores/job-form-store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface JobFormData {
  jobDescription: string;
  responsibilities: string;
  skills: string;
  jobTitle: string;
  employmentTypes: string[];
  category: string;
  salaryMin: number;
  salaryMax: number;
}

interface JobFormState {
  formData: JobFormData;
  errors: Partial<Record<keyof JobFormData, string>>;
  isStepValid: (step: number) => boolean;
  updateFormData: (data: Partial<JobFormData>) => void;
  validateField: (field: keyof JobFormData) => boolean;
  validateStep: (step: number) => boolean;
  clearErrors: () => void;
}

const initialFormData: JobFormData = {
  jobDescription: "",
  responsibilities: "",
  skills: "",
  jobTitle: "",
  employmentTypes: [],
  category: "",
  salaryMin: 5000,
  salaryMax: 22000,
};

export const useJobFormStore = create<JobFormState>()(
  devtools(
    (set, get) => ({
      formData: initialFormData,
      errors: {},

      updateFormData: (data: Partial<JobFormData>) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
        }));
      },

      validateField: (field: keyof JobFormData): boolean => {
        const state = get();
        const value = state.formData[field];
        let isValid = false;
        let message = "";

        switch (field) {
          case "jobTitle":
            isValid = (value as string).length >= 5;
            message = "Job title must be at least 5 characters long";
            break;
          case "employmentTypes":
            isValid = (value as string[]).length > 0;
            message = "At least one employment type must be selected";
            break;
          case "category":
            isValid = (value as string).length > 0;
            message = "Category is required";
            break;
          case "salaryMin":
            isValid =
              (value as number) >= 100 &&
              (value as number) <= state.formData.salaryMax;
            message = "Minimum salary must be between 100 and maximum salary";
            break;
          case "salaryMax":
            isValid =
              (value as number) >= state.formData.salaryMin &&
              (value as number) <= 50000;
            message = "Maximum salary must be between minimum salary and 50000";
            break;
          case "jobDescription":
            isValid =
              (value as string).length >= 10 && (value as string).length <= 500;
            message = "Job description must be between 10 and 500 characters";
            break;
          case "responsibilities":
            isValid =
              (value as string).length >= 10 && (value as string).length <= 500;
            message = "Responsibilities must be between 10 and 500 characters";
            break;
          case "skills":
            isValid =
              (value as string).length >= 5 && (value as string).length <= 500;
            message = "Skills must be between 5 and 500 characters";
            break;
          default:
            isValid = true;
        }

        set((state) => ({
          errors: {
            ...state.errors,
            [field]: isValid ? undefined : message,
          },
        }));

        return isValid;
      },

      validateStep: (step: number): boolean => {
        const state = get();

        const stepValidations: Record<number, (keyof JobFormData)[]> = {
          1: [
            "jobTitle",
            "employmentTypes",
            "category",
            "salaryMin",
            "salaryMax",
          ],
          2: ["jobDescription", "responsibilities", "skills"],
        };

        const stepFields = stepValidations[step] || [];
        const newErrors: Partial<Record<keyof JobFormData, string>> = {};
        let isValid = true;

        stepFields.forEach((field) => {
          const fieldValid = state.validateField(field);
          if (!fieldValid) {
            isValid = false;
            // Get the current state to access errors
            const currentState = get();
            newErrors[field] = currentState.errors[field];
          }
        });

        set({ errors: newErrors });
        return isValid;
      },

      isStepValid: (step: number): boolean => {
        const state = get();

        const stepValidations: Record<number, (keyof JobFormData)[]> = {
          1: [
            "jobTitle",
            "employmentTypes",
            "category",
            "salaryMin",
            "salaryMax",
          ],
          2: ["jobDescription", "responsibilities", "skills"],
        };

        const stepFields = stepValidations[step] || [];

        return stepFields.every((field) => {
          const value = state.formData[field];

          switch (field) {
            case "jobTitle":
              return (value as string).length >= 5;
            case "employmentTypes":
              return (value as string[]).length > 0;
            case "category":
              return (value as string).length > 0;
            case "salaryMin":
              return (
                (value as number) >= 1000 &&
                (value as number) <= state.formData.salaryMax
              );
            case "salaryMax":
              return (
                (value as number) >= state.formData.salaryMin &&
                (value as number) <= 50000
              );
            case "jobDescription":
              return (
                (value as string).length >= 10 &&
                (value as string).length <= 500
              );
            case "responsibilities":
              return (
                (value as string).length >= 10 &&
                (value as string).length <= 500
              );
            case "skills":
              return (
                (value as string).length >= 5 && (value as string).length <= 500
              );
            default:
              return true;
          }
        });
      },

      clearErrors: () => {
        set({ errors: {} });
      },
    }),
    {
      name: "job-form-store",
    }
  )
);
