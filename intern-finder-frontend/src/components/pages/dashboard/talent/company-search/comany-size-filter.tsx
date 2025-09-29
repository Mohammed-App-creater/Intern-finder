"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useCompanyFilterStore } from "@/store/company";

export function CompanySizeFilter() {
  const { filters, setFilters } = useCompanyFilterStore();

  const handleCheckboxChange = (range: string) => {
    const teamSize = filters.teamSize ?? [];

    const newTeamSize = teamSize.includes(range)
      ? teamSize.filter((r) => r !== range)
      : [...teamSize, range];

    setFilters({ teamSize: newTeamSize });
  };

  const sizes = [
    { range: "1-50", count: 45 },
    { range: "51-150", count: 37 },
    { range: "151-250", count: 45 },
    { range: "251-500", count: 6 },
    { range: "501-1000", count: 43 },
    { range: "1000+ above", count: 23 },
  ];

  return (
    <div>
      <h3 className="font-semibold text-dark mb-4">Company Size</h3>
      <div className="space-y-3">
        {sizes.map((size) => (
          <div key={size.range} className="flex items-center space-x-2">
            <Checkbox
              id={size.range}
              checked={filters.teamSize?.includes(size.range) ?? false}
              onCheckedChange={() => handleCheckboxChange(size.range)}
            />
            <label
              htmlFor={size.range}
              className="text-sm text-light cursor-pointer flex-1"
            >
              {size.range} ({size.count})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
