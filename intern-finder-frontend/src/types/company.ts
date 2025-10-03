export interface CompanyDashboardStats {
  totalJobs: number;
  newMassages: number;
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


export interface Applicant {
  id: string;
  appliedAt: string;
  talent: {
    id: string;
    fullName: string;
    profileImageUrl: string;
    rating: number;
  };
  job: {
    id: string;
    title: "Front-end Developer"
  },
  Interview: []
}

export interface ApplicantsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    items: Applicant[];
  };
}
