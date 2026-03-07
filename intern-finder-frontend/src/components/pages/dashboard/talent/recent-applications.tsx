"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { MoreHorizontal, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useTalentDashboardRecentApplications } from "@/hooks/useTalentDashboard";

export function RecentApplications() {
  const user = useAuthStore().user;
  const talentId = user?.id ?? "";
  const { data, isLoading, isError } =
    useTalentDashboardRecentApplications(talentId);
  if (isLoading) {
    return <div>Loading...</div>;
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
          {applications && applications.length > 0 ? (
            applications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Avatar className="w-12 h-12 rounded-sm shrink-0">
                    <AvatarImage src={app.companyLogo} alt="Profile Picture" />
                    <AvatarFallback
                      className={`bg-green-500 text-white font-semibold`}
                    >
                      {app?.companyName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="font-medium text-dark truncate">{app.jobTitle}</h3>
                    <p className="text-sm text-light truncate">
                      {app.companyName} • {app.location} • {app.salaryType}
                    </p>
                  </div>
                </div>
                <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4 md:gap-8">
                  <div className="text-left md:text-right">
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
                  <div className="flex items-center gap-2">
                    <StatusBadge status={app.status} />
                    <Button variant="ghost" size="sm" className="shrink-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-bold text-lg py-8 text-light">
              No applications yet - time to start your search!
            </div>
          )}
        </div>
        <div className="flex items-center mt-6 text-center justify-center md:justify-start">
          <Button variant="link" className="text-primary md:text-xl text-md">
            View all applications history
          </Button>
          <ArrowRight className="text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}
