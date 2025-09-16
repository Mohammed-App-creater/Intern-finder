"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { MoreHorizontal, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useTalentDashboardRecentApplications } from "@/hooks/useTalentDashboard";


export function RecentApplications() {
  const user = useAuthStore().user
  const talentId = user?.id ?? ""
  const { data, isLoading, isError } = useTalentDashboardRecentApplications(talentId);
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error loading applications.</div>;
  }
  const applications = data?.recentApplications
    ? data.recentApplications.length > 3
      ? data.recentApplications.slice(0, 3)
      : data.recentApplications
    : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dark">
          Recent Applications History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {applications?.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 rounded-sm">
                  <AvatarImage src={app.companyLogo} alt="Profile Picture" />
                  <AvatarFallback
                    className={`bg-green-500 text-white font-semibold`}
                  >
                    {app?.companyName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-dark">{app.jobTitle}</h3>
                  <p className="text-sm text-light">
                    {app.companyName} • {app.location} • {app.salaryType}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-dark">Date Applied</p>
                <p className="text-sm font-medium text-light">
                  {app.appliedAt
                    ? new Date(app.appliedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
              <StatusBadge status={app.status} />
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-6 text-center">
          <Button variant="link" className="text-primary text-xl">
            View all applications history
          </Button>
          <ArrowRight className="text-primary"/>
        </div>
      </CardContent>
    </Card>
  );
}
