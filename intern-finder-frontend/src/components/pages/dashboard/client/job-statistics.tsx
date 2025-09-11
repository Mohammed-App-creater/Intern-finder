import { Card } from "@/components/ui/card";

const chartData = [
  { day: "Mon", jobView: 80, jobApplied: 60 },
  { day: "Tue", jobView: 45, jobApplied: 35 },
  { day: "Wed", jobView: 90, jobApplied: 70 },
  { day: "Thu", jobView: 120, jobApplied: 40 },
  { day: "Fri", jobView: 150, jobApplied: 25 },
  { day: "Sat", jobView: 100, jobApplied: 80 },
  { day: "Sun", jobView: 110, jobApplied: 90 },
];

export function JobStatistics() {
  return (
    <Card className="w-[66.3%] bg-white p-6 rounded-none border">
      <div className="mb-6 border-b">
        <div className="flex justify-between">
          <div>
            <h3 className="text-dark font-semibold text-lg mb-2">
              Job statistics
            </h3>
            <p className="text-light text-sm">Showing Jobstatistic Jul 19-25</p>
          </div>
          <div className="flex gap-2 mt-4 text-sm text-primary bg-secondary border  " >
            <button className="font-medium bg-white p-2 cursor-pointer">Week</button>
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
      <div className="flex items-end gap-2 h-48 mb-4">
        {chartData.map((data, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex flex-col items-center justify-end h-40 w-full gap-1">
              <div
                className="bg-blue-800 w-full"
                style={{ height: `${(data.jobView / 150) * 100}%` }}
              />
              <div
                className="bg-primary w-full"
                style={{ height: `${(data.jobApplied / 150) * 100}%` }}
              />
            </div>
            <span className="text-light text-xs mt-2">{data.day}</span>
          </div>
        ))}
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
