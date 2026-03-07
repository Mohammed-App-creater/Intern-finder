import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JobListing } from "@/types/job";
import { changeDateToTimeAgo } from "@/lib/utils";
import Link from "next/link";

export default function ApplyCard({ job }: { job: JobListing }) {
  return (
    <div className="flex flex-col rounded-lg p-4 sm:p-5 md:p-6 shadow-md border border-gray-100 hover:border-gray-200 transition-colors bg-white">
      <div className="flex justify-between pb-2 sm:pb-3">
        <span className="text-xs sm:text-sm text-primary font-medium bg-secondary p-1 sm:p-2 rounded-[8px] w-fit h-fit">
          {job.createdAt && changeDateToTimeAgo(job.createdAt)}
        </span>
        <button className="cursor-pointer hover:bg-gray-50 rounded p-1 transition-colors">
          <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-light hover:text-primary" />
        </button>
      </div>

      <div className="flex items-start gap-3 sm:gap-4 flex-1 mb-3 sm:mb-4">
        <div className="flex-shrink-0">
          <Image
            src={job.company.logoUrl || "/images/Logo_1.png"}
            alt="Company Logo"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg object-contain border border-gray-200"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-dark mb-1 line-clamp-2">
            {job.title}
          </h3>
          <p className="text-dark font-light text-sm sm:text-base mb-2 line-clamp-1">
            {job.company.companyName}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-light flex-1">
          <div className="flex items-center gap-1">
            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="line-clamp-1">{job.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="line-clamp-1">{job.environmentType}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="line-clamp-1">
              {job.minSalary} - {job.maxSalary}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="line-clamp-1">{job.location}</span>
          </div>
        </div>
        <Link href={`/jobs/${job.id}`} className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-primary hover:bg-teal-600 text-white cursor-pointer text-sm sm:text-base px-4 py-2 h-auto">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
