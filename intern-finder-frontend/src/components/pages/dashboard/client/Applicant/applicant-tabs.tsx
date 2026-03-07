"use client";

const tabs = [
  { id: "profile", label: "Applicant Profile", active: true },
  { id: "resume", label: "Resume", active: false },
  { id: "progress", label: "Hiring Progress", active: false },
  { id: "interview", label: "Interview Schedule", active: false },
];

interface ApplicantTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ApplicantTabs({ activeTab, onTabChange }: ApplicantTabsProps) {
  return (
    <div className="px-4 sm:px-6">
      <div className="flex gap-4 sm:gap-8 border-b overflow-x-auto pb-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-light hover:text-dark"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
