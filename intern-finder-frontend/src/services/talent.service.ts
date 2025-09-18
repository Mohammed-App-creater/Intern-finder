import api  from '@/lib/axios';
import { TalentTotalInterView, TalentStates, TalentTotalJobsApplied, TalentRecentApplications, TalentUpcomingInterview } from "@/types/dashboard";
import { BasicInfo, Password } from '@/types/setting';
import { TalentDto } from '@/types/user';

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

export const getTalentDashboardUpcomingInterviews = async (talentId: string): Promise<TalentUpcomingInterview> => {
    const { data } = await api.get(`talent/${talentId}/dashboard/upcoming-interviews`);
    return data.data;
}

export const getTalentDashboardRecentApplications = async (talentId: string): Promise<TalentRecentApplications> => {
    const { data } = await api.get(`talent/${talentId}/dashboard/recent-applications`);
    return data.data;
}

// Update

export const UpdateBasicInfoTalent =  async (talentId: string, BasicInfo: BasicInfo): Promise<TalentDto>  => {
    const { data } = await api.put(`/talent/${talentId}/settings/basic-info`, BasicInfo)
    return data.data;
}
 
export const UpdateEmail=  async (talentId: string, email:  string): Promise<TalentDto>  => {
    const { data } = await api.put(`/talent/${talentId}/settings/email`, {email: email})
    return data.data;
}

export const UpdatePassword=  async (talentId: string, Passwords:  Password): Promise<TalentDto>  => {
    const { data } = await api.put(`/talent/${talentId}/settings/password`, Passwords)
    return data.data;
} 