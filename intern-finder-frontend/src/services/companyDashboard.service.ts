import api from "@/lib/axios";
import {
  CompanyDashboardStats,
  CompanyWeeklyStats,
  OpenJobsCount,
  JobUpdate,
} from "@/types/company";

export const getCompanyDashboardStats = async (
  companyId: string
): Promise<CompanyDashboardStats> => {
  const response = await api.get(`/company/dashboard/${companyId}/top-status`);
  return response.data.data;
};

export const getCompanyWeeklyStats = async (
  companyId: string,
  days: number = 7
): Promise<CompanyWeeklyStats> => {
  const response = await api.get(
    `/company/dashboard/${companyId}/weekly-status?day=${days}`
  );
  return response.data.data;
};

export const getOpenJobsCount = async (companyId: string): Promise<OpenJobsCount> => {
  const response = await api.get(`/company/dashboard/${companyId}/open-jobs`);
  return response.data.data;
};

export const getJobUpdates = async (
  companyId: string
): Promise<JobUpdate[]> => {
  const response = await api.get(`/company/dashboard/${companyId}/job-updates`);
  return response.data.data;
};
