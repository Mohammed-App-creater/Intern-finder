import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image"

interface JobCardProps {
  job: {
    timeAgo: string;
    title: string;
    company: string;
    logo: string;
    industry: string;
    employmentType: string;
    salary: string;
    location: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex flex-col rounded-lg p-6 shadow-md">
      <div className="flex justify-between pb-2">
        <span className="text-sm text-primary font-medium bg-secondary p-1 rounded-[4px] w-fit h-fit">
          {job.timeAgo}
        </span>
        <button className="cursor-pointer">
          <Bookmark className="w-6 h-6 text-light" />
        </button>
      </div>
      <div className="flex items-start gap-4 flex-1">
        <Image
          src={job.logo}
          alt="Company Logo"
          width={40}
          height={40}
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-dark mb-1">
            {job.title}
          </h3>
          <p className="text-dark font-light mb-4">{job.company}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4 text-sm text-light">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4 primary" />
            <span>{job.industry}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 primary" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 primary" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 primary" />
            <span>{job.location}</span>
          </div>
        </div>
        <Button className="bg-primary hover:bg-teal-600  text-white cursor-pointer">
          Job Details
        </Button>
      </div>
    </div>
  );
}