import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import Link from "next/link";

interface JobRowProps {
  job: {
    id: number;
    role: string;
    status: "Live" | "Closed";
    datePosted: string;
    dueDate: string;
    jobType: "Freelance" | "Fulltime";
    applicants: number;
    needs: number;
    totalNeeds: number;
  };
}

export function JobRow({ job }: JobRowProps) {
  return (
    <div className="grid grid-cols-8 gap-4 p-6 items-center transition-colors">
      <div className="col-span-2">
        <Link
          href={`joblisting/${job.id}`}
          className="text-dark font-medium cursor-pointer transition-colors"
        >
          {job.role}
        </Link>
      </div>

      <div>
        <StatusBadge status={job.status} />
      </div>

      <div>
        <span className="text-light text-sm">{job.datePosted}</span>
      </div>

      <div>
        <span className="text-light text-sm">{job.dueDate}</span>
      </div>

      <div>
        <StatusBadge status={job.jobType} />
      </div>

      <div>
        <span className="text-dark font-medium">
          {job.applicants.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-dark font-medium">
          {job.needs}
          <span className="text-light">/{job.totalNeeds}</span>
        </span>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
