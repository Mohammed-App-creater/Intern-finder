"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import CommonSelector from "@/components/common/selector";

export function OverviewTab() {
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="border-b pb-4">
        <h2 className="text-lg font-medium text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm mb-6">
          This is Company information that you can update anytime.
        </p>
      </div>

      {/* Company Logo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="max-w-xs">
          <h3 className="text-base font-medium text-dark mb-2">Company Logo</h3>
          <p className="text-light text-sm mb-4">
            This image will be shown publicly as your company logo
          </p>
        </div>
        <div className="flex items-center gap-10">
          <Image
            src={"https://cdn-icons-png.flaticon.com/128/5968/5968835.png"}
            alt="Company Logo"
            width={40}
            height={40}
            className="h-25 w-25"
          />

          <div className="border-2 border-dashed border-primary rounded-lg p-8 flex-1 text-center">
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
      <div className="border-b w-full pb-4"></div>

      {/* Company Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="max-w-xs">
          <h3 className="text-base font-medium text-dark mb-2">
            Company Details
          </h3>
          <p className="text-light text-sm mb-6">
            Introduce your company core info quickly to users by fill up company
            details
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <Label
              htmlFor="company-name"
              className="text-dark text-sm font-medium"
            >
              Company Name
            </Label>
            <Input
              id="company-name"
              defaultValue="Slack"
              className="mt-1 rounded-none"
            />
          </div>

          <div>
            <Label htmlFor="website" className="text-dark text-sm font-medium">
              Website
            </Label>
            <Input
              id="website"
              defaultValue="https://www.slack.com"
              className="mt-1 rounded-none"
            />
          </div>

          <CommonSelector
            label="Location"
            placeholder="Add locations"
            initialItems={["England", "Japan", "Ethiopia"]}
            onItemsChange={(items) => console.log("Location updated:", items)}
          />

          <div className="flex justify-between">
            <div>
              <Label className="text-dark text-sm font-medium">Employee</Label>
              <Select defaultValue="1-50">
                <SelectTrigger className="mt-1 w-60 rounded-none cursor-pointer">
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
                <SelectTrigger className="mt-1 w-60 rounded-none cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-dark text-sm font-medium">
                Date Founded
              </Label>
              <Select defaultValue="31">
                <SelectTrigger className="mt-1 rounded-none cursor-pointer">
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
                <SelectTrigger className="mt-1 rounded-none cursor-pointer">
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
                <SelectTrigger className="mt-1 rounded-none cursor-pointer">
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

          <CommonSelector
            label="Tech Stack"
            placeholder="Add new technology"
            initialItems={["HTML 5", "CSS 3", "Javascript"]}
            onItemsChange={(items) => console.log("Tech stack updated:", items)}
          />
        </div>
      </div>
      <div className="border-b w-full pb-4"></div>

      {/* About Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div>
          <h3 className="text-base font-medium text-dark mb-2">
            About Company
          </h3>
          <p className="text-light text-sm mb-4 max-w-xs">
            Brief description for your company. URLs are hyperlinked.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-dark text-sm font-medium">Description</Label>
          <div className="flex flex-col w-full gap-2">
            <div className="border overflow-hidden w-full">
              <Textarea
                placeholder="Enter company description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-50 border-0 focus-visible:ring-0"
              />
            </div>
            <div className="flex justify-between items-center p-2 text-xs text-light">
              <span>Maximum 500 characters</span>
              <span>{description.length} / 500</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end max-w-5xl">
        <Button className="bg-primary text-white hover:bg-primary/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
