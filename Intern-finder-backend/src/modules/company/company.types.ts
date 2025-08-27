export interface RegisterStep1DTO {
    companyName: string;
    email: string;
    password: string;
}

export interface RegisterStep2DTO {
        phone: string;
        linkedinUrl: string;
        instagram: string;
        websiteUrl: string;
        employeeCount: string;
        headQuarter: string;
        branches: string[];
        industries: string[];
        logoUrl: string;
        description: string;
        techStack: string[];
        contactName: string;
        contactEmail: string;
        contactPhone: string;
        contactJobTitle: string;
        teamSize: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
} 