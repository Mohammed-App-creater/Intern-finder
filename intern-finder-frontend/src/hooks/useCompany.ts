import { topCompanies, companyList, AllApplicants } from "@/services/company.service";
import { useCompanyFilterStore } from "@/store/company";
import { useQuery } from "@tanstack/react-query";

export const useTopCompanies = () => {
  const { filters } = useCompanyFilterStore();

  return useQuery({
    queryKey: ["companies", "top"],
    queryFn: () => topCompanies(filters),
  });
};


export const useCompanyList = () => {
  const { filters } = useCompanyFilterStore();

  return useQuery({
    queryKey: ["companies", "list", filters],
    queryFn: () => companyList(filters),
  });
};

export const useAllApplicants = () => {
  return useQuery({
    queryKey: ["applicants", "all"],
    queryFn: () => AllApplicants(),
  });
};