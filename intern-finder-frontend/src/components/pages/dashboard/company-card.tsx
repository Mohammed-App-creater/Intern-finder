import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface CompanyCardProps {
  logo: string;
  name: string;
  description: string;
  jobCount: number;
  tags: string[];
}

export function CompanyCard({
  logo,
  name,
  description,
  jobCount,
  tags,
}: CompanyCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Image src={logo} alt={"Company Icon"} width={70} height={70} />
          <span className="text-primary text-md font-extrabold">{jobCount} Jobs</span>
        </div>

        <h3 className="font-semibold text-dark text-lg mb-2">{name}</h3>
        <p className="text-light text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-primary text-primary bg-secondary"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
