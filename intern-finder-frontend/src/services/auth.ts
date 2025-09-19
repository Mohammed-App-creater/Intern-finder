import api from "@/lib/axios";
import { TalentRegisterStep2Dto, CompanyRegisterStep2Dto, TalentRegisterStep1Dto, CompanyRegisterStep1Dto } from "@/types/auth";


export const googleLogin = () => {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!base) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return;
  }
  // navigate to backend which will redirect to Google
  window.location.assign(`${base}/auth/google`);
};

export const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data.data; // { token, user }
};

export const talentRegisterStep1 = async (registrationData: TalentRegisterStep1Dto) => {
    const { data } = await api.post("talent/register/step1", registrationData);
    return data;
};

export const companyRegisterStep1 = async (registrationData: CompanyRegisterStep1Dto) => {
    const { data } = await api.post("company/register/step1", registrationData);
    return data;
};

export const talentRegisterStep2 = async (registrationData: TalentRegisterStep2Dto) => {
    try {
        const { data } = await api.post(`talent/register/step2/${registrationData.talentId}`, registrationData);
        return data;
    } catch (error) {
        console.error("Error in talentRegisterStep2:", error);
    }
};

export const companyRegisterStep2 = async (registrationData: CompanyRegisterStep2Dto) => {
    console.log("Registering company with data:", registrationData.companyId);
    const { data } = await api.post(`company/register/step2/${registrationData.companyId}`, registrationData);
    return data;
};

export const getProfile = async () => {
    const { data } = await api.get("/auth/me");
    return data; // { id, email, role, ... }
};





























