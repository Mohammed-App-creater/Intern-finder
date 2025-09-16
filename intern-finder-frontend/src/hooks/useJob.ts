import { useQuery } from "@tanstack/react-query";
import { getJobListings } from "@/services/job.service";
import { JobFilters } from "@/types/job";


export const useJobListings = (filters: JobFilters) => {
  return useQuery({
    queryKey: ["job", "listings", filters],
    queryFn: () => getJobListings(filters),
  });
};