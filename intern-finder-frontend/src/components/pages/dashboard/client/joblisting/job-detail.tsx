import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { CircleCheckBig, Edit } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

interface JobPostingProps {
  applied: number;
  capacity: number;
}

export default function JobPosting({ applied, capacity }: JobPostingProps) {
  const percentage = (applied / capacity) * 100;

  return (
    <div className="min-h-screen p-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Image
              src={"https://cdn-icons-png.flaticon.com/128/9706/9706727.png"}
              alt=""
              width={40}
              height={40}
            />
            <h1 className="text-3xl font-bold text-dark">
              Social Media Assistant
            </h1>
          </div>
          <Button
            variant="none"
            className="text-primary border border-primary hover:bg-secondary bg-transparent"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Job Details
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">Description</h2>
              <p className="text-light leading-relaxed">
                Stripe is looking for Social Media Marketing expert to help
                manage our online networks. You will be responsible for
                monitoring our social media channels, creating content, finding
                effective ways to engage the community and incentivize others to
                engage on our channels.
              </p>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">
                Responsibilities
              </h2>
              <div className="space-y-3">
                {[
                  "Community engagement to ensure that is supported and actively represented online",
                  "Focus on social media content development and publication",
                  "Marketing and strategy support",
                  "Stay on top of trends on social media platforms, and suggest content ideas to the team",
                  "Engage with online communities",
                ].map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CircleCheckBig className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-light leading-relaxed">
                      {responsibility}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Who You Are */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">Who You Are</h2>
              <div className="space-y-3">
                {[
                  "You get energy from people and building the ideal work environment",
                  "You have a sense for beautiful spaces and office experiences",
                  "You are a confident office manager, ready for added responsibilities",
                  "You're detail-oriented and creative",
                  "You're a growth marketer and know how to run campaigns",
                ].map((trait, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CircleCheckBig className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-light leading-relaxed">{trait}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Nice-To-Haves */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">
                Nice-To-Haves
              </h2>
              <div className="space-y-3">
                {[
                  "Fluent in English",
                  "Project management skills",
                  "Copy editing skills",
                ].map((skill, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CircleCheckBig className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-light leading-relaxed">{skill}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About this role */}
            <div className="pb-10 border-b">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-dark mb-4">
                  About this role
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2 bg-secondary mb-3 p-3">
                    <p className="text-light text-sm">
                      <span className="font-semibold text-dark">5 applied</span>{" "}
                      of 10 capacity
                    </p>
                    <Progress value={percentage} className="h-2 rounded-none" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-light">Apply Before</span>
                      <span className="text-dark font-medium">
                        July 31, 2021
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light">Job Posted On</span>
                      <span className="text-dark font-medium">
                        July 1, 2021
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light">Job Type</span>
                      <span className="text-dark font-medium">Full-Time</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light">Salary</span>
                      <span className="text-dark font-medium">
                        $75k-$85k USD
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Categories */}
            <div className="pb-10 border-b">
              <h3 className="text-xl font-bold text-dark mb-4">Categories</h3>
              <div className="flex gap-2">
                <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-400">
                  Marketing
                </Badge>
                <Badge className="bg-secondary text-primary hover:bg-secondary/80">
                  Design
                </Badge>
              </div>
            </div>

            {/* Required Skills */}
            <div className="pt-4">
              <h3 className="text-xl font-bold text-dark mb-4">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-secondary text-primary hover:bg-secondary/80">
                  Project Management
                </Badge>
                <Badge className="bg-secondary text-primary hover:bg-secondary/80">
                  Copywriting
                </Badge>
                <Badge className="bg-secondary text-primary hover:bg-secondary/80">
                  English
                </Badge>
                <Badge className="bg-secondary text-primary hover:bg-secondary/80">
                  Social Media Marketing
                </Badge>
                <Badge className="bg-secondary text-primary hover:bg-secondary/80">
                  Copy Editing
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
