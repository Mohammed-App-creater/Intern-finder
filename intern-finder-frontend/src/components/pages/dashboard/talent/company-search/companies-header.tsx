"use client";
import { Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCompanyFilterStore } from "@/store/company";

export function CompaniesHeader() {
  const { filters, setFilters } = useCompanyFilterStore();

  const handleSortChange = (sortBy: "companyName" | "employeeCount" | "createdAt") => {
    setFilters({ sortBy });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-dark mb-1">All Companies</h2>
        <p className="text-light">Showing 72 results</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-light">Sort by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-dark">
                {filters.sortBy === "createdAt"
                  ? "Newest"
                  : filters.sortBy === "employeeCount"
                  ? "Most jobs"
                  : "Most relevant"}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSortChange("companyName")}>
                Most relevant
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("createdAt")}>
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("employeeCount")}>
                Most jobs
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-primary">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-light">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
