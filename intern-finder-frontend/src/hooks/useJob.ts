import { useQuery } from "@tanstack/react-query";
import { getJobListings } from "@/services/job.service";
import { JobFilters } from "@/types/job";


export const useJobListings = (filters: JobFilters) => {
  return useQuery({
    queryKey: ["job", "listings", filters],
    queryFn: () => getJobListings(filters),
  });
};

export const useRelatedJobs = () => {
  return useQuery({
    queryKey: ["job", "related"],
    queryFn: () => getJobListings({}), // Adjust parameters as needed
  });
}