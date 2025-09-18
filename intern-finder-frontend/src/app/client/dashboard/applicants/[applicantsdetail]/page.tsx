import { ApplicantContent } from "@/components/pages/dashboard/client/CompanyProfile/Applicant/applicant-content";
import { ApplicantHeader } from "@/components/pages/dashboard/client/CompanyProfile/Applicant/applicant-header";
import { ApplicantSidebar } from "@/components/pages/dashboard/client/CompanyProfile/Applicant/applicant-sidebar";

export default function ApplicantDetailsPage() {
  return (
    <div className="min-h-screen p-6">
      <ApplicantHeader />

      <div className="flex">
        <ApplicantSidebar />
        <ApplicantContent />
      </div>
    </div>
  );
}
