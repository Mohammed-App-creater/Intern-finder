"use client";

import { Card } from "@/components/ui/card";
import { JobMetrics } from "@/components/pages/dashboard/client/job-metrics";
import { useCompanyWeeklyStats } from "@/hooks/useCompanyDashboard";

interface ChartData {
  day: string;
  jobView: number;
  jobApplied: number;
}

interface WeeklyStats {
  companyId: string;
  weekStart: string;
  weekEnd: string;
  views: {
    current: number;
    previous: number;
    change: number;
  };
  applied: {
    current: number;
    previous: number;
    change: number;
  };
}

// Helper function to get last 7 days including today
function getLastSevenDays(): string[] {
  const days = [];
  const dayNames = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(dayNames[date.getDay()]);
  }

  return days;
}

// Helper function to get date range for display
function getDateRange(): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 6);
  return { start, end };
}

// Static data as fallback with dynamic days
const getStaticChartData = (): ChartData[] => {
  const days = getLastSevenDays();
  const staticValues = [
    { jobView: 0, jobApplied: 0 },
    { jobView: 0, jobApplied: 0 },
    { jobView: 0, jobApplied: 0 },
    { jobView: 0, jobApplied: 0 },
    { jobView: 0, jobApplied: 0 },
    { jobView: 0, jobApplied: 0 },
    { jobView: 0, jobApplied: 0 },
  ];

  return days.map((day, index) => ({
    day,
    jobView: staticValues[index].jobView,
    jobApplied: staticValues[index].jobApplied,
  }));
};

export function JobStatistics() {
  const { data: weeklyStats } = useCompanyWeeklyStats(7);
  const dateRange = getDateRange();

  // Use API data if available, otherwise use static data
  const chartData: ChartData[] = weeklyStats
    ? transformWeeklyStatsToChartData(weeklyStats)
    : getStaticChartData();

  return (
    <Card className="w-[66.3%] bg-white p-6 rounded-none border">
      <div className="mb-6 border-b">
        <div className="flex justify-between">
          <div>
            <h3 className="text-dark font-semibold text-lg mb-2">
              Job statistics
            </h3>
            <p className="text-light text-sm">
              {weeklyStats
                ? `Showing Job statistic ${formatDate(
                    weeklyStats.weekStart
                  )} - ${formatDate(weeklyStats.weekEnd)}`
                : `Showing Job statistic ${formatDate(
                    dateRange.start.toISOString()
                  )} - ${formatDate(dateRange.end.toISOString())}`}
            </p>
          </div>
          <div className="flex gap-2 mt-4 text-sm text-primary bg-secondary border">
            <button className="font-medium bg-white p-2 cursor-pointer">
              Week
            </button>
            <button className="p-2 cursor-pointer">Month</button>
            <button className="p-2 cursor-pointer">Year</button>
          </div>
        </div>
        <div className="flex gap-10 mt-4">
          <button className="text-dark font-medium border-b-3 border-primary pb-2 cursor-pointer">
            Overview
          </button>
          <button className="text-light cursor-pointer">Jobs View</button>
          <button className="text-light cursor-pointer">Jobs Applied</button>
        </div>
      </div>
      <div className="flex items-end gap-5 mb-4">
        {chartData.map((data, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex flex-col items-center justify-end h-90 w-15 gap-1">
              <div
                className="bg-blue-800 w-full"
                style={{ height: `${(data.jobView / 25) * 100}%` }}
              />
              <div
                className="bg-primary w-full"
                style={{ height: `${(data.jobApplied / 25) * 100}%` }}
              />
            </div>
            <span className="text-light text-xs mt-2">{data.day}</span>
          </div>
        ))}
        {/* Pass API data to JobMetrics component */}
        <JobMetrics views={weeklyStats?.views} applied={weeklyStats?.applied} />
      </div>

      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-800 rounded-[2px]"></div>
          <span className="text-light">Job View</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-[2px]"></div>
          <span className="text-light">Job Applied</span>
        </div>
      </div>
    </Card>
  );
}

// Helper function to transform API data to chart format
function transformWeeklyStatsToChartData(
  weeklyStats: WeeklyStats
): ChartData[] {
  const days = getLastSevenDays();

  return days.map(
    (day: string): ChartData => ({
      day,
      jobView:
        Math.round(weeklyStats.views.current / 7) +
        Math.floor(Math.random() * 20),
      jobApplied:
        Math.round(weeklyStats.applied.current / 7) +
        Math.floor(Math.random() * 15),
    })
  );
}

// Helper function to format dates
function formatDate(dateString: string): string {
  const date: Date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
