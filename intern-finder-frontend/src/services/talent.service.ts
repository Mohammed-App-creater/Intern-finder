import api  from '@/lib/axios';
import { TalentTotalInterView, TalentStates, TalentTotalJobsApplied, TalentRecentApplications } from "@/types/dashboard";

export const getTalentDashboardTotalJobsApplied = async (talentId: string): Promise<TalentTotalJobsApplied> => {
    const { data } = await api.get(`talent/${talentId}/dashboard/total-jobs-applied`);
    return data.data;
};

export const getTalentDashboardTotalInterviews = async (talentId: string): Promise<TalentTotalInterView> => {
    const { data } = await api.get(`talent/${talentId}/dashboard/interviewed-count`);
    return data.data;
}

export const getTalentDashboardJobStatus = async (talentId: string): Promise<TalentStates> => {
    const { data } = await api.get(`talent/${talentId}/dashboard/job-status`);
    return data.data;
}

export const getTalentDashboardUpcomingInterviews = async (talentId: string) => {
    const { data } = await api.get(`talent/${talentId}/dashboard/upcoming-interviews`);
    return data.data;
}

export const getTalentDashboardRecentApplications = async (talentId: string): Promise<TalentRecentApplications> => {
    const { data } = await api.get(`talent/${talentId}/dashboard/recent-applications`);
    return data.data;
}