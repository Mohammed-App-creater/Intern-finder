import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const jobUpdates = [
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
        {jobUpdates.map((job, index) => (
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
                      ? "text-purple-600 border-purple-600"
                      : tag === "Design"
                      ? "text-yellow-600 border-yellow-600"
                      : tag === "Business"
                      ? "text-green-600 border-green-600"
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
