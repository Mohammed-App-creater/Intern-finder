import api from '@/lib/axios';
import { CompanyDto, companyQueryParams } from '@/types/user';



export const topCompanies = async ( queryParams: companyQueryParams): Promise<CompanyDto[]> => {
  const response = await api.get('/company/top', { params: queryParams });
  return response.data;
}

export const companyList = async ( queryParams: companyQueryParams): Promise<CompanyDto[]> => {
  const response = await api.get('/company', { params: queryParams });
  return response.data.data.companies;
}