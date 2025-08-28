import JobCard from "@/components/common/job-card";
import Navbar from "@/components/common/navbar";
import Filter from "@/components/pages/jobs/filter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Jobs() {
  const jobsData = [
    {
      timeAgo: "10 min ago",
      title: "Forward Security Director",
      company: "Reach, Schrage and Schmitt Co",
      logo: "/images/Logo_1.png",
      industry: "Hotels & Tourism",
      employmentType: "Full time",
      salary: "$40000-$45000",
      location: "New York, USA",
    },
    {
      timeAgo: "25 min ago",
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc",
      logo: "/images/Logo_2.png",
      industry: "Software Development",
      employmentType: "Full time",
      salary: "$75000-$90000",
      location: "San Francisco, USA",
    },
    {
      timeAgo: "1 hour ago",
      title: "Marketing Manager",
      company: "Global Marketing Solutions",
      logo: "/images/Logo_3.png",
      industry: "Marketing & Advertising",
      employmentType: "Full time",
      salary: "$60000-$70000",
      location: "Chicago, USA",
    },
    {
      timeAgo: "2 hours ago",
      title: "Data Analyst",
      company: "Data Insights Ltd",
      logo: "/images/Logo_4.png",
      industry: "Data Science",
      employmentType: "Part time",
      salary: "$45000-$55000",
      location: "Austin, USA",
    },
    {
      timeAgo: "3 hours ago",
      title: "UX/UI Designer",
      company: "Creative Design Studio",
      logo: "/images/Logo_5.png",
      industry: "Design",
      employmentType: "Contract",
      salary: "$50000-$65000",
      location: "Los Angeles, USA",
    },
    {
      timeAgo: "10 min ago",
      title: "Forward Security Director",
      company: "Reach, Schrage and Schmitt Co",
      logo: "/images/Logo_1.png",
      industry: "Hotels & Tourism",
      employmentType: "Full time",
      salary: "$40000-$45000",
      location: "New York, USA",
    },
    {
      timeAgo: "25 min ago",
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc",
      logo: "/images/Logo_2.png",
      industry: "Software Development",
      employmentType: "Full time",
      salary: "$75000-$90000",
      location: "San Francisco, USA",
    },
    {
      timeAgo: "1 hour ago",
      title: "Marketing Manager",
      company: "Global Marketing Solutions",
      logo: "/images/Logo_3.png",
      industry: "Marketing & Advertising",
      employmentType: "Full time",
      salary: "$60000-$70000",
      location: "Chicago, USA",
    },
  ];

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
              <SelectTrigger className="w-40">
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
          <div className="space-y-4">
            {jobsData.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
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
    </section>
  );
}
