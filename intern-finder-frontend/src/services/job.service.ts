import api from "@/lib/axios";
import {
  JobFilters,
  JobListing,
  JobPosting,
  JobPostingResponse,
  JobDetailResponse,
  ApplyToJobPayload,
  ApplyToJobResponse
} from "@/types/job";

export const getJobListings = async (
  filters: JobFilters
): Promise<JobListing[]> => {
  const res = await api.get("/job", { params: filters });
  return res.data.data;
};

export const getJobDetail = async (
  jobId: string
): Promise<JobDetailResponse["data"]> => {
  const res = await api.get(`/job/${jobId}`);
  return res.data.data;
};

export const postJob = async (
  companyId: string,
  jobData: JobPosting
): Promise<JobPostingResponse> => {
  const res = await api.post(`/job/${companyId}/create`, jobData);
  return res.data.data;
};

export const ApplyToJob = async ( data: ApplyToJobPayload ): Promise<ApplyToJobResponse> => {
  const res = await api.post(`/job/${data.jobId}/apply`, data);
  return res.data.data;
};
