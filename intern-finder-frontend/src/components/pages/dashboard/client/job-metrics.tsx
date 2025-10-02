import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface JobMetricsProps {
  views?: {
    current: number;
    previous: number;
    change: number;
  };
  applied?: {
    current: number;
    previous: number;
    change: number;
  };
}

export function JobMetrics({ views, applied }: JobMetricsProps) {
  const calculatePercentageChange = (
    current: number,
    previous: number
  ): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatChangeText = (change: number): string => {
    if (change > 0) return `${change.toFixed(1)}% ↗`;
    if (change < 0) return `${Math.abs(change).toFixed(1)}% ↘`;
    return "0% →";
  };

  const getChangeColor = (change: number): string => {
    if (change > 0) return "text-primary";
    if (change < 0) return "text-red-500";
    return "text-light";
  };

  // Calculate percentage changes using the function
  const viewsChange = views
    ? calculatePercentageChange(views.current, views.previous)
    : 6.4;
  const appliedChange = applied
    ? calculatePercentageChange(applied.current, applied.previous)
    : -0.5;

  return (
    <div className="flex flex-col gap-6">
      {/* Job Views */}
      <Card className="bg-white p-6 rounded-none border">
        <div className="flex items-center gap-10 justify-between">
          <h4 className="text-dark font-medium text-lg">Job Views</h4>
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm font-medium">👁</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-dark">
          {views?.current.toLocaleString() || "2,342"}
        </div>
        <div className="text-light text-md">
          This Week{" "}
          <span className={getChangeColor(viewsChange)}>
            {formatChangeText(viewsChange)}
          </span>
        </div>
      </Card>

      {/* Job Applied */}
      <Card className="bg-white p-6 rounded-none border">
        <div className="flex items-center gap-10 justify-between">
          <h4 className="text-dark font-medium text-lg">Job Applied</h4>
          <div className="w-8 h-8 flex items-center justify-center">
            <FileText className="text-primary w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-bold text-dark">
          {applied?.current.toLocaleString() || "654"}
        </div>
        <div className="text-light text-md">
          This Week{" "}
          <span className={getChangeColor(appliedChange)}>
            {formatChangeText(appliedChange)}
          </span>
        </div>
      </Card>
    </div>
  );
}
