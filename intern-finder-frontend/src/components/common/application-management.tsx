"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Added import
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarRating } from "./star-rating";
import { StatusBadge } from "./status-badge";

const applicants = [
  {
    id: 1,
    name: "Jake Gyll",
    avatar: "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg",
    score: 0.0,
    stage: "Interview" as const,
    appliedDate: "13 July, 2021",
    jobRole: "Designer",
  },
  {
    id: 2,
    name: "Guy Hawkins",
    avatar:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
    score: 0.0,
    stage: "Interview" as const,
    appliedDate: "13 July, 2021",
    jobRole: "JavaScript Dev",
  },
  {
    id: 3,
    name: "Cyndy Lillibridge",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    score: 4.5,
    stage: "Shortlisted" as const,
    appliedDate: "12 July, 2021",
    jobRole: "Golang Dev",
  },
  {
    id: 4,
    name: "Rodolfo Goode",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    score: 3.75,
    stage: "Declined" as const,
    appliedDate: "11 July, 2021",
    jobRole: "NET Dev",
  },
  {
    id: 5,
    name: "Leif Floyd",
    avatar:
      "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg",
    score: 4.8,
    stage: "Hired" as const,
    appliedDate: "11 July, 2021",
    jobRole: "Graphic Design",
  },
  {
    id: 6,
    name: "Jenny Wilson",
    avatar: "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg",
    score: 4.6,
    stage: "Hired" as const,
    appliedDate: "9 July, 2021",
    jobRole: "Designer",
  },
  {
    id: 7,
    name: "Jerome Bell",
    avatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    score: 4.0,
    stage: "Interviewed" as const,
    appliedDate: "5 July, 2021",
    jobRole: "Designer",
  },
  {
    id: 8,
    name: "Eleanor Pena",
    avatar:
      "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
    score: 3.9,
    stage: "Declined" as const,
    appliedDate: "5 July, 2021",
    jobRole: "Designer",
  },
  {
    id: 9,
    name: "Darrell Steward",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    score: 4.2,
    stage: "Shortlisted" as const,
    appliedDate: "3 July, 2021",
    jobRole: "Designer",
  },
  {
    id: 10,
    name: "Floyd Miles",
    avatar:
      "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg",
    score: 4.1,
    stage: "Interviewed" as const,
    appliedDate: "1 July, 2021",
    jobRole: "Designer",
  },
];

