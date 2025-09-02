import { DashboardHeader } from "@/components/pages/dashboard/dashboard-header";
import { DashboardGreeting } from "@/components/pages/dashboard/dashboard-greeting";
import { StatusCards } from "@/components/pages/dashboard/status-cards";
import { JobStatusChart } from "@/components/pages/dashboard/job-status-card";
import { UpcomingInterviews } from "@/components/pages/dashboard/upcoming-interviews";
import { RecentApplications } from "@/components/pages/dashboard/recent-applications";

export default function Dashboard() {
  return (
    <main className="flex-1 p-8 mb-5 mt-2">
      <div className="space-y-6">
        <DashboardHeader />
        <DashboardGreeting />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatusCards />
          <JobStatusChart />
          <UpcomingInterviews />
        </div>
        <RecentApplications />
      </div>
    </main>
  );
}
