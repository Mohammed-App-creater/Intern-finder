"use client";

import { useEffect, useRef, useState } from "react";
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
import { useUploadProfilePicture } from "@/hooks/useFileUpload";
import { useQueryClient } from "@tanstack/react-query";

export default function MyProfileTab() {
  const user = useAuthStore().user;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  type FormDataType = {
    talentId: string;
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: string | Date;
    gender: string;
    profileImageUrl: string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    talentId: "",
    fullName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    profileImageUrl: "",
  });

  useEffect(() => {
    if (user?.role === "TALENT") {
      setFormData({
        talentId: user.id ?? "",
        fullName: user.fullName ?? "",
        phone: user.phoneNumber ?? "",
        email: user.email ?? "",
        dateOfBirth:
          user.birthday instanceof Date
            ? user.birthday.toISOString().slice(0, 10)
            : user.birthday ?? "",
        gender: user.gender ?? "",
        profileImageUrl: user.profileImageUrl ?? "",
      });
    }
  }, [user]);

  const { mutate: uploadProfilePicture } = useUploadProfilePicture();

  const handleProfilePictureUpload = (file: File) => {
    setIsLoading(true);
    if (file) {
      uploadProfilePicture(file, {
        onSuccess: (data) => {
          localStorage.setItem("profileImageUrl", data.url);
          setFormData((prev) => ({
            ...prev,
            profileImageUrl: data.url,
          }));
          setIsLoading(false);
        },
        onError: (error) => {
          setIsLoading(false);
          console.error("Upload failed:", error);
        },
      });
    }
  };

  const updateBasicInfo = useUpdateBasicInfo();

  const handleUpdate = () => {
    setIsLoading(true);
    console.log("The form data: ",formData, new Date(formData.dateOfBirth))
    updateBasicInfo.mutate(
      {
        talentId: formData.talentId,
        basicInfo: {
          fullName: formData.fullName,
          phoneNumber: formData.phone,
          email: formData.email,
          dateOfBirth: new Date(formData.dateOfBirth),
          gender: formData.gender as "male" | "female",
          profileImageUrl: formData.profileImageUrl,
        },
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          console.log("Updated successfully ✅");
          queryClient.invalidateQueries({ queryKey: ["me"] });
        },
        onError: (err) => {
          setIsLoading(false);
          console.error("Failed to update ❌", err);
        },
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    handleProfilePictureUpload(file!);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleProfilePictureUpload(file!);
  };

  if (isLoading || !user) {
    <div>Loading...</div>;
  }
 console.log(user)
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
              src={formData.profileImageUrl ?? ""}
              alt="Profile Picture"
            />
            <AvatarFallback className="text-lg">
              {formData.fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div
            className={`border-2 border-dashed rounded-lg p-8 flex-1 max-w-md cursor-pointer transition
        ${dragOver ? "border-primary bg-[#021103]" : "border-primary"}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/gif, image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
            />

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
                  value={
                    typeof formData.dateOfBirth === "string"
                      ? formData.dateOfBirth
                      : formData.dateOfBirth instanceof Date
                      ? formData.dateOfBirth.toISOString().slice(0, 10)
                      : ""
                  }
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
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end max-w-7xl">
        <Button
          onClick={handleUpdate}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-white px-8"
        >
          {isLoading ? "Updating.." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
