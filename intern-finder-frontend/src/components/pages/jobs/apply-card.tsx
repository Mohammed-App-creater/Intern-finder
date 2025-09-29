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
      <div className="flex flex-col rounded-lg p-6 shadow-md">
        <div className="flex justify-between pb-2">
          <span className="text-sm text-primary font-medium bg-secondary p-1 rounded-[8px] w-fit h-fit">
            {job.createdAt && changeDateToTimeAgo(job.createdAt)}
          </span>
          <button className="cursor-pointer">
            <Bookmark className="w-6 h-6 text-light" />
          </button>
        </div>
        <div className="flex items-start gap-4 flex-1">
          <Image
            src={job?.company?.logoUrl || "placeholder"}
            alt="Company Logo"
            width={60}
            height={60}
            placeholder="empty"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-dark mb-1">
              {job.title}
            </h3>
            <p className="text-dark font-light mb-4">
              {job.company.companyName}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 text-sm text-light">
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4 primary" />
              <span>{job.title}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 primary" />
              <span>{job.environmentType}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 primary" />
              <span>
                {job.minSalary} - {job.maxSalary}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 primary" />
              <span>{job.location}</span>
            </div>
          </div>
          <Button
            className="bg-primary hover:bg-teal-600  text-white cursor-pointer"
            onClick={() => setIsApplicationOpen(true)}
          >
            Apply
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
