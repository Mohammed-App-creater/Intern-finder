import { DashboardGreeting } from "@/components/pages/dashboard/talent/dashboard-greeting";
import { JobStatistics } from "@/components/pages/dashboard/client/job-statistics";
import { StatusCards } from "@/components/pages/dashboard/client/status-cards";

export default function Dashboard() {
  return (
    <main className="flex-1 p-8 mb-5 mt-2">
      <div className="space-y-6">
        <DashboardGreeting />
        {/* Main Grid */}
        <StatusCards />
        <div className="flex justify-between">
          <JobStatistics />
          <div className="flex flex-col gap-3  w-[32.5%]">
            <div className="flex flex-col gap-3 border p-4 bg-white">
              <h1 className="font-bold text-lg">Job Open</h1>
              <div className="flex items-end gap-3">
                <h1 className="flex items-end font-bold text-4xl">12</h1>
                <p className="text-light">Jobs Opened</p>
              </div>
            </div>
            <div>Applicants Summary</div>
          </div>
        </div>
      </div>
    </main>
  );
}
