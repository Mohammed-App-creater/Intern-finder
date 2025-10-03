import api from '@/lib/axios';
import { ApplicantsResponse } from '@/types/company';
import { CompanyDto, companyQueryParams } from '@/types/user';



export const topCompanies = async ( queryParams: companyQueryParams): Promise<CompanyDto[]> => {
  const response = await api.get('/company/top', { params: queryParams });
  return response.data;
}

export const companyList = async ( queryParams: companyQueryParams): Promise<CompanyDto[]> => {
  const response = await api.get('/company', { params: queryParams });
  return response.data.data.companies;
}

export const AllApplicants = async (): Promise<ApplicantsResponse> => {
  const response = await api.get('/job-applications/job');
  return response.data.data;
}