'use client';

import JobCard from "@/components/common/job-card";
import Link from "next/link";
import { useJobListings } from "@/hooks/useJob";
import { JobListing } from "@/types/job";

export default function RecentJobs() {
  // const jobsData = [
  //   {
  //     timeAgo: "10 min ago",
  //     title: "Forward Security Director",
  //     company: "Reach, Schrage and Schmitt Co",
  //     logo: "/images/Logo_1.png",
  //     industry: "Hotels & Tourism",
  //     employmentType: "Full time",
  //     salary: "$40000-$45000",
  //     location: "New York, USA"
  //   },
  //   {
  //     timeAgo: "25 min ago",
  //     title: "Senior Frontend Developer",
  //     company: "Tech Innovations Inc",
  //     logo: "/images/Logo_2.png",
  //     industry: "Software Development",
  //     employmentType: "Full time",
  //     salary: "$75000-$90000",
  //     location: "San Francisco, USA"
  //   },
  //   {
  //     timeAgo: "1 hour ago",
  //     title: "Marketing Manager",
  //     company: "Global Marketing Solutions",
  //     logo: "/images/Logo_3.png",
  //     industry: "Marketing & Advertising",
  //     employmentType: "Full time",
  //     salary: "$60000-$70000",
  //     location: "Chicago, USA"
  //   },
  //   {
  //     timeAgo: "2 hours ago",
  //     title: "Data Analyst",
  //     company: "Data Insights Ltd",
  //     logo: "/images/Logo_4.png",
  //     industry: "Data Science",
  //     employmentType: "Part time",
  //     salary: "$45000-$55000",
  //     location: "Austin, USA"
  //   },
  //   {
  //     timeAgo: "3 hours ago",
  //     title: "UX/UI Designer",
  //     company: "Creative Design Studio",
  //     logo: "/images/Logo_5.png",
  //     industry: "Design",
  //     employmentType: "Contract",
  //     salary: "$50000-$65000",
  //     location: "Los Angeles, USA"
  //   }
  // ];

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
          href="#"
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