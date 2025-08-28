'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider"; 
import { MapPin, Search } from "lucide-react";
import { useState } from "react";

export default function Filter() {
    const [salaryRange, setSalaryRange] = useState([0, 60000])

    const categories = [
  { name: "Commerce", count: 10 },
  { name: "Telecommunications", count: 10 },
  { name: "Hotels & Tourism", count: 10 },
  { name: "Education", count: 10 },
  { name: "Financial Services", count: 10 },
]

const jobTypes = [
  { name: "Full Time", count: 10 },
  { name: "Part Time", count: 10 },
  { name: "Freelance", count: 10 },
  { name: "Seasonal", count: 10 },
]

const experienceLevels = [
  { name: "No experience", count: 10 },
  { name: "Fresher", count: 10 },
  { name: "Intermediate", count: 10 },
  { name: "Expert", count: 10 },
]

const datePosted = [
  { name: "All", count: 10 },
  { name: "Last Hour", count: 10 },
  { name: "Last 24 Hours", count: 10 },
  { name: "Last 7 Days", count: 10 },
  { name: "Last 30 Days", count: 10 },
]

const tags = ["engineering", "design", "value", "marketing", "management", "soft", "construction"]
  return (
    <div className="w-70 bg-secondary p-6 rounded-md h-fit">
      {/* Search by Job Title */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Search by Job Title</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light w-4 h-4" />
          <Input
            placeholder="Job title or company"
            className="pl-10"
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="text-dark font-medium mb-3">Location</h3>
        <Select>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-light" />
              <SelectValue placeholder="Choose city" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="los-angeles">Los Angeles</SelectItem>
            <SelectItem value="chicago">Chicago</SelectItem>
          </SelectContent>
        </Select>
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
                <Checkbox id={category.name} />
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
          className="w-full mt-3 bg-primary text-white hover:bg-primary/90"
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
                <Checkbox id={type.name} />
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
                <Checkbox id={level.name} />
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
                <Checkbox id={date.name} />
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
            <span>Salary: $0 - 60000</span>
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90"
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
              className="bg-secondary text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
