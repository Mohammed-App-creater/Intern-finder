"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, AlignLeft, Link } from "lucide-react";
import { useJobFormStore } from "@/store/job-form-store";

interface JobDescriptionStepProps {
  onNext: () => void;
}

export function JobDescriptionStep({ onNext }: JobDescriptionStepProps) {
  const { formData, updateFormData, errors, validateStep } = useJobFormStore();

  const handleNext = () => {
    if (validateStep(2)) {
      onNext();
    }
  };

  const EditorToolbar = () => (
    <div className="flex items-center space-x-2 p-2 border-t border-b">
      <Button variant="none" size="sm">
        <Bold className="w-4 h-4" />
      </Button>
      <Button variant="none" size="sm">
        <Italic className="w-4 h-4" />
      </Button>
      <Button variant="none" size="sm">
        <List className="w-4 h-4" />
      </Button>
      <Button variant="none" size="sm">
        <AlignLeft className="w-4 h-4" />
      </Button>
      <Button variant="none" size="sm">
        <Link className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-dark mb-2">Details</h2>
        <p className="text-light text-sm">
          Add the description of the job, responsibilities, and Professional
          skills
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-5 pb-5 pt-2">
          <div className="flex flex-col gap-2 w-200">
            <Label className="text-dark font-medium">Job Descriptions *</Label>
            <p className="text-light text-sm mb-2">
              Describe the job position in detail
            </p>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="border overflow-hidden w-full">
              <Textarea
                placeholder="Enter job description"
                value={formData.jobDescription}
                onChange={(e) =>
                  updateFormData({ jobDescription: e.target.value })
                }
                className="min-h-50 border-0 focus-visible:ring-0"
                required
              />
              <EditorToolbar />
            </div>
            {errors.jobDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.jobDescription}
              </p>
            )}
            <div className="flex justify-between items-center p-2 text-xs text-light">
              <span>Between 10-500 characters</span>
              <span>{formData.jobDescription.length} / 500</span>
            </div>
          </div>
        </div>
        <div className="border-b"></div>
        <div className="flex gap-5 pb-5 pt-2">
          <div className="flex flex-col gap-2 w-200">
            <Label className="text-dark font-medium">Responsibilities *</Label>
            <p className="text-light text-sm mb-2">
              Outline the core responsibilities of the position
            </p>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="border overflow-hidden w-full">
              <Textarea
                placeholder="Enter responsibilities"
                value={formData.responsibilities}
                onChange={(e) =>
                  updateFormData({ responsibilities: e.target.value })
                }
                className="min-h-50 border-0 focus-visible:ring-0"
                required
              />
              <EditorToolbar />
            </div>
            {errors.responsibilities && (
              <p className="text-red-500 text-xs mt-1">
                {errors.responsibilities}
              </p>
            )}
            <div className="flex justify-between items-center p-2 text-xs text-light">
              <span>Between 10-500 characters</span>
              <span>{formData.responsibilities.length} / 500</span>
            </div>
          </div>
        </div>
        <div className="border-b"></div>
        <div className="flex gap-5 pb-5 pt-2">
          <div className="flex flex-col gap-2 w-200">
            <Label className="text-dark font-medium">
              Professional Skills *
            </Label>
            <p className="text-light text-sm mb-2">
              Add the skills you are looking for
            </p>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="border overflow-hidden w-full">
              <Textarea
                placeholder="Enter skills"
                value={formData.skills}
                onChange={(e) => updateFormData({ skills: e.target.value })}
                className="min-h-50 border-0 focus-visible:ring-0"
                required
              />
              <EditorToolbar />
            </div>
            {errors.skills && (
              <p className="text-red-500 text-xs mt-1">{errors.skills}</p>
            )}
            <div className="flex justify-between items-center p-2 text-xs text-light">
              <span>Between 5-500 characters</span>
              <span>{formData.skills.length} / 500</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
