
export interface TalentTotalJobsApplied {
    totalJobsApplied: number;
}

export interface TalentStates {
    jobStatusCounts: {
            interviewed: number;
            rejected: number;
            pending: number;
            accepted: number;
        };
}