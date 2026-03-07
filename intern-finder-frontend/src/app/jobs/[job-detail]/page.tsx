"use client";

import Image from "next/image";
import JobCard from "@/components/pages/jobs/apply-card";
import RelatedJobCard from "@/components/common/job-card";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Medal,
  MessageSquare,
  Phone,
  User,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJobDetail, useRelatedJobs } from "@/hooks/useJob";
import { useParams } from "next/navigation";

export default function JobDetail() {
  const params = useParams();
  const jobId = params["job-detail"] as string;

  const {
    data: jobDetail,
    isLoading: jobDetailLoading,
    isError: jobDetailError,
  } = useJobDetail(jobId);
  const {
    data: relatedJobs,
    isLoading: relatedJobsLoading,
    isError: relatedJobsError,
  } = useRelatedJobs();

  if (jobDetailLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="text-center">
          {/* Main Spinner */}
          <div className="relative inline-block">
            {/* Outer Ring - Primary Color */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

            {/* Inner Ring - Secondary Color */}
            <div
              className="absolute top-1/2 left-1/2 w-8 h-8 sm:w-10 sm:h-10 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
                transform: "translate(-50%, -50%)",
              }}
            ></div>

            {/* Center Dot - Accent Color */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Loading Text */}
          <div className="mt-4 sm:mt-6 space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold text-primary">
              Loading
            </h2>
            <p className="text-primary animate-pulse text-sm sm:text-base">
              Please wait while we process your request...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (jobDetailError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Error Loading Job</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!jobDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Job Not Found</h2>
          <p>The job you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <section>
      {/* Hero */}
      <div className="bg-black h-40 sm:h-50 md:h-60 mb-5">
        <Navbar />
        <div className="flex justify-center items-center font-extrabold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 sm:mt-8 md:mt-10 px-4">
          <h1 className="text-center">Job Details</h1>
        </div>
      </div>

      <section className="container mx-auto px-4 sm:px-6">
        {/* Job Detail */}
        <div className="space-y-4 mb-8 sm:mb-10">
          <JobCard job={jobDetail} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Job Description
            </h2>
            <p className="text-base sm:text-lg text-light mb-4 sm:mb-6 leading-relaxed">
              {jobDetail.description}
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
              Key Responsibilities
            </h2>
            <ul className="list-disc list-inside mb-4 sm:mb-6 text-base sm:text-lg text-light space-y-2">
              {jobDetail.responsibilities
                .split("\n")
                .filter((item) => item.trim())
                .map((responsibility, index) => (
                  <li key={index} className="leading-relaxed">
                    {responsibility.trim()}
                  </li>
                ))}
            </ul>

            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
              Professional Skills
            </h2>
            <ul className="list-disc list-inside text-base sm:text-lg text-light mb-4 sm:mb-6 space-y-2">
              {jobDetail.professionalSkills.map((skill, index) => (
                <li key={index} className="leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>

            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 my-4 sm:my-6">
              {jobDetail.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-secondary text-primary font-bold text-xs sm:text-sm px-3 py-1 sm:px-3 sm:py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
              Share Job
            </h2>
            <div className="flex gap-4 sm:gap-6 md:gap-8 mt-3 sm:mt-4 mb-8 sm:mb-12">
              <Image
                src={"/images/facebook-black-icon.png"}
                alt={"Facebook Icon"}
                width={30}
                height={30}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer hover:scale-110 transition-transform"
              />
              <Image
                src={"/images/X-black-icon.png"}
                alt={"X Icon"}
                width={30}
                height={30}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer hover:scale-110 transition-transform"
              />
              <Image
                src={"/images/LinkedIn-black-icon.png"}
                alt={"LinkedIn Icon"}
                width={30}
                height={30}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Related Jobs
            </h1>
            <p className="text-base sm:text-lg text-light mb-4 sm:mb-6">
              Explore similar opportunities that match your interests and
              skills.
            </p>

            {/* Related Job Cards */}
            <div className="space-y-3 sm:space-y-4 mb-16 sm:mb-20 md:mb-30">
              {relatedJobsLoading && (
                <div className="text-center py-4 text-light">
                  Loading related jobs...
                </div>
              )}
              {relatedJobsError && (
                <div className="text-center py-4 text-red-600">
                  Error loading related jobs
                </div>
              )}
              {relatedJobs?.map((job, index) => (
                <RelatedJobCard key={index} job={job} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:min-w-80 xl:min-w-96 space-y-4 sm:space-y-6">
            {/* Job Overview */}
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Job Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 bg-secondary">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-dark text-sm sm:text-base">Job Title</p>
                    <p className="text-xs sm:text-sm text-light font-medium truncate">
                      {jobDetail.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-dark text-sm sm:text-base">Job Type</p>
                    <p className="text-xs sm:text-sm text-light font-medium truncate">
                      {jobDetail.environmentType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-dark text-sm sm:text-base">Category</p>
                    <p className="text-xs sm:text-sm text-light font-medium truncate">
                      {jobDetail.categories.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-dark text-sm sm:text-base">Experience</p>
                    <p className="text-xs sm:text-sm text-light font-medium">
                      {jobDetail.minExperienceYears} Years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-dark text-sm sm:text-base">Degree</p>
                    <p className="text-xs sm:text-sm text-light font-medium">
                      {jobDetail.degree || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-dark text-sm sm:text-base">
                      Offered Salary
                    </p>
                    <p className="text-xs sm:text-sm text-light font-medium">
                      ${jobDetail.minSalary.toLocaleString()} - $
                      {jobDetail.maxSalary.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-dark text-sm sm:text-base">Location</p>
                    <p className="text-xs sm:text-sm text-light font-medium truncate">
                      {jobDetail.location}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Image
                    src={"/images/Newyork_location.png"}
                    alt={"Location Image"}
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Send Us Message */}
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Send Us Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center bg-white p-2 rounded-md">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-light ml-1 sm:ml-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md focus:outline-none text-sm sm:text-base"
                  />
                </div>

                <div className="flex items-center bg-white p-2 rounded-md">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-light ml-1 sm:ml-2 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md focus:outline-none text-sm sm:text-base"
                  />
                </div>

                <div className="flex items-center bg-white p-2 rounded-md">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-light ml-1 sm:ml-2 flex-shrink-0" />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md focus:outline-none text-sm sm:text-base"
                  />
                </div>

                <div className="flex bg-white p-2 rounded-md">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-light ml-1 sm:ml-2 mt-2 sm:mt-3 flex-shrink-0" />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded-md focus:outline-none resize-none text-sm sm:text-base"
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-teal-700 text-sm sm:text-base py-2 sm:py-3">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
}
