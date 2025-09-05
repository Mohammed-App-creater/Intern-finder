"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Info } from "lucide-react";

export default function LoginDetailsTab() {
  const [emailData, setEmailData] = useState({
    currentEmail: "jakegyll@gmail.com",
    newEmail: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  return (
    <div className="space-y-8">
      <div className="border-b mb-10 pb-10">
        <h2 className="text-lg font-semibold text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm">
          This is login information that you can update anytime.
        </p>
      </div>
      <div className=" mb-10 border-b pb-10">
        <div className="flex justify-between max-w-4xl">
          <div>
            <h3 className="text-base font-medium text-dark mb-2">
              Update Email
            </h3>
            <p className="text-light text-sm mb-6 max-w-60">
              Update your email address to make sure it is safe
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 py-3">
              <span className="text-dark text-sm">
                {emailData.currentEmail}
              </span>
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <p className="text-light text-sm">
              Your email address is verified.
            </p>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="newEmail"
                  className="text-dark text-sm font-medium"
                >
                  Update Email
                </Label>
                <Input
                  id="newEmail"
                  type="email"
                  placeholder="Enter your new email"
                  value={emailData.newEmail}
                  onChange={(e) =>
                    setEmailData({ ...emailData, newEmail: e.target.value })
                  }
                  className="mt-1 min-w-100"
                />
              </div>

              <Button className="bg-primary hover:bg-primary/90 text-white">
                Update Email
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between max-w-4xl">
        <div>
          <h3 className="text-base font-medium text-dark mb-2">New Password</h3>
          <p className="text-light text-sm mb-6 max-w-60">
            Manage your password to make sure it is safe
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Label
              htmlFor="oldPassword"
              className="text-dark text-sm font-medium"
            >
              Old Password
            </Label>
            <Input
              id="oldPassword"
              type="password"
              placeholder="Enter your old password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e.target.value,
                })
              }
              className="mt-1 min-w-100"
            />
            <p className="text-light text-xs mt-1">Minimum 8 characters</p>
          </div>

          <div>
            <Label
              htmlFor="newPassword"
              className="text-dark text-sm font-medium"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              className="mt-1"
            />
            <p className="text-light text-xs mt-1">Minimum 8 characters</p>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-white w-fit">
            Change Password
          </Button>
        </div>
      </div>
      <div className="pt-5 border-t">
        <div className="max-w-6xl flex justify-end items-center gap-3">
          <Button
            variant="none"
          >
            <h4 className="text-red-500 font-medium">Close Account</h4>
            <Info className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
