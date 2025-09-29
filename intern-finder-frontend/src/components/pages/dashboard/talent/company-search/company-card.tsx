import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CompanyDto } from "@/types/user";



export function CompanyCard({ logoUrl,  companyName, description: companyDescription, employeeCount, techStack }: CompanyDto) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Image src={logoUrl ?? "/images/default-logo.png"} alt={"Company Icon"} width={70} height={70} />
          <span className="text-primary text-md font-extrabold">{employeeCount} Employees</span>
        </div>

        <h3 className="font-semibold text-dark text-lg mb-2">{companyName}</h3>
        <p className="text-light text-sm mb-4 line-clamp-3">{companyDescription}</p>

        <div className="flex flex-wrap gap-2">
          {techStack?.map((tag) => (
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
