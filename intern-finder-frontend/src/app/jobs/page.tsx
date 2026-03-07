"use client";
import Footer from "@/components/common/footer";
import JobCard from "@/components/common/job-card";
import Navbar from "@/components/common/navbar";
import CompanyCards from "@/components/pages/jobs/company-card";
import Filter from "@/components/pages/jobs/filter";
import { Button } from "@/components/ui/button";
import { useJobListings } from "@/hooks/useJob";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobFilterStore } from "@/store/useJobFilterStore";
import { useState } from "react";
import { Filter as FilterIcon, X } from "lucide-react";

export default function Jobs() {
  const filters = useJobFilterStore((s) => s.filters);
  const { data: jobs, isLoading, isError } = useJobListings(filters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (isError) {
    return <div>Error loading jobs.</div>;
  }

  return (
    <section>
      {/* Hero */}
      <div className="bg-black h-40 sm:h-50 md:h-60 mb-5">
        <Navbar />
        <div className="flex justify-center items-center font-extrabold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 sm:mt-8 md:mt-10 px-4">
          <h1 className="text-center">Jobs</h1>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden px-4 mb-4">
        <Button
          onClick={() => setIsFilterOpen(true)}
          className="w-full flex gap-2 items-center justify-center bg-primary hover:bg-teal-600 text-white"
        >
          <FilterIcon className="w-4 h-4" />
          Show Filters
        </Button>
      </div>

      <div className="max-w-[1700px] flex flex-col md:flex-row gap-6 lg:gap-10 xl:gap-20 mx-auto p-4 sm:p-5">
        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
            <div className="absolute top-0 left-0 h-full w-80 bg-white overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <Filter />
                <Button
                  className="w-full mt-4 bg-primary hover:bg-teal-600 text-white"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block md:w-80 lg:w-70">
          <Filter />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-2 sm:px-4 md:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6">
            <p className="text-light text-sm sm:text-base">
              Showing {jobs?.length || 0} of {jobs?.length || 0} results
            </p>
            <Select defaultValue="latest">
              <SelectTrigger className="w-full sm:w-40 cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Sort by latest</SelectItem>
                <SelectItem value="salary">Sort by salary</SelectItem>
                <SelectItem value="relevance">Sort by relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Listings */}
          {jobs && jobs.length === 0 && (
            <div className="text-center py-8 text-light">No jobs found.</div>
          )}
          {jobs && jobs.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="text-center py-8 text-light">No jobs found.</div>
          )}

          {/* Pagination */}
          <section className="flex justify-center md:justify-end my-8 sm:my-10">
            <div className="flex justify-between items-center gap-4 sm:gap-6 md:gap-10 lg:gap-145">
              <div className="flex gap-3 sm:gap-4 md:gap-5 items-center">
                <Button className="h-8 sm:h-9 md:h-10 font-extrabold text-sm sm:text-base px-3 sm:px-4">
                  1
                </Button>
                <Button
                  className="h-8 sm:h-9 md:h-10 border-1 border-text-light font-extrabold text-light hover:bg-secondary hover:text-light cursor-pointer text-sm sm:text-base px-3 sm:px-4"
                  variant="outline"
                >
                  2
                </Button>
              </div>
              <Button
                className="flex gap-2 sm:gap-3 h-8 sm:h-9 md:h-10 border-1 border-text-light font-extrabold text-light hover:bg-secondary hover:text-light cursor-pointer text-sm sm:text-base px-3 sm:px-4"
                variant="outline"
              >
                <span>Next</span>
                <span className="text-sm sm:text-base md:text-lg">&gt;</span>
              </Button>
            </div>
          </section>
        </div>
      </div>
      <CompanyCards />
      <Footer />
    </section>
  );
}
