'use client';

import JobCard from "@/components/common/job-card";
import Link from "next/link";
import { useJobListings } from "@/hooks/useJob";
import { JobListing } from "@/types/job";

export default function RecentJobs() {
  const { data, isLoading, isError } = useJobListings({datePosted: "today"});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const jobs: JobListing[] = data || [];

  if (isError) {
    return <div>Error loading job listings</div>;
  }

  return (
    <section className="flex flex-col max-w-7xl py-20 w-full">
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-5xl font-bold text-dark">Recent Jobs Available</h2>
        <Link
          href="/jobs"
          className="text-primary font-bold hover:text-teal-600 p-0"
        >
          View all
        </Link>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </section>
  );
}