"use client";

import { useState } from "react";
import { ApplicantManagement } from "@/components/common/application-mamgement";
import ApplicationTableHeader from "@/components/common/application-table-header";

export default function JobDetailPage() {
  const [activeTab, setActiveTab] = useState<"applicants" | "job-details">(
    "applicants"
  );
  return (
    <div className="p-6">
      <ApplicationTableHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ApplicantManagement />
    </div>
  );
}