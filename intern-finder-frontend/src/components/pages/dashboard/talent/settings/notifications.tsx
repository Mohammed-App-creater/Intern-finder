"use client";

import { Label } from "@/components/ui/label";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    applications: true,
    jobs: false,
    recommendations: false,
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm">
          This is notification preferences that you can update anytime.
        </p>
      </div>

      <div>
        <h3 className="text-base font-medium text-dark mb-6">Notifications</h3>
        <p className="text-light text-sm mb-6">
          Customize your preferred notification settings
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="applications"
              checked={notifications.applications}
              onCheckedChange={(checked) =>
                setNotifications({
                  ...notifications,
                  applications: checked as boolean,
                })
              }
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div className="flex-1">
              <Label
                htmlFor="applications"
                className="text-dark font-medium cursor-pointer"
              >
                Applications
              </Label>
              <p className="text-light text-sm mt-1">
                These are notifications for jobs that you have applied to
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="jobs"
              checked={notifications.jobs}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, jobs: checked as boolean })
              }
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div className="flex-1">
              <Label
                htmlFor="jobs"
                className="text-dark font-medium cursor-pointer"
              >
                Jobs
              </Label>
              <p className="text-light text-sm mt-1">
                These are notifications for job openings that suit your profile
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="recommendations"
              checked={notifications.recommendations}
              onCheckedChange={(checked) =>
                setNotifications({
                  ...notifications,
                  recommendations: checked as boolean,
                })
              }
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div className="flex-1">
              <Label
                htmlFor="recommendations"
                className="text-dark font-medium cursor-pointer"
              >
                Recommendations
              </Label>
              <p className="text-light text-sm mt-1">
                These are notifications for personalized recommendations from
                our recruiters
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <Button className="bg-primary hover:bg-primary/90 text-white px-8">
          Update Email
        </Button>
      </div>
    </div>
  );
}
