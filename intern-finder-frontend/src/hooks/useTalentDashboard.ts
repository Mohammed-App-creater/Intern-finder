import { useQuery } from "@tanstack/react-query";
import { getTalentDashboardTotalJobsApplied,  getTalentDashboardJobStatus, getTalentDashboardRecentApplications, getTalentDashboardStatus, getTalentDashboardUpcomingInterviews } from "@/services/talent.service";

export const useTalentDashboardTotalJobsApplied = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", "Dashboard", "TotalJobsApplied", talentId],
    queryFn: () => getTalentDashboardTotalJobsApplied(talentId),
  });
};

export const useTalentDashboardStatus = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", "Dashboard", "Status", talentId],
    queryFn: () => getTalentDashboardStatus(talentId),
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

