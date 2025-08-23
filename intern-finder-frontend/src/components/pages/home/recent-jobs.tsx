import JobCard from "@/components/common/job-card";
import Link from "next/link";

export default function RecentJobs() {
  return (
    <section className="flex flex-col max-w-7xl py-20 w-full">
      <div className="flex items-center justify-between pb-20">
        <h2 className="text-5xl font-bold text-[var(--textdark-)]">Recent Jobs Available</h2>
        <Link
          href="#"
          className="text-[var(--primary)] font-bold hover:text-teal-600 p-0"
        >
          View all
        </Link>
      </div>

      {/* Job Cards */}
      <div>
        <JobCard />
      </div>
    </section>
  );
}
