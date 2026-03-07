import { DashboardGreeting } from "@/components/pages/dashboard/talent/dashboard-greeting";
import { JobStatistics } from "@/components/pages/dashboard/client/job-statistics";
import { StatusCards } from "@/components/pages/dashboard/client/status-cards";
import { ApplicantsSummary } from "@/components/pages/dashboard/client/application-summary";
import { JobUpdates } from "@/components/pages/dashboard/client/job-updates";
import { JobOpenCard } from "@/components/pages/dashboard/client/job-open-card";

export default function Dashboard() {
  return (
    <main className="min-h-screen flex-1 p-4 md:p-8 mb-5 mt-2">
      <div className="space-y-6">
        <DashboardGreeting />
        {/* Main Grid */}
        <StatusCards />
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-2/3">
            <JobStatistics />
          </div>
          <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/3">
            <JobOpenCard />
            <ApplicantsSummary />
          </div>
        </div>
        <JobUpdates />
      </div>
    </main>
  );
}
