"use client";
import { Badge } from "@/components/ui/badge";
import { useTopCompanies } from "@/hooks/useCompany";
import { useCompanyFilterStore } from "@/store/company";

export function PopularTags() {
  const { data: companies } = useTopCompanies();
  const { setFilters } = useCompanyFilterStore();
  const handleTagClick = (companyName: string) => {
    setFilters({ search: companyName });
  };

  return (
    <div className="mb-6">
      <span className="text-light text-sm mr-3">Popular:</span>
      <div className="inline-flex gap-2">
        {companies?.map((company) => (
          <Badge
            key={company.id}
            variant="secondary"
            onClick={() => handleTagClick(company.companyName)}
            className="bg-secondary text-primary hover:bg-secondary/80 cursor-pointer"
          >
            {company.companyName}
          </Badge>
        ))}
      </div>
    </div>
  )
}
