'use client';

import { useOpenJobsCount } from "@/hooks/useCompanyDashboard";

export function JobOpenCard() {
  const { data: openJobsCount, isLoading, isError } = useOpenJobsCount();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 border p-4 bg-white">
        <h1 className="font-bold text-xl">Job Open</h1>
        <div className="flex items-end gap-3">
          <h1 className="flex items-end font-bold text-5xl">Loading...</h1>
          <p className="text-light">Jobs Opened</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-5 border p-4 bg-white">
        <h1 className="font-bold text-xl">Job Open</h1>
        <div className="flex items-end gap-3">
          <h1 className="flex items-end font-bold text-5xl">Error</h1>
          <p className="text-light">Jobs Opened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 border p-4 bg-white">
      <h1 className="font-bold text-xl">Job Open</h1>
      <div className="flex items-end gap-3">
        <h1 className="flex items-end font-bold text-5xl">
          {typeof openJobsCount === "number"
            ? openJobsCount
            : openJobsCount?.count ?? "N/A"}
        </h1>
        <p className="text-light">Jobs Opened</p>
      </div>
    </div>
  );
}
