"use client";

import JobCard from "@/components/common/job-card";
import Link from "next/link";
import { useJobListings } from "@/hooks/useJob";
import { JobListing } from "@/types/job";

export default function RecentJobs() {
  const { data, isLoading, isError } = useJobListings({ datePosted: "today" });

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  const jobs: JobListing[] = data || [];

  if (isError) {
    return (
      <div className="flex justify-center py-8 text-red-600">
        Error loading job listings
      </div>
    );
  }

  return (
    <section className="flex flex-col max-w-7xl py-12 sm:py-16 md:py-20 w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 sm:pb-8 md:pb-10 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight">
          Recent Jobs Available
        </h2>
        <Link
          href="/jobs"
          className="text-primary font-bold hover:text-teal-600 p-0 text-lg"
        >
          View all
        </Link>
      </div>

      {/* Job Cards */}
      <div className="space-y-3 sm:space-y-4">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </section>
  );
}
