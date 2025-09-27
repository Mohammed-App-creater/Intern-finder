import type React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    number: number;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8 py-6 px-16 border">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center gap-10">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors",
                step.number < currentStep
                  ? "bg-primary border-primary text-white"
                  : step.number === currentStep
                  ? "bg-primary border-primary text-white"
                  : "bg-secondary text-primary"
              )}
            >
              {step.number < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                step.icon
              )}
            </div>
            <div className="mt-2">
              <div
                className={cn(
                  "text-sm font-medium",
                  step.number <= currentStep ? "text-primary" : "text-light"
                )}
              >
                Step {step.number}/3
              </div>
              <div className="text-sm font-medium text-dark">{step.title}</div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="w-16 h-0.5 mx-4 mt-[-20px]" />
          )}
          {index < 2 && <div className="border h-12"></div>}
        </div>
      ))}
    </div>
  );
}
