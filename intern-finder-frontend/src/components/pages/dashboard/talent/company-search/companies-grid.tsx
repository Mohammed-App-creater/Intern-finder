"use client";
import { CompanyCard } from "./company-card";
import { useCompanyList } from "@/hooks/useCompany";

export function CompaniesGrid() {
  const { data: companies, isLoading, isError } = useCompanyList();
  console.log(companies);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading companies</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {companies ? (
        companies.map((company) => (
          <CompanyCard key={company.companyName} {...company} />
        ))
      ) : (
        <div>No companies found</div>
      )}
    </div>
  );
}
