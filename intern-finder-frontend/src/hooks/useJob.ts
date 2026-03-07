"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getJobListings, postJob, getJobDetail, ApplyToJob } from "@/services/job.service";
import { ApplyToJobPayload, JobFilters, JobPosting } from "@/types/job";
import { getMyAppliedJobs } from "@/services/talent.service";

export const useJobListings = (filters: JobFilters) => {
  return useQuery({
    queryKey: ["job", "listings", filters],
    queryFn: () => getJobListings(filters),
  });
};

export const useJobDetail = (jobId: string) => {
  return useQuery({
    queryKey: ["job", "detail", jobId],
    queryFn: () => getJobDetail(jobId),
    enabled: !!jobId,
  });
};

export const useRelatedJobs = () => {
  return useQuery({
    queryKey: ["job", "related"],
    queryFn: () => getJobListings({}),
  });
};

export const usePostJob = () => {
  return useMutation({
    mutationKey: ["job", "post"],
    mutationFn: (variables: { companyId: string; jobData: JobPosting }) =>
      postJob(variables.companyId, variables.jobData),
  });
};

// Talent - Job
export const useMyAppliedJobs = (talentId: string) => {
  return useQuery({
    queryKey: ["talent", talentId, "applied-jobs"],
    queryFn: () => getMyAppliedJobs(talentId),
  });
};

export const useApplyToJob = () => {
  return useMutation({
    mutationKey: ["job", "apply"],
    mutationFn: (data: ApplyToJobPayload) =>
      ApplyToJob(data),
  });
};