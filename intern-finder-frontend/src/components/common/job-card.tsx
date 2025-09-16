import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import { JobListing } from "@/types/job";



export default function ApplyCard({ job }: { job: JobListing }) {

  const changeDateToTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  return (
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
          src={job.company.logoUrl || "/images/Logo_1.png"}
          alt="Company Logo"
          width={40}
          height={40}
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-dark mb-1">
            {job.title}
          </h3>
          <p className="text-dark font-light mb-4">{job.company.companyName}</p>
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
            <span>{job.minSalary} - {job.maxSalary}</span>
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