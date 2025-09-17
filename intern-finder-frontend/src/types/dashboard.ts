
export interface TalentTotalJobsApplied {
    totalJobsApplied: number;
}
export interface TalentTotalInterView {
    interviewedCount: number;
}

export interface TalentStates {
    jobStatusCounts: {
        interviewed: number;
        rejected: number;
        pending: number;
        accepted: number;
    };
}

export interface TalentRecentApplications {
    recentApplications: [
        {
            id: string,
            jobTitle: string,
            companyName: string,
            companyLogo: string,
            location: string,
            environmentType: string,
            salaryType: string,
            status: "accepted" | "offered" | "pending" | "rejected" | "shortlisted" | "interview",
            appliedAt: string
        }
    ]
}

export interface TalentUpcomingInterview {
    upcomingInterviews: [
        {
            id: string,
            jobTitle: string,
            companyName: string,
            companyLogo: string,
            contactName: string,
            contactJobTitle: string,
            appliedAt: Date,
            jobLocation: string,
            jobEnvironment: string
        }
    ]
}