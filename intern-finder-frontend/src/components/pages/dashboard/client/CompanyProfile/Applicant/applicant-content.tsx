"use client";

import { useState } from "react";
import { PersonalInfo } from "./personal-info";
import { ProfessionalInfo } from "./professional-info";
import { ResumeTab } from "./resume-tab";
import { HiringProgressTab } from "./hiring-progress-tab";
import { InterviewScheduleTab } from "./interview-schedule-tab";
import { ApplicantTabs } from "./applicant-tabs";

export function ApplicantContent() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <PersonalInfo />
            <ProfessionalInfo />
          </div>
        );
      case "resume":
        return <ResumeTab />;
      case "progress":
        return <HiringProgressTab />;
      case "interview":
        return <InterviewScheduleTab />;
      default:
        return (
          <div className="space-y-8">
            <PersonalInfo />
            <ProfessionalInfo />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 p-3 border shadow-sm">
      <ApplicantTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="p-6">{renderTabContent()}</div>
    </div>
  );
}
