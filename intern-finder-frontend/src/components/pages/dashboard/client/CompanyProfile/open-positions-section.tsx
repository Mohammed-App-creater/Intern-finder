import { JobCard } from "./job-card";
import { ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "/green-hexagonal-logo-icon.jpg",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    logo: "/blue-dropbox-logo-icon.jpg",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    logo: "/cyan-terraform-logo-icon.jpg",
    tags: ["Full-Time", "Marketing", "Design"],
  },
];

export function OpenPositionsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-dark text-2xl font-bold">Open Positions</h2>
        <div className="flex items-center gap-2 text-primary hover:text-primary/80 cursor-pointer">
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
