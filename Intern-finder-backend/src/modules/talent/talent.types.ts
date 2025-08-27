

export interface RegisterStep1DTO {
    fullName: string;
    email: string;
    password: string;
    
}

export interface RegisterStep2DTO {
    location: string;
    phoneNumber: string;
    institution: string;
    fieldOfStudy: string;
    program: string;
    workingEnvironment: string;
    preferredRole: string;
    linkedinUrl: string;
    bio: string;
    profileImageUrl?: string;
    resumeUrl?: string;
}