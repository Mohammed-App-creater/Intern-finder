"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="min-h-screen mb-16 sm:mb-20 md:mb-30 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="container mx-auto px-0 py-12 sm:py-16 md:py-20 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-12">
            {/* Left side - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="h-80 sm:h-96 md:h-100 lg:h-125 w-full rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600">
                <Image
                  src="/images/office_collaboration.jpg"
                  alt="Professional workplace environment"
                  width={550}
                  height={550}
                  priority
                  className="w-full h-full object-cover blur-[2px] rounded-2xl"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 order-1 lg:order-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight">
                Good Life Begins With{" "}
                <span className="block">A Good Company</span>
              </h1>

              <p className="text-light text-base sm:text-lg leading-relaxed max-w-md">
                Launch your career with us. We offer meaningful work, expert
                mentorship, and a culture that fuels creativity. Develop your
                skills, build your network, and pave your path to success. Your
                future starts here.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Button
                  onClick={() => router.push("/jobs")}
                  className="bg-primary hover:bg-teal-700 text-white px-6 py-3 cursor-pointer w-full sm:w-auto"
                >
                  Search Job
                </Button>
                <Link
                  href="/about"
                  className="text-primary hover:text-teal-700 px-6 py-3 cursor-pointer text-center w-full sm:w-auto block"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="container mx-auto px-0 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-primary">
                12k+
              </h3>
              <h4 className="text-lg sm:text-xl font-semibold text-dark">
                Clients worldwide
              </h4>
              <p className="text-light text-sm">
                Partner with a global team. We leverage international expertise
                to provide cutting-edge solutions tailored to your market. Your
                success is our mission, everywhere.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-primary">
                20k+
              </h3>
              <h4 className="text-lg sm:text-xl font-semibold text-dark">
                Active resume
              </h4>
              <p className="text-light text-sm">
                Your career story, powerfully told. Build a resume that works as
                hard as you do. Highlight skills, track applications, and get
                hired faster. Your next opportunity is waiting.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-primary">
                18k+
              </h3>
              <h4 className="text-lg sm:text-xl font-semibold text-dark">
                Companies
              </h4>
              <p className="text-light text-sm">
                Grow your team with our curated network of top candidates. Post
                your internship or entry-level roles to directly access a
                diverse pool of motivated, next-generation talent ready to make
                an impact.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <div className="flex justify-center">
          <section className="relative w-full bg-black rounded-2xl overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2">
              <Image
                src="/images/workers.png"
                width={550}
                height={550}
                priority
                alt="Workers background"
                className="w-full h-full object-cover blur-sm"
              />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-15 py-12 sm:py-16 md:py-20 lg:py-24 bg-black/70 lg:bg-transparent rounded-2xl">
              <div className="max-w-2xl space-y-4 sm:space-y-5 md:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Create A Better{" "}
                  <span className="block">Future For Yourself</span>
                </h2>

                <p className="text-white text-base sm:text-lg leading-relaxed max-w-md">
                  Your next career move starts here. Explore thousands of
                  opportunities from top companies. Find a role that challenges
                  you, rewards your skills, and aligns with your ambitions.
                </p>

                <div className="pt-3 sm:pt-4">
                  <Button
                    onClick={() => router.push("/jobs")}
                    className="bg-primary hover:bg-teal-700 text-white px-6 py-3 cursor-pointer w-full sm:w-auto"
                  >
                    Search Job
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
