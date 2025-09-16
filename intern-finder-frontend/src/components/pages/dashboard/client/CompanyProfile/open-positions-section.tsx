import { JobCard } from "./job-card";
import { ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "https://cdn-icons-png.flaticon.com/128/5968/5968835.png",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    logo: "https://cdn-icons-png.flaticon.com/128/174/174845.png",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    logo: "https://cdn-icons-png.flaticon.com/128/5968/5968374.png",
    tags: ["Full-Time", "Marketing", "Design"],
  },
];

export function OpenPositionsSection() {
  return (
    <section className="flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-dark">Open Positions</h2>
        <div className="flex items-center gap-2 text-primary cursor-pointer">
          <span className="font-medium">Show all jobs</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            location={job.location}
            logo={job.logo}
            tags={job.tags}
          />
        ))}
      </div>
    </section>
  );
}