export function ApplicantManagement() {
  const router = useRouter(); // Initialize router
  const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<"pipeline" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab] = useState<"applicants" | "job-details">("applicants");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplicants(applicants.map((a) => a.id));
    } else {
      setSelectedApplicants([]);
    }
  };

  const handleSelectApplicant = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedApplicants([...selectedApplicants, id]);
    } else {
      setSelectedApplicants(selectedApplicants.filter((aid) => aid !== id));
    }
  };

  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.jobRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getApplicantsByStage = () => {
    const stages = {
      "In Review": filteredApplicants.filter(
        (a) => a.stage === "Interview" && a.score === 0
      ),
      Interview: filteredApplicants.filter(
        (a) => a.stage === "Interview" && a.score > 0
      ),
      Hired: filteredApplicants.filter((a) => a.stage === "Hired"),
      Declined: filteredApplicants.filter((a) => a.stage === "Declined"),
    };
    return stages;
  };

  const stageColors = {
    "In Review": "border-orange-200 bg-orange-50",
    Interview: "border-blue-200 bg-blue-50",
    Hired: "border-green-200 bg-green-50",
    Declined: "border-red-200 bg-red-50",
  };

  const stageHeaderColors = {
    "In Review": "bg-orange-500",
    Interview: "bg-blue-500",
    Hired: "bg-green-500",
    Declined: "bg-red-500",
  };

  const renderPipelineView = () => {
    const stageData = getApplicantsByStage();

    return (
      <div className="p-6">
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(stageData).map(([stage, applicants]) => (
            <div
              key={stage}
              className={`rounded-lg border-2 ${
                stageColors[stage as keyof typeof stageColors]
              } min-h-[600px]`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      stageHeaderColors[stage as keyof typeof stageHeaderColors]
                    }`}
                  ></div>
                  <span className="text-dark font-medium">{stage}</span>
                  <span className="text-light">{applicants.length}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Add Applicant</DropdownMenuItem>
                    <DropdownMenuItem>Sort by Score</DropdownMenuItem>
                    <DropdownMenuItem>Sort by Date</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Applicant Cards */}
              <div className="p-4 space-y-4">
                {applicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={applicant.avatar || "/placeholder.svg"}
                          alt={applicant.name}
                          width={40}
                          height={40}
                        />
                        <AvatarFallback>
                          {applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-dark font-medium">
                          {applicant.name}
                        </h3>
                        <button className="text-primary text-sm hover:underline">
                          View Profile
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-light text-sm">Applied on</span>
                        <span className="text-light text-sm">Score</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-dark text-sm">
                          {applicant.appliedDate}
                        </span>
                        <div className="flex items-center gap-1">
                          <StarRating rating={applicant.score} size="sm" />
                          <span className="text-dark text-sm">
                            {applicant.score.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-sm">
      {/* Content based on active tab */}
      {activeTab === "applicants" && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between py-6">
            <h2 className="text-dark text-2xl font-semibold font-['Clash_Display']">
              Total Applicants: {filteredApplicants.length}
            </h2>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light w-4 h-4" />
                <Input
                  placeholder="Search Applicants"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 h-12"
                />
              </div>

              {/* Filter */}
              <Button
                variant="outline"
                className="text-light bg-transparent h-12"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>

              {/* View Toggle */}
              <div className="flex items-center border">
                <Button
                  variant="none"
                  size="sm"
                  onClick={() => setCurrentView("pipeline")}
                  className={
                    currentView === "pipeline"
                      ? "bg-secondary text-primary rounded-none h-12"
                      : "text-primary h-12"
                  }
                >
                  Pipeline View
                </Button>
                <Button
                  variant="none"
                  size="sm"
                  onClick={() => setCurrentView("table")}
                  className={
                    currentView === "table"
                      ? "bg-secondary text-primary rounded-none  h-12"
                      : "text-primary h-12"
                  }
                >
                  Table View
                </Button>
              </div>
            </div>
          </div>

          {currentView === "pipeline" ? (
            renderPipelineView()
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border">
                    <tr>
                      <th className="text-left p-4 w-12">
                        <Checkbox
                          checked={
                            selectedApplicants.length === applicants.length
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4 text-light font-medium">
                        Full Name
                      </th>
                      <th className="text-left p-4 text-light font-medium">
                        Score
                      </th>
                      <th className="text-left p-4 text-light font-medium">
                        Hiring Stage
                      </th>
                      <th className="text-left p-4 text-light font-medium">
                        Applied Date
                      </th>
                      <th className="text-left p-4 text-light font-medium">
                        Job Role
                      </th>
                      <th className="text-center p-4 text-light font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border mt-2">
                    {filteredApplicants.map((applicant) => (
                      <tr key={applicant.id}>
                        <td className="mt-2 p-4">
                          <Checkbox
                            checked={selectedApplicants.includes(applicant.id)}
                            onCheckedChange={(checked) =>
                              handleSelectApplicant(
                                applicant.id,
                                checked as boolean
                              )
                            }
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={applicant.avatar || "/placeholder.svg"}
                                alt={applicant.name}
                              />
                              <AvatarFallback>
                                {applicant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-dark font-medium">
                              {applicant.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <StarRating rating={applicant.score} />
                            <span className="text-dark font-medium">
                              {applicant.score.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={applicant.stage} />
                        </td>
                        <td className="p-4">
                          <span className="text-light">
                            {applicant.appliedDate}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-dark">{applicant.jobRole}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-between pr-10">
                            <Button
                              variant="none"
                              size="sm"
                              className="text-primary border-primary bg-secondary rounded-sm p-5"
                              onClick={() => router.push(`/client/dashboard/applicants/${applicant.id}`)}
                            >
                              See Application
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="none" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Schedule Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <span className="text-light">View</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => setItemsPerPage(Number(value))}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-light">Applicants per page</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-primary text-white"
                  >
                    {currentPage}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Placeholder for job details tab */}
      {activeTab === "job-details" && (
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-dark text-lg font-medium mb-2">Job Details</h3>
            <p className="text-light">Job details content would go here.</p>
          </div>
        </div>
      )}
    </div>
  );
}
