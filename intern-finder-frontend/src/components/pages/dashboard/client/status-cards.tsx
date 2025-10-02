"use client";

import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useCompanyDashboardStats } from "@/hooks/useCompanyDashboard";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";

const statsConfig = [
  {
    key: "newCandidates" as const,
    title: "New candidates to review",
    bgColor: "bg-blue-800",
    navigate: "/client/dashboard/applicants",
  },
  {
    key: "totalJobs" as const,
    title: "Jobs you Posted",
    bgColor: "bg-primary",
    navigate: "/client/dashboard/joblisting",
  },
  {
    key: "newMassages" as const,
    title: "Messages received",
    bgColor: "bg-blue-500",
    navigate: "/client/dashboard/messages",
  },
];

export function StatusCards() {
  const user = useAuthStore().user;
  const { data, isLoading, isError } = useCompanyDashboardStats();

  if (!user?.id) return null;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statsConfig.map((status, index) => (
          <Card
            key={index}
            className={`${status.bgColor} text-white p-6 border-0 rounded-none`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-5">
                  <div className="text-3xl font-bold mb-1">Loading...</div>
                  <div className="text-lg font-bold opacity-90 max-w-50">
                    {status.title}
                  </div>
                </div>
              </div>
              <Link href={status.navigate ?? "#"}>
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statsConfig.map((stat, index) => (
          <Card
            key={index}
            className={`${stat.bgColor} text-white p-6 border-0 rounded-none`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-5">
                  <div className="text-3xl font-bold mb-1">Error</div>
                  <div className="text-lg font-bold opacity-90 max-w-50">
                    {stat.title}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {statsConfig.map((status, index) => (
        <Card
          key={index}
          className={`${status.bgColor} text-white p-6 border-0 rounded-none`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-5">
                <div className="text-3xl font-bold mb-1">
                  {data?.[status.key] ?? 0}
                </div>
                <div className="text-lg font-bold opacity-90 max-w-50">
                  {status.title}
                </div>
              </div>
            </div>
            <Link href={status.navigate ?? "#"}>
              <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
