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
            <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

            {/* Inner Ring - Secondary Color */}
            <div
              className="absolute top-1/2 left-1/2 w-10 h-10 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
                transform: "translate(-50%, -50%)",
              }}
            ></div>

            {/* Center Dot - Accent Color */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Loading Text */}
          <div className="mt-6 space-y-2">
            <h2 className="text-xl font-semibold text-primary">Loading</h2>
            <p className="text-primary animate-pulse">
              Please wait while we process your request...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (jobDetailError) {
    return <div>Error</div>;
  }

  if (!jobDetail) {
    return <div>Job not found</div>;
  }

  return (
    <section>
      {/* Hero */}
      <div className="bg-black h-60 mb-5">
        <Navbar />
        <div className="flex justify-center items-center font-extrabold text-white text-5xl mt-10">
          <h1>Job Details</h1>
        </div>
      </div>
      <section className="container mx-auto">
        {/* Job Detail */}
        <div className="space-y-4 mb-10">
          <JobCard job={jobDetail} />
        </div>
        <div className="flex gap-5">
          <div>
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="text-lg text-light mb-6">{jobDetail.description}</p>
            <h2 className="text-2xl font-semibold mb-3">
              Key Responsibilities
            </h2>
            <ul className="list-disc list-inside mb-6 text-lg text-light">
              {jobDetail.responsibilities
                .split("\n")
                .filter((item) => item.trim())
                .map((responsibility, index) => (
                  <li key={index}>{responsibility.trim()}</li>
                ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-3">Professional Skills</h2>
            <ul className="list-disc list-inside text-lg text-light mb-6">
              {jobDetail.professionalSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-3">Tags</h2>
            <div className="flex gap-5 my-6">
              {jobDetail.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-semibold mb-3">Share Job</h2>
            <div className="flex gap-10 mt-5 mb-15">
              <Image
                src={"/images/facebook-black-icon.png"}
                alt={"Facebook Icon"}
                width={35}
                height={35}
                className="cursor-pointer"
              />
              <Image
                src={"/images/X-black-icon.png"}
                alt={"X Icon"}
                width={35}
                height={35}
                className="cursor-pointer"
              />
              <Image
                src={"/images/LinkedIn-black-icon.png"}
                alt={"LinkedIn Icon"}
                width={35}
                height={35}
                className="cursor-pointer"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">Related Jobs</h1>
            <p className="text-lg text-light mb-6">
              Explore similar opportunities that match your interests and
              skills.
            </p>
            {/* Related Job Cards */}
            <div className="space-y-4 mb-30">
              {relatedJobsLoading && <div>Loading related jobs...</div>}
              {relatedJobsError && <div>Error loading related jobs</div>}
              {relatedJobs?.map((job, index) => (
                <RelatedJobCard key={index} job={job} />
              ))}
            </div>
          </div>
          {/* Sidebar */}
          <div className="space-y-6 min-w-70">
            {/* Job Overview */}
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle>Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-secondary">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Job Title</p>
                    <p className="text-sm text-light font-medium">
                      {jobDetail.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Job Type</p>
                    <p className="text-sm text-light font-medium">
                      {jobDetail.environmentType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Category</p>
                    <p className="text-sm text-light font-medium">
                      {jobDetail.categories.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Medal className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Experience</p>
                    <p className="text-sm text-light font-medium">
                      {jobDetail.minExperienceYears} Years
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Degree</p>
                    <p className="text-sm text-light font-medium">
                      {jobDetail.degree || "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Offered Salary</p>
                    <p className="text-sm text-light font-medium">
                      ${jobDetail.minSalary.toLocaleString()} - $
                      {jobDetail.maxSalary.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Location</p>
                    <p className="text-sm text-light font-medium">
                      {jobDetail.location}
                    </p>
                  </div>
                </div>
                <Image
                  src={"/images/Newyork_location.png"}
                  alt={"Location Image"}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Send Us Message */}
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle>Send Us Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center bg-text-white p-1 rounded-md">
                  <User className="w-5 h-5 text-light ml-2" />
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-3 py-1 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex items-center bg-text-white p-1 rounded-md">
                  <Mail className="w-5 h-5 text-light ml-2" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex items-center bg-text-white p-1 rounded-md">
                  <Phone className="w-5 h-5 text-light ml-2" />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-3 py-2 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex bg-text-white p-1 rounded-md">
                  <MessageSquare className="w-5 h-5 text-light ml-2 mt-3" />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-3 py-2 rounded-md focus:outline-none resize-none"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-teal-700">
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
