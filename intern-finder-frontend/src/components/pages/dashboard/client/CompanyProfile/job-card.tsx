import Image from "next/image";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  logo: string;
  tags: string[];
}

export function JobCard({
  title,
  company,
  location,
  logo,
  tags,
}: JobCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
          <Image
            src={logo || "/placeholder.svg"}
            alt={`${company} logo`}
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-dark font-semibold text-lg mb-1">{title}</h3>
          <p className="text-light text-sm mb-3">
            {company} • {location}
          </p>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tag === "Full-Time"
                    ? "bg-secondary text-primary"
                    : tag === "Marketing"
                    ? "bg-orange-100 text-orange-600 border border-orange-200"
                    : "bg-blue-100 text-blue-600 border border-blue-200"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
