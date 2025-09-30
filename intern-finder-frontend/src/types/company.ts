export interface CompanyDashboardStats {
  totalJobs: number;
  newMessages: number;
  newCandidates: number;
}

export interface CompanyWeeklyStats {
  companyId: string;
  weekStart: string;
  weekEnd: string;
  views: {
    current: number;
    previous: number;
    change: number;
  };
  applied: {
    current: number;
    previous: number;
    change: number;
  };
}

export interface OpenJobsCount {
  count: number;
}

export interface JobUpdate {
  id: string;
  title: string;
  location: string;
  categories: string[];
  tags: string[];
  company: string;
  companyLogo: string;
  applied: number;
  capacity: number;
  remaining: number;
}

export interface JobUpdatesResponse {
  data: JobUpdate[];
}