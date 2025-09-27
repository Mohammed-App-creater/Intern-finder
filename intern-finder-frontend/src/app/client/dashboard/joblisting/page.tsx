import { JobListTable } from "@/components/pages/dashboard/client/joblisting/job-list-table";
import { JobListingHeader } from "@/components/pages/dashboard/client/joblisting/job-listing-header";

export default function JobListingPage() {
  return (
    <div className="min-h-screen p-6 mt-3">
      <div>
        <JobListingHeader />
        <JobListTable />
      </div>
    </div>
  );
}
