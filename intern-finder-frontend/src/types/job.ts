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

export interface JobPosting {
  title: string;
  environmentType: "Remote" | "Hybrid" | "On-site";
  categories: string[];
  salaryType: "paid" | "unpaid" | "volunteer";
  minSalary: number;
  maxSalary: number;
  responsibilities: string;
  description: string;
  professionalSkills: string[];
  tags: string[];
  minExperienceYears: number;
  degree: string;
  location: string;
  capacity: number;
  requiredSkills: string[];
}

export interface JobPostingResponse {
  id: string;
  companyId: string;
  title: string;
  environmentType: string;
  categories: string[];
  salaryType: string;
  minSalary: number;
  maxSalary: number;
  responsibilities: string;
  description: string;
  professionalSkills: string[];
  tags: string[];
  minExperienceYears: number;
  degree: string;
  location: string;
  status: string;
  capacity: number;
  requiredSkills: string[];
  viewCount: number;
  createdAt: string; // or Date if you plan to convert to Date objects
  updatedAt: string; // or Date if you plan to convert to Date objects
}

export interface RecentApplication {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  location: string;
  environmentType: string;
  salaryType: string;
  status: string;
  appliedAt: string;
}

export interface RecentApplicationsData {
  recentApplications: RecentApplication[];
}

export interface StatusBadgeProps {
  status:
    | "accepted"
    | "offered"
    | "pending"
    | "rejected"
    | "shortlisted"
    | "interview"
    | "In Review"
    | "Interviewing"
    | "Interviewed"
    | "Shortlisted"
    | "Declined"
    | "Unsuitable"
    | "Hired"
    | "Interview"
    | "Offered"
    | "Fulltime"
    | "Freelance"
    | "Live"
    | "Closed";
}

export interface JobFilterStore {
  filters: JobFilters;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
}

export interface JobDetail {
  id: string;
  companyId: string;
  title: string;
  environmentType: "Remote" | "Onsite" | "Hybrid" | string;
  categories: string[];
  salaryType: "paid" | "unpaid" | "volunteer";
  minSalary: number;
  maxSalary: number;
  responsibilities: string;
  description: string;
  professionalSkills: string[];
  tags: string[];
  minExperienceYears: number;
  degree: string;
  location: string;
  status: string;
  capacity: number;
  requiredSkills: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  company: {
    id: string;
    companyName: string;
    logoUrl?: string;
  };
}

export interface JobDetailResponse {
  success: boolean;
  message: string;
  data: JobDetail;
}