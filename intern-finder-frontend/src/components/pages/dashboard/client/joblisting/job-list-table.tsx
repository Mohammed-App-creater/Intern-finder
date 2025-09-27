import { JobListHeader } from "./job-list-header";
import { JobListPagination } from "./job-list-pagination";
import { JobRow } from "./job-row";

const jobData = [
  {
    id: 1,
    role: "Social Media Assistant",
    status: "Live" as const,
    datePosted: "20 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime" as const,
    applicants: 19,
    needs: 4,
    totalNeeds: 11,
  },
  {
    id: 2,
    role: "Senior Designer",
    status: "Live" as const,
    datePosted: "16 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime" as const,
    applicants: 1234,
    needs: 0,
    totalNeeds: 20,
  },
  {
    id: 3,
    role: "Visual Designer",
    status: "Live" as const,
    datePosted: "15 May 2020",
    dueDate: "24 May 2020",
    jobType: "Freelance" as const,
    applicants: 2435,
    needs: 1,
    totalNeeds: 5,
  },
  {
    id: 4,
    role: "Data Science",
    status: "Closed" as const,
    datePosted: "13 May 2020",
    dueDate: "24 May 2020",
    jobType: "Freelance" as const,
    applicants: 6234,
    needs: 10,
    totalNeeds: 10,
  },
  {
    id: 5,
    role: "Kotlin Developer",
    status: "Closed" as const,
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime" as const,
    applicants: 12,
    needs: 20,
    totalNeeds: 20,
  },
  {
    id: 6,
    role: "React Developer",
    status: "Closed" as const,
    datePosted: "11 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime" as const,
    applicants: 14,
    needs: 10,
    totalNeeds: 10,
  },
  {
    id: 7,
    role: "Kotlin Developer",
    status: "Closed" as const,
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime" as const,
    applicants: 12,
    needs: 20,
    totalNeeds: 20,
  },
];

export function JobListTable() {
  return (
    <div className="bg-white rounded-lg border">
      <JobListHeader />
      <div className="grid grid-cols-[2.1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b text-sm font-medium text-light">
        <div>Roles</div>
        <div>Status</div>
        <div>Date Posted</div>
        <div>Due Date</div>
        <div>Job Type</div>
        <div>Applicants</div>
        <div>Needs</div>
        <div></div>
      </div>
      <div className="divide-y">
        {jobData.map((job) => (
          <JobRow key={job.id} job={job} />
        ))}
      </div>
      <JobListPagination />
    </div>
  );
}
