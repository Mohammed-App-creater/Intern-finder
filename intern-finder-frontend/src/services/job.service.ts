import api from "@/lib/axios";
import { JobFilters, JobListing } from "@/types/job";

export const getJobListings = async (filters: JobFilters): Promise<JobListing[]> => {
  const res = await api.get("/job", { params: filters });
  return res.data.data;
};
