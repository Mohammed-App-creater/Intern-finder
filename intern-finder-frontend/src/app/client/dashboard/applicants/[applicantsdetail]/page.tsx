import { ApplicantContent } from "@/components/pages/dashboard/client/Applicant/applicant-content";
import { ApplicantHeader } from "@/components/pages/dashboard/client/Applicant/applicant-header";
import { ApplicantSidebar } from "@/components/pages/dashboard/client/Applicant/applicant-sidebar";

export default function ApplicantDetailsPage() {
  return (
    <div className="min-h-screen p-6">
      <ApplicantHeader />

      <div className="flex gap-6">
        <ApplicantSidebar />
        <ApplicantContent />
      </div>
    </div>
  );
}
