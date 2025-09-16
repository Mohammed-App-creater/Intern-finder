"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import JobIcon from "@/components/icons/doc_icon.png";
import InterviewIcon from "@/components/icons/interview_icon.png";
import { useTalentDashboardTotalInterviews, useTalentDashboardTotalJobsApplied } from "@/hooks/useTalentDashboard";
import { useAuthStore } from "@/store/auth";

export function StatusCards() {
  const user = useAuthStore().user;
  const { data: TotalJob, isLoading: JobIsLoading, isError: JobLoading } = useTalentDashboardTotalJobsApplied(user?.id ?? "");
  const { data, isLoading, isError } = useTalentDashboardTotalInterviews(user?.id ?? "");
  if (!user?.id) return null;

  if (isLoading || JobIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError || JobLoading) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="space-y-6">
      {/* Total Jobs Applied */}
      <Card>
        <CardContent className="relative py-3 px-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-dark mb-1">
                Total Jobs Applied
              </p>
              <p className="text-5xl font-bold text-dark">{TotalJob?.totalJobsApplied}</p>
            </div>
            <Image
              src={JobIcon}
              alt={"Document Icon"}
              width={100}
              height={100}
              className="absolute top-16 right-15 w-40 h-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Interviewed */}
      <Card>
        <CardContent className="relative py-3 px-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-dark mb-1">Interviewed</p>
              <p className="text-5xl font-bold text-dark">{data?.totalJobsApplied}</p>
            </div>
            <Image
              src={InterviewIcon}
              alt={"Document Icon"}
              width={100}
              height={100}
              className="absolute top-16 right-15 w-40 h-20"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
