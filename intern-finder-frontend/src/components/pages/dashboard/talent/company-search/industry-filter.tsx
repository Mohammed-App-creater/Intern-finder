"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useCompanyFilterStore } from "@/store/company";

export function IndustryFilter() {
  const { filters, setFilters } = useCompanyFilterStore();

  const handleCheckboxChange = (industry: string) => {
    const industries = filters.industries ?? [];

    const newIndustries = industries.includes(industry)
      ? industries.filter((i) => i !== industry)
      : [...industries, industry];

    setFilters({ industries: newIndustries });
  };


  const industries = [
    { name: "Advertising", count: 41 },
    { name: "Business Service", count: 4 },
    { name: "Blockchain", count: 5 },
    { name: "Cloud", count: 18 },
    { name: "Computer Hardware", count: 6 },
    { name: "Education", count: 34 },
    { name: "Fintech", count: 45 },
    { name: "Gaming", count: 59 },
    { name: "Food & Beverage", count: 8 },
    { name: "Healthcare", count: 3 },
    { name: "Hosting", count: 8 },
    { name: "Media", count: 4 },
  ];

  return (
    <div className="mb-8">
      <h3 className="font-semibold text-dark mb-4">Industry</h3>
      <div className="space-y-3">
        {industries.map((industry) => (
          <div key={industry.name} className="flex items-center space-x-2">
            <Checkbox
              id={industry.name}
              checked={filters.industries?.includes(industry.name) ?? false}
              onCheckedChange={() => handleCheckboxChange(industry.name)}
            />
            <label
              htmlFor={industry.name}
              className="text-sm text-light cursor-pointer flex-1"
            >
              {industry.name} ({industry.count})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
