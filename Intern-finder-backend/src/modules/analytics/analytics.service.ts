import prisma from "@/utils/prisma"; 



export const getAllAnalytics = async () => {
    try {
        const jobCount = await prisma.job.count();
        const companyCount = await prisma.company.count();
        const talentCount = await prisma.talent.count();
        return { jobCount, companyCount, talentCount };
    } catch (error) {
        console.error("Error fetching analytics:", error);
        throw new Error("Failed to fetch analytics");
    }
};
