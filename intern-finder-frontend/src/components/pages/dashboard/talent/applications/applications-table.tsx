"use client";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/common/status-badge";
import { Pagination } from "@/components/common/pagination";
import Image from "next/image";
import { useMyAppliedJobs } from "@/hooks/useJob";
import { useAuthStore } from "@/store/auth";
import { StatusBadgeProps } from "@/types/job";

// const applications = [
//   {
//     id: 1,
//     company: "Microsoft",
//     logo: "https://cdn-icons-png.flaticon.com/128/732/732221.png",
//     role: "Social Media Assistant",
//     dateApplied: "24 July 2021",
//     status: "In Review" as const,
//   },
//   {
//     id: 2,
//     company: "Cursor",
//     logo: "https://cdn-icons-png.flaticon.com/128/5969/5969205.png",
//     role: "Social Media Assistant",
//     dateApplied: "20 July 2021",
//     status: "Shortlisted" as const,
//   },
//   {
//     id: 3,
//     company: "Packer",
//     logo: "https://cdn-icons-png.flaticon.com/128/564/564419.png",
//     role: "Social Media Assistant",
//     dateApplied: "18 July 2021",
//     status: "Offered" as const,
//   },
//   {
//     id: 4,
//     company: "Divvy",
//     logo: "https://cdn-icons-png.flaticon.com/128/5968/5968771.png",
//     role: "Social Media Assistant",
//     dateApplied: "14 July 2021",
//     status: "Interviewing" as const,
//   },
//   {
//     id: 5,
//     company: "EAsport",
//     logo: "https://cdn-icons-png.flaticon.com/128/732/732193.png",
//     role: "Social Media Assistant",
//     dateApplied: "10 July 2021",
//     status: "Unsuitable" as const,
//   },
// ];

export function ApplicationsTable() { 
  const user = useAuthStore().user;
  const talentId = user?.role === "TALENT" ? user.id : "";
  const { data, isLoading, isError } = useMyAppliedJobs(talentId!);
  console.log("applied jobs data:", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading applications.</div>;
  }
  return (
    <div className="border-1 rounded-lg shadow-sm p-5">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-dark">
            Applications History
          </h3>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light" />
              <Input placeholder="Search" className="pl-10 w-64" />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">
                Roles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">
                Date Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.recentApplications.length ? (
              data.recentApplications.map((application, index) => (
                <tr key={application.id} className="hover:bg-secondary border-none">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Image
                        src={application.companyLogo || "/images/image_placeholder.jpg"}
                        alt="Company Logo"
                        width={250}
                        height={250}
                        className="w-8 h-8 flex items-center justify-center text-wrap text-xs"
                      />

                      <span className="text-sm font-medium text-dark">
                        {application.companyName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark">
                    {application.jobTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark">
                    {application.appliedAt}
                  </td>
                  <td>
                    <StatusBadge status={application.status as StatusBadgeProps["status"]} className="w-fit" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-dark text-center">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}
