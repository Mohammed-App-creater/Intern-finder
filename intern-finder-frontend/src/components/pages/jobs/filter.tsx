"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { useState } from "react";
import { LocationInput } from "@/components/common/location";

export default function Filter() {
  const [salaryRange, setSalaryRange] = useState([0, 60000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ location: "" });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<
    string[]
  >([]);
  const [selectedDatePosted, setSelectedDatePosted] = useState<string[]>([]);

  const categories = [
    { name: "Commerce", count: 10 },
    { name: "Telecommunications", count: 10 },
    { name: "Hotels & Tourism", count: 10 },
    { name: "Education", count: 10 },
    { name: "Financial Services", count: 10 },
  ];

  const jobTypes = [
    { name: "Full Time", count: 10 },
    { name: "Part Time", count: 10 },
    { name: "Freelance", count: 10 },
    { name: "Seasonal", count: 10 },
  ];

  const experienceLevels = [
    { name: "No experience", count: 10 },
    { name: "Fresher", count: 10 },
    { name: "Intermediate", count: 10 },
    { name: "Expert", count: 10 },
  ];

  const datePosted = [
    { name: "All", count: 10 },
    { name: "Last Hour", count: 10 },
    { name: "Last 24 Hours", count: 10 },
    { name: "Last 7 Days", count: 10 },
    { name: "Last 30 Days", count: 10 },
  ];

  const tags = [
    "Engineering",
    "Design",
    "Value",
    "Marketing",
    "Management",
    "Soft",
    "Construction",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleJobTypeChange = (jobType: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobType)
        ? prev.filter((j) => j !== jobType)
        : [...prev, jobType]
    );
  };

  const handleExperienceLevelChange = (level: string) => {
    setSelectedExperienceLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleDatePostedChange = (date: string) => {
    setSelectedDatePosted((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const handleApplyFilters = () => {
    // Here you would typically make an API call with all the filter parameters
    const filters = {
      searchQuery,
      location: formData.location,
      categories: selectedCategories,
      jobTypes: selectedJobTypes,
      experienceLevels: selectedExperienceLevels,
      datePosted: selectedDatePosted,
      salaryRange,
      tags: selectedTags,
    };

    console.log("Applied filters:", filters);
    // You would replace the console.log with your actual API call
  };

  return (
    <div className="w-70 bg-secondary p-6 rounded-md h-fit">
      {/* Search by Job Title */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Search by Job Title</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light w-4 h-4" />
          <Input
            placeholder="Job title or company"
            className="pl-10 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Location</h3>
        <LocationInput
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={() => handleCategoryChange(category.name)}
                />
                <label htmlFor={category.name} className="text-sm text-dark">
                  {category.name}
                </label>
              </div>
              <span className="text-xs text-light">{category.count}</span>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-3 bg-primary text-white hover:bg-primary/90 hover:text-white"
        >
          Show More
        </Button>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Job Type</h3>
        <div className="space-y-3">
          {jobTypes.map((type) => (
            <div key={type.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={type.name}
                  checked={selectedJobTypes.includes(type.name)}
                  onCheckedChange={() => handleJobTypeChange(type.name)}
                />
                <label htmlFor={type.name} className="text-sm text-dark">
                  {type.name}
                </label>
              </div>
              <span className="text-xs text-light">{type.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Experience Level</h3>
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <div key={level.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={level.name}
                  checked={selectedExperienceLevels.includes(level.name)}
                  onCheckedChange={() =>
                    handleExperienceLevelChange(level.name)
                  }
                />
                <label htmlFor={level.name} className="text-sm text-dark">
                  {level.name}
                </label>
              </div>
              <span className="text-xs text-light">{level.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Date Posted */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Date Posted</h3>
        <div className="space-y-3">
          {datePosted.map((date) => (
            <div key={date.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={date.name}
                  checked={selectedDatePosted.includes(date.name)}
                  onCheckedChange={() => handleDatePostedChange(date.name)}
                />
                <label htmlFor={date.name} className="text-sm text-dark">
                  {date.name}
                </label>
              </div>
              <span className="text-xs text-light">{date.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Salary</h3>
        <div className="px-2">
          <Slider
            value={salaryRange}
            onValueChange={setSalaryRange}
            max={60000}
            step={1000}
            className="mb-4"
          />
          <div className="flex justify-between items-center text-sm text-light">
            <span>
              Salary: ${salaryRange[0]} - ${salaryRange[1]}
            </span>
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90"
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-dark font-medium mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`cursor-pointer ${
                selectedTags.includes(tag)
                  ? "bg-primary text-white"
                  : "bg-[#3096891A] text-primary"
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}