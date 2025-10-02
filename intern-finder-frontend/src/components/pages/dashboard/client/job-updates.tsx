'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useJobUpdates } from "@/hooks/useCompanyDashboard";

// Static data as fallback
const staticJobUpdates = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
    icon: "https://cdn-icons-png.flaticon.com/128/5757/5757849.png",
  },
  {
    title: "Brand Designer",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    tags: ["Business", "Design"],
    applied: 5,
    capacity: 10,
    icon: "https://cdn-icons-png.flaticon.com/128/564/564419.png",
  },
  {
    title: "Interactive Developer",
    company: "Terraform",
    location: "Berlin, Germany",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
    icon: "https://cdn-icons-png.flaticon.com/128/5968/5968835.png",
  },
  {
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    type: "Full-Time",
    tags: ["Business", "Design"],
    applied: 5,
    capacity: 10,
    icon: "https://cdn-icons-png.flaticon.com/128/5969/5969323.png",
  },
];

export function JobUpdates() {
  const { data: jobUpdatesData, isLoading, isError } = useJobUpdates();

  // Use API data if available (take only first 4), otherwise use static data
  const displayJobs =
    jobUpdatesData && jobUpdatesData.length > 0
      ? jobUpdatesData.slice(0, 4).map((job) => ({
          title: job.title,
          company: job.company,
          location: job.location,
          type: "Full-Time", // Default type since API doesn't provide this
          tags: job.categories.slice(0, 2), // Use categories as tags, max 2
          applied: job.applied,
          capacity: job.capacity,
          icon: job.companyLogo,
        }))
      : staticJobUpdates;

  if (isLoading) {
    return (
      <div className="border p-6">
        <div className="flex items-center justify-between mb-3 pb-3 border-b">
          <h3 className="text-dark font-semibold text-lg">Job Updates</h3>
          <button className="text-primary text-sm font-medium flex items-center gap-2">
            View All
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {staticJobUpdates.map((job, index) => (
            <Card key={index} className="bg-white p-4 rounded-none border">
              <div className="flex justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary text-primary"
                  >
                    Loading...
                  </Badge>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-dark font-medium text-sm mb-1">
                  Loading...
                </h4>
                <p className="text-light text-xs">Loading...</p>
              </div>
              <div className="flex gap-1 mb-4">
                <Badge variant="outline" className="text-xs py-1 px-2">
                  Loading
                </Badge>
              </div>
              <div className="text-xs text-light">
                <span className="text-dark font-medium">Loading...</span> of
                Loading...
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border p-6">
        <div className="flex items-center justify-between mb-3 pb-3 border-b">
          <h3 className="text-dark font-semibold text-lg">Job Updates</h3>
          <button className="text-primary text-sm font-medium flex items-center gap-2">
            View All
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {staticJobUpdates.map((job, index) => (
            <Card key={index} className="bg-white p-4 rounded-none border">
              <div className="flex justify-between">
                <div className="flex items-start gap-3">
                  <Image
                    src={job.icon}
                    alt="Company Icon"
                    width={50}
                    height={50}
                    className="w-10 h-10 flex items-center justify-center text-lg"
                  />
                </div>
                <div>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary text-primary"
                  >
                    {job.type}
                  </Badge>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-dark font-medium text-sm mb-1">
                  {job.title}
                </h4>
                <p className="text-light text-xs">
                  {job.company} • {job.location}
                </p>
              </div>
              <div className="flex gap-1 mb-4">
                {job.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className={`text-xs py-1 px-2 ${
                      tag === "Marketing"
                        ? "text-purple-500 border-purple-500"
                        : tag === "Design"
                        ? "text-yellow-500 border-yellow-500"
                        : tag === "Business"
                        ? "text-green-500 border-green-500"
                        : ""
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-light">
                <span className="text-dark font-medium">
                  {job.applied} applied
                </span>{" "}
                of {job.capacity} capacity
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border p-6">
      <div className="flex items-center justify-between mb-3 pb-3 border-b">
        <h3 className="text-dark font-semibold text-lg">Job Updates</h3>
        <button className="text-primary text-sm font-medium flex items-center gap-2">
          View All
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {displayJobs.map((job, index) => (
          <Card key={index} className="bg-white p-4 rounded-none border">
            <div className="flex justify-between">
              <div className="flex items-start gap-3">
                <Image
                  src={job.icon}
                  alt="Company Icon"
                  width={50}
                  height={50}
                  className="w-10 h-10 flex items-center justify-center text-lg"
                />
              </div>
              <div>
                <Badge
                  variant="secondary"
                  className="text-xs bg-secondary text-primary"
                >
                  {job.type}
                </Badge>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-dark font-medium text-sm mb-1">
                {job.title}
              </h4>
              <p className="text-light text-xs">
                {job.company} • {job.location}
              </p>
            </div>
            <div className="flex gap-1 mb-4">
              {job.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant="outline"
                  className={`text-xs py-1 px-2 capitalize ${
                    tag === "Marketing" || tag === "marketing"
                      ? "text-purple-500 border-purple-500"
                      : tag === "Design" || tag === "design"
                      ? "text-yellow-500 border-yellow-500"
                      : tag === "Business" || tag === "business"
                      ? "text-green-500 border-green-500"
                      : tag === "Engineering" || tag === "engineering"
                      ? "text-blue-500 border-blue-500"
                      : "text-gray-500 border-gray-500"
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-xs text-light">
              <span className="text-dark font-medium">
                {job.applied} applied
              </span>{" "}
              of {job.capacity} capacity
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
