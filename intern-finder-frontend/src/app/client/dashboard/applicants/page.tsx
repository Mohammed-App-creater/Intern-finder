import { ApplicantManagement } from "@/components/common/application-management";

export default function AllApplicants() {
  return (
    <div className="min-h-screen px-6 pt-2">
      <ApplicantManagement activeTab={"applicants"} />
    </div>
  );
}
