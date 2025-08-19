"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function FinishingStepsForm() {
  const [formData, setFormData] = useState({
    linkedin: "",
    website: "",
    bio: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("File uploaded:", file.name)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 bg-white p-8 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="text-gray-600 font-medium">Intern Finder</span>
        </div>

        {/* Form Content */}
        <div className="flex-1 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">{"Let's go to the finishing steps"}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="www.linkedin.com/..."
                value={formData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Personal Website */}
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                Personal Website
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="www.myportfolio.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full h-24 resize-none"
              />
            </div>

            {/* CV Upload */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center bg-gray-50">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <Button
                    type="button"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg mb-3"
                    onClick={() => document.getElementById("cv-upload")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your CV
                  </Button>
                  <div className="text-gray-600">
                    <p className="text-sm">or drop it here</p>
                    <p className="text-xs text-gray-400 mt-1">post PDF, DOC or txt</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium mt-8"
            >
              Done!
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Message */}
      <div className="flex-1 bg-teal-600 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white leading-tight">
            One more step for
            <br />
            the Masterpiece
            <br />
            profile
          </h2>
        </div>
      </div>
    </div>
  )
}