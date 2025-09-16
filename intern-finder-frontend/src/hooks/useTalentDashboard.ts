import { useQuery } from "@tanstack/react-query";
import { getTalentDashboardTotalJobsApplied, getTalentDashboardTotalInterviews,  getTalentDashboardJobStatus, getTalentDashboardRecentApplications, getTalentDashboardUpcomingInterviews } from "@/services/talent.service";

export const useTalentDashboardTotalJobsApplied = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", "Dashboard", "TotalJobsApplied", talentId],
    queryFn: () => getTalentDashboardTotalJobsApplied(talentId),
  });
};

export const useTalentDashboardTotalInterviews = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", "Dashboard", "TotalInterviews", talentId],
    queryFn: () => getTalentDashboardTotalInterviews(talentId),
  });
};

export const useTalentDashboardStatus = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", "Dashboard", "Status", talentId],
    queryFn: () => getTalentDashboardJobStatus(talentId),
  });
};

export const useTalentDashboardJobStatus = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", "Dashboard", "JobStatus", talentId],
    queryFn: () => getTalentDashboardJobStatus(talentId),
  });
};

export const useTalentDashboardUpcomingInterviews = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", "Dashboard", "UpcomingInterviews", talentId],
    queryFn: () => getTalentDashboardUpcomingInterviews(talentId),
  });
};

export const useTalentDashboardRecentApplications = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", "Dashboard", "RecentApplications", talentId],
    queryFn: () => getTalentDashboardRecentApplications(talentId),
  });
};

