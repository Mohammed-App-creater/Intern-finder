"use client";

import { Label } from "@/components/ui/label";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateNotification } from "@/hooks/useTalentSettings";
import { useAuthStore } from "@/store/auth";
import { Loader2 } from "lucide-react";

export default function NotificationsTab() {
  const user = useAuthStore().user;
  const talentId = user?.role === "TALENT" ? user.id : "";
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    application: user?.role === "TALENT" ? false : true,
    job: false,
    recommendation: false,
    alert: false,
  });

  const update = useUpdateNotification();

  const handleUpdate = () => {
    setIsLoading(true);
    update.mutate(
      { talentId: talentId ?? "", notification: notifications },
      {
        onSuccess: () => {
          setIsLoading(false);
          console.log("Update Successful");
        },
        onError: () => {
          setIsLoading(false);
          console.log("Update failed");
        },
      }
    );
  };

  return (
    <div className="space-y-8">
      <div className="border-b mb-10 pb-10">
        <h2 className="text-lg font-semibold text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm">
          This is notification preferences that you can update anytime.
        </p>
      </div>

      <div className="flex justify-between max-w-4xl">
        <div>
          <h3 className="text-base font-medium text-dark mb-6">
            Notifications
          </h3>
          <p className="max-w-50 text-light text-sm mb-6">
            Customize your preferred notification settings
          </p>
        </div>

        <div className="space-y-6 max-w-sm">
          <div className="flex items-start gap-3">
            <Checkbox
              id="applications"
              checked={notifications.application}
              onCheckedChange={(checked) =>
                setNotifications({
                  ...notifications,
                  application: checked as boolean,
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
              checked={notifications.job}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, job: checked as boolean })
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
              checked={notifications.recommendation}
              onCheckedChange={(checked) =>
                setNotifications({
                  ...notifications,
                  recommendation: checked as boolean,
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

          <div className="flex items-start gap-3">
            <Checkbox
              id="recommendations"
              checked={notifications.alert}
              onCheckedChange={(checked) =>
                setNotifications({
                  ...notifications,
                  alert: checked as boolean,
                })
              }
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div className="flex-1">
              <Label
                htmlFor="recommendations"
                className="text-dark font-medium cursor-pointer"
              >
                Alert
              </Label>
              <p className="text-light text-sm mt-1">
                These are notifications for the system  
                alerting you about important updates
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              onClick={handleUpdate}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Update Notification...
              </>
            ) : (
              "Save Profile"
            )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
