
export interface JobListing {
    id: string;
    title: string;
    categories: string[];
    tags: string[];
    location: string;
    minSalary: number;
    maxSalary: number;
    environmentType: "Remote" | "Onsite" | "Hybrid" | string; // allow extension
    createdAt: string; // ISO timestamp
    company: {
        id: string;
        companyName: string;
        logoUrl?: string;
    };
}

export interface JobFilters {
  search?: string;
  location?: string;
  categories?: string[];
  minExperienceYears?: number;
  datePosted?: "today" | "week" | "month";
  salaryMin?: number;
  salaryMax?: number;
  tags?: string[];
}
