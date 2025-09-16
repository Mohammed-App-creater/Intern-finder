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
import { useRelatedJobs } from "@/hooks/useJob";

export default function JobDetail() {
  const { data, isLoading, isError } = useRelatedJobs();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
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
        {/* Job Listings */}
        <div className="space-y-4 mb-10">
          {data?.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
        <div className="flex gap-5">
          <div>
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="text-lg text-light mb-6">
              We are looking for a Forward Security Director with 5+ years of
              security management experience and expertise in risk assessment,
              crisis response, and team leadership. The ideal candidate will
              have a strong background in both physical and information
              security, proficiency with tools like SIEM, access control
              systems, and knowledge of frameworks such as NIST. Relevant
              certifications (e.g., CISSP, CPP) are highly desirable.
            </p>
            <h2 className="text-2xl font-semibold mb-3">
              Key Responsibilities
            </h2>
            <ul className="list-disc list-inside mb-6 text-lg text-light">
              <li>Develop and implement security policies and procedures.</li>
              <li>Conduct risk assessments and vulnerability analyses.</li>
              <li>Manage security personnel and oversee training programs.</li>
              <li>Coordinate with law enforcement and emergency services.</li>
              <li>Monitor security systems and respond to incidents.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-3">Professional Skills</h2>
            <ul className="list-disc list-inside text-lg text-light mb-6">
              <li>
                Bachelor&apos;s degree in Criminal Justice, Security Management,
                or related field.
              </li>
              <li>Minimum of 7 years of experience in security management.</li>
              <li>Strong leadership and communication skills.</li>
              <li>Ability to work under pressure and make quick decisions.</li>
              <li>
                Knowledge of current security technologies and best practices.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-3">Tags</h2>
            <div className="flex gap-5 my-6">
              <span className="inline-block bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-full mr-2 mb-2">
                Full time
              </span>
              <span className="inline-block bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-full mr-2 mb-2">
                Remote
              </span>
              <span className="inline-block bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-full mr-2 mb-2">
                Senior Level
              </span>
              <span className="inline-block bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-full mr-2 mb-2">
                Security
              </span>
              <span className="inline-block bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-full mr-2 mb-2">
                Technology
              </span>
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
              {data?.map((job, index) => (
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
                      Forward Security Director
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Job Type</p>
                    <p className="text-sm text-light font-medium">Full Time</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Category</p>
                    <p className="text-sm text-light font-medium">Technology</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Medal className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Experience</p>
                    <p className="text-sm text-light font-medium">5 Years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Degree</p>
                    <p className="text-sm text-light font-medium">
                      Bachelor&apos;s
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Offered Salary</p>
                    <p className="text-sm text-light font-medium">
                      $80k - $120k
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-dark">Location</p>
                    <p className="text-sm text-light font-medium">
                      New York, USA
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
