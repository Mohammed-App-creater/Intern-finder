import { ApplicationsHeader } from "@/components/pages/dashboard/talent/applications/applications-header";
import { ApplicationsTable } from "@/components/pages/dashboard/talent/applications/applications-table";
import { StatusTabs } from "@/components/pages/dashboard/talent/applications/status-tabs";

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-10 px-8">
        <ApplicationsHeader />
        <StatusTabs />
        <ApplicationsTable />
      </div>
    </div>
  );
}
