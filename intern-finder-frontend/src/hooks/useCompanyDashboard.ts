'use client';

import { useQuery } from "@tanstack/react-query";
import {
  getCompanyDashboardStats,
  getCompanyWeeklyStats,
  getOpenJobsCount,
  getJobUpdates,
} from "@/services/companyDashboard.service";
import { useAuthStore } from "@/store/auth";

export const useCompanyDashboardStats = () => {
  const user = useAuthStore().user;

  return useQuery({
    queryKey: ["companyDashboard", "stats", user?.id],
    queryFn: () => getCompanyDashboardStats(user?.id ?? ""),
    enabled: !!user?.id,
  });
};

export const useCompanyWeeklyStats = (days: number = 7) => {
  const user = useAuthStore().user;

  return useQuery({
    queryKey: ["companyDashboard", "weeklyStats", user?.id, days],
    queryFn: () => getCompanyWeeklyStats(user?.id ?? "", days),
    enabled: !!user?.id,
  });
};

export const useOpenJobsCount = () => {
  const user = useAuthStore().user;

  return useQuery({
    queryKey: ["companyDashboard", "openJobs", user?.id],
    queryFn: () => getOpenJobsCount(user?.id ?? ""),
    enabled: !!user?.id,
  });
};

export const useJobUpdates = () => {
  const user = useAuthStore().user;

  return useQuery({
    queryKey: ["companyDashboard", "jobUpdates", user?.id],
    queryFn: () => getJobUpdates(user?.id ?? ""),
    enabled: !!user?.id,
  });
};
