'use client';

import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import JobApplicationForm from "@/components/pages/jobs/job-apply-form";
import { useState } from "react";
import { JobListing } from "@/types/job";
import { changeDateToTimeAgo } from "@/lib/utils";


export default function JobCard({ job }: { job: JobListing }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg py-6 gap-2">
      <div className="flex justify-between pb-2">
        <span className="text-sm text-primary font-medium bg-secondary p-2 rounded-[8px] w-fit h-fit">
          {job.createdAt && changeDateToTimeAgo(job.createdAt)}
        </span>
        <button className="cursor-pointer">
          <Bookmark className="w-8 h-8 text-light" />
        </button>
      </div>
      <div className="flex items-start gap-4 flex-1">
        <Image src={job?.company?.logoUrl ?? ""} alt="Company Logo" width={60} height={60} />
        <div className="flex-1">
          <h3 className="text-3xl font-semibold text-dark mb-1">{job.title}</h3>
          <p className="text-xl text-dark font-light mb-4">{job?.company?.companyName ?? ""}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-6 text-lg text-light">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4 primary" />
            <span>{job.categories}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 primary" />
            <span>{job.environmentType}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 primary" />
            <span>{job.minSalary - job.maxSalary}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 primary" />
            <span>{job.location}</span>
          </div>
        </div>
        <Button
          onClick={() => setIsPopupOpen(true)}
          className="bg-primary hover:bg-teal-600  text-white text-md w-70 p-2"
        >
          Apply Job
        </Button>
        <JobApplicationForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          jobTitle="Forward Security Director"
          companyName="Reach, Schrage and Schmitt Co"
          logo="/images/Logo_1.png"
        />
      </div>
    </div>
  );
}
