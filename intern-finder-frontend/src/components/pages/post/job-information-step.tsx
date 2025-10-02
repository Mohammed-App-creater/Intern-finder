"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useJobFormStore } from "@/store/job-form-store";

interface JobInformationStepProps {
  onNext: () => void;
}

export function JobInformationStep({ onNext }: JobInformationStepProps) {
  const { formData, updateFormData, errors, validateStep } = useJobFormStore();
  const [isSalaryFree, setIsSalaryFree] = useState(false);

  const handleNext = () => {
    if (validateStep(1)) {
      onNext();
    }
  };

  const handleFreeButtonClick = () => {
    setIsSalaryFree(!isSalaryFree);
    if (!isSalaryFree) {
      // When setting to free, clear the salary values
      updateFormData({ salaryMin: 0, salaryMax: 0 });
    } else {
      // When unsetting free, restore default values
      updateFormData({ salaryMin: 5000, salaryMax: 22000 });
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm">
          This information will be displayed publicly
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-10 max-w-5xl">
          <div className="flex flex-col gap-2">
            <Label htmlFor="jobTitle" className="text-dark font-medium">
              Job Title *
            </Label>
            <p className="text-light text-sm mb-2">
              Job titles must describe one position
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              id="jobTitle"
              placeholder="e.g. Software Engineer"
              value={formData.jobTitle}
              onChange={(e) => updateFormData({ jobTitle: e.target.value })}
              className="mt-1 w-85"
              required
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
            )}
            <p className="text-light text-xs mt-1">At least 5 characters</p>
          </div>
        </div>
        <div className="border-b pb-4"></div>

        <div className="grid grid-cols-2 gap-10 max-w-5xl pt-2">
          <div className="flex flex-col gap-2">
            <Label className="text-dark font-medium">
              Type of Employment *
            </Label>
            <p className="text-light text-sm mb-3">
              You can select multiple employment types
            </p>
          </div>

          <div className="space-y-3">
            {["Full-Time", "Part-Time", "Remote"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={formData.employmentTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    const types = formData.employmentTypes;
                    if (checked) {
                      updateFormData({ employmentTypes: [...types, type] });
                    } else {
                      updateFormData({
                        employmentTypes: types.filter(
                          (t: string) => t !== type
                        ),
                      });
                    }
                  }}
                />
                <Label htmlFor={type} className="text-dark font-light">
                  {type}
                </Label>
              </div>
            ))}
            {errors.employmentTypes && (
              <p className="text-red-500 text-xs mt-1">
                {errors.employmentTypes}
              </p>
            )}
          </div>
        </div>
        <div className="border-b pb-4"></div>

        <div className="grid grid-cols-2 gap-10 max-w-5xl pt-2">
          <div className="flex flex-col gap-2">
            <Label className="text-dark font-medium">Categories *</Label>
            <p className="text-light text-sm mb-2">Select the job category</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-dark font-light">Select Job Categories</p>
            <Select
              value={formData.category}
              onValueChange={(value) => updateFormData({ category: value })}
            >
              <SelectTrigger className="w-85">
                <SelectValue placeholder="Select Job Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>
        </div>
        <div className="border-b pb-4"></div>

        <div className="grid grid-cols-2 gap-10 max-w-5xl pb-10 pt-2">
          <div className="flex flex-col gap-2">
            <Label className="text-dark font-medium">Salary *</Label>
            <p className="text-light text-sm mb-4 max-w-xs">
              Please specify the estimated salary range for the role
            </p>
          </div>

          <div className="flex items-center justify-between max-w-lg pr-1">
            <div className="flex flex-col gap-6">
              {!isSalaryFree && (
                <>
                  <div className="flex items-center space-x-20">
                    <div className="flex items-center space-x-2 border p-2">
                      <span className="text-light">$</span>
                      <span className="border h-5"></span>
                      <span className="text-dark font-medium">
                        {formData.salaryMin || 5000}
                      </span>
                    </div>
                    <span className="text-light">to</span>
                    <div className="flex items-center space-x-2 border p-2">
                      <span className="text-light">$</span>
                      <span className="border h-5"></span>
                      <span className="text-dark font-medium">
                        {formData.salaryMax || 22000}
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[
                      formData.salaryMin || 5000,
                      formData.salaryMax || 22000,
                    ]}
                    onValueChange={([min, max]) =>
                      updateFormData({ salaryMin: min, salaryMax: max })
                    }
                    max={50000}
                    min={1000}
                    step={1000}
                    className="w-full"
                  />
                </>
              )}
              {(errors.salaryMin || errors.salaryMax) && !isSalaryFree && (
                <p className="text-red-500 text-xs">
                  {errors.salaryMin || errors.salaryMax}
                </p>
              )}
            </div>
            <Button
              variant="none"
              size="sm"
              className={`border-primary ${
                isSalaryFree
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-primary text-white hover:bg-primary/80"
              }`}
              onClick={handleFreeButtonClick}
            >
              {isSalaryFree ? "Paid" : "Free"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end max-w-5xl">
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
