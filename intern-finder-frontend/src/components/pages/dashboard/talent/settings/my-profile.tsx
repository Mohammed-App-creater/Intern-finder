"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Calendar } from "lucide-react";
import { useUpdateBasicInfo } from "@/hooks/useTalentSettings";
import { useAuthStore } from "@/store/auth";

export default function MyProfileTab() {
  const [formData, setFormData] = useState({
    fullName: "Jake Gyll",
    phone: "+44 1245 572 135",
    email: "jakegyll@gmail.com",
    dateOfBirth: "09/08/1997",
    gender: "Male",
  });

  const user = useAuthStore().user
  const handlUpdate = () => {
    return;
  }

  const { fullName, profileImageUrl, email, phoneNumber, gender,   } = user?.role == "TALENT" ? user : {};

  return (
    <div className="flex flex-col gap-2 space-y-8">
      <div className="border-b mb-10 pb-10">
        <h2 className="text-lg font-semibold text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm">
          This is your personal information that you can update anytime.
        </p>
      </div>

      <div>
        <div className="flex gap-15 mb-10 border-b pb-10">
          <div>
            <h3 className="text-base font-medium text-dark mb-2">
              Profile Photo
            </h3>
            <p className="text-light text-sm mb-4 max-w-xs">
              This image will be shown publicly as your profile picture, it will
              help recruiters recognize you!
            </p>
          </div>

          <Avatar className="w-35 h-35">
            <AvatarImage
              src={profileImageUrl ?? ""}
              alt="Profile Picture"
            />
            <AvatarFallback className="text-lg">{fullName?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="border-2 border-dashed border-primary rounded-lg p-8 flex-1 max-w-md">
            <div className="text-center">
              <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-primary text-sm font-medium mb-1">
                Click to replace or drag and drop
              </p>
              <p className="text-light text-xs">
                SVG, PNG, JPG or GIF (max. 400 x 400px)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between max-w-5xl">
          <div>
            <h3 className="text-base font-medium text-dark mb-6">
              Personal Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label
                htmlFor="fullName"
                className="text-dark text-sm font-medium"
              >
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-dark text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-dark text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label
                htmlFor="dateOfBirth"
                className="text-dark text-sm font-medium"
              >
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Input
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <Label htmlFor="gender" className="text-dark text-sm font-medium">
                Gender <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end max-w-7xl">
        <Button className="bg-primary hover:bg-primary/90 text-white px-8">
          Save Profile
        </Button>
      </div>
    </div>
  );
}
