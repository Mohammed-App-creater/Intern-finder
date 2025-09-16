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

export default function Jobs() {
  const filters = useJobFilterStore((s) => s.filters);
  const { data: jobs, isLoading, isError } = useJobListings(filters);


  if (isError) {
    return <div>Error loading jobs.</div>;
  }

  return (
    <section>
      {/* Hero */}
      <div className="bg-black h-60 mb-5">
        <Navbar />
        <div className="flex justify-center items-center font-extrabold text-white text-5xl mt-10">
          <h1>Jobs</h1>
        </div>
      </div>
      <div className="max-w-[1700px] flex gap-20 mx-auto p-5">
        {/* Sidebar */}
        <Filter />
        <div className="flex-1 px-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-light">Showing 6-6 of 10 results</p>
            <Select defaultValue="latest">
              <SelectTrigger className="w-40 cursor-pointer">
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
          { jobs && jobs.length === 0 && <div>No jobs found.</div> }
          {
            (jobs && jobs.length > 0) ?
            (<div className="space-y-4">
              {jobs?.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>) : isLoading ? (
              <div>Loading...</div>
            ) : (<div>No jobs found.</div>)
          }
          {/* pagination */}
          <section className="flex justify-end my-10">
            <div className="flex md:gap-145 sm:gap-45">
              <div className="flex justify-center gap-5 items-center mb-10 cursor-pointer">
                <Button className="h-10 font-extrabold">1</Button>
                <Button
                  className="h-10 border-1 border-text-light font-extrabold text-light hover:bg-secondary hover:text-light cursor-pointer"
                  variant="outline"
                >
                  2
                </Button>
              </div>
              <Button
                className="flex gap-3 h-10 border-1 border-text-light font-extrabold text-light hover:bg-secondary hover:text-light cursor-pointer"
                variant="outline"
              >
                <span>Next</span>
                <span className="text-lg">&gt;</span>
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
