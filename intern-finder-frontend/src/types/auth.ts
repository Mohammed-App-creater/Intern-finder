
export interface TalentRegisterStep1Dto {
  email: string;
  password: string;
  fullName: string;
  role: "talent";
}

export interface CompanyRegisterStep1Dto {
  email: string;
  password: string;
  companyName: string;
  role: "company";
}

export interface CompanyRegisterStep2Dto {
  companyId: string;
  phone: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  headQuarter?: string;
  branches?: string[];
  industries?: string[];
  logoUrl?: string;
  description?: string;
  techStack?: string[];
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactJobTitle?: string;
  teamSize?: string;
}

export interface TalentRegisterStep2Dto {
  talentId: string;
  location: string;
  phoneNumber: string;
  institution?: string;
  fieldOfStudy?: string;
  program?: string;
  workingEnvironment?: string; // e.g. "Remote", "Hybrid", "Onsite"
  preferredRole?: string;
  linkedinUrl?: string;
  bio?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
}

export interface tempoAuthState {
  id: string | null;
  fullName: string | null;
  email: string | null;
  role: string | null;
  setAuth: (id: string | null, fullName: string | null, email: string | null, role: string | null) => void,
  clearAuth: () => void
}