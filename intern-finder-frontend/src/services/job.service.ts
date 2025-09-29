import api from "@/lib/axios";
import { JobFilters, JobListing, JobPosting, JobPostingResponse } from "@/types/job";

export const getJobListings = async (filters: JobFilters): Promise<JobListing[]> => {
  const res = await api.get("/job", { params: filters });
  return res.data.data;
};

export const postJob = async (companyId: string, jobData: JobPosting): Promise<JobPostingResponse> => {
  const res = await api.post(`/job/${companyId}/create`, jobData);
  return res.data.data;
}
