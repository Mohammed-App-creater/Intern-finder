"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ApplicationTableHeaderProps {
  activeTab: "applicants" | "job-details";
  setActiveTab: (tab: "applicants" | "job-details") => void;
}

export default function ApplicationTableHeader({
  activeTab,
  setActiveTab,
}: ApplicationTableHeaderProps) {
  const router = useRouter();

  return (
    <>
      {/* Job Header */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="none"
            className="text-light"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-dark text-xl font-semibold">
              Social Media Assistant
            </h1>
            <p className="text-light text-sm">
              Design • Full-Time • 4 / 11 Hired
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="none" className="text-primary border">
              More Action
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit Job</DropdownMenuItem>
            <DropdownMenuItem>Share Job</DropdownMenuItem>
            <DropdownMenuItem>Archive Job</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("applicants")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === "applicants"
                ? "border-primary text-primary"
                : "border-transparent text-light hover:text-dark"
            }`}
          >
            Applicants
          </button>
          <button
            onClick={() => setActiveTab("job-details")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === "job-details"
                ? "border-primary text-primary"
                : "border-transparent text-light hover:text-dark"
            }`}
          >
            Job Details
          </button>
        </div>
      </div>
    </>
  );
}
