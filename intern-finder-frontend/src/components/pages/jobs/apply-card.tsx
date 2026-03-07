"use client";

import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JobListing } from "@/types/job";
import { changeDateToTimeAgo } from "@/lib/utils";
import { useState } from "react";
import JobApplicationPopup from "./job-apply-form";

export default function ApplyCard({ job }: { job: JobListing }) {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col rounded-lg p-4 sm:p-5 md:p-6 shadow-md border border-gray-100 bg-white">
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
              src={job?.company?.logoUrl || "/images/image_placeholder.jpg"}
              alt="Company Logo"
              width={60}
              height={60}
              className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg object-contain border border-gray-200"
              placeholder="empty"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-dark mb-1 line-clamp-2">
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

          <Button
            className="w-full sm:w-auto bg-primary hover:bg-teal-600 text-white cursor-pointer text-sm sm:text-base px-4 py-2 h-auto"
            onClick={() => setIsApplicationOpen(true)}
          >
            Apply Now
          </Button>
        </div>
      </div>

      <JobApplicationPopup
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        jobTitle={job.title}
        companyName={job.company.companyName}
        logo={job?.company?.logoUrl || "/images/image_placeholder.jpg"}
      />
    </>
  );
}
