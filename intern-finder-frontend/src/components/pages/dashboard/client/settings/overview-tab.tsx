"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";

export function OverviewTab() {
  const [selectedLocations, setSelectedLocations] = useState([
    "England",
    "Japan",
    "Australia",
  ]);
  const [selectedTechStack, setSelectedTechStack] = useState([
    "HTML 5",
    "CSS 3",
    "Javascript",
  ]);

  const removeLocation = (location: string) => {
    setSelectedLocations((prev) => prev.filter((loc) => loc !== location));
  };

  const removeTechStack = (tech: string) => {
    setSelectedTechStack((prev) => prev.filter((t) => t !== tech));
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-medium text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm mb-6">
          This is Company information that you can update anytime.
        </p>
      </div>

      {/* Company Logo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-base font-medium text-dark mb-2">Company Logo</h3>
          <p className="text-light text-sm mb-4">
            This image will be shown publicly as your company logo
          </p>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-red-400 rounded-full"></div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex-1 text-center">
              <Upload className="w-8 h-8 text-light mx-auto mb-2" />
              <p className="text-primary text-sm font-medium mb-1">
                Click to replace or drag and drop
              </p>
              <p className="text-light text-xs">
                SVG, PNG, JPG or GIF (max. 400 x 400px)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div>
        <h3 className="text-base font-medium text-dark mb-2">
          Company Details
        </h3>
        <p className="text-light text-sm mb-6">
          Introduce your company core info quickly to users by fill up company
          details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="company-name"
              className="text-dark text-sm font-medium"
            >
              Company Name
            </Label>
            <Input id="company-name" defaultValue="Slack" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="website" className="text-dark text-sm font-medium">
              Website
            </Label>
            <Input
              id="website"
              defaultValue="https://www.slack.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-dark text-sm font-medium">Location</Label>
            <div className="mt-1 flex flex-wrap gap-2">
              {selectedLocations.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="bg-secondary text-dark"
                >
                  {location}
                  <button
                    onClick={() => removeLocation(location)}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div></div>

          <div>
            <Label className="text-dark text-sm font-medium">Employee</Label>
            <Select defaultValue="1-50">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">1 - 50</SelectItem>
                <SelectItem value="51-200">51 - 200</SelectItem>
                <SelectItem value="201-500">201 - 500</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-dark text-sm font-medium">Industry</Label>
            <Select defaultValue="technology">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-dark text-sm font-medium">
                Date Founded
              </Label>
              <Select defaultValue="31">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-dark text-sm font-medium invisible">
                Month
              </Label>
              <Select defaultValue="july">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                  <SelectItem value="september">September</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-dark text-sm font-medium invisible">
                Year
              </Label>
              <Select defaultValue="2021">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-dark text-sm font-medium">Tech Stack</Label>
            <div className="mt-1 flex flex-wrap gap-2">
              {selectedTechStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-secondary text-dark"
                >
                  {tech}
                  <button
                    onClick={() => removeTechStack(tech)}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Company */}
      <div>
        <h3 className="text-base font-medium text-dark mb-2">About Company</h3>
        <p className="text-light text-sm mb-4">
          Brief description for your company. URLs are hyperlinked.
        </p>

        <div>
          <Label className="text-dark text-sm font-medium">Description</Label>
          <Textarea
            className="mt-1 min-h-[120px]"
            defaultValue="Nomad is part of the Information Technology industry. We believe travellers want to experience real life and meet local people. Nomad has 30 total employees across all of its locations and generates $1.50 million in sales."
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-light text-xs">Maximum 500 characters</p>
            <p className="text-light text-xs">0 / 500</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-white hover:bg-primary/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
