'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="min-h-screen mb-30 w-7xl">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24 w-7xl">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="h-125 w-125 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600">
                <Image
                  src="/images/professional-office-environment-with-blurred-backg.png"
                  alt="Professional workplace environment"
                  width={550}
                  height={550}
                  priority
                  className="w-full h-full object-cover blur-[2px] rounded-2xl"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-dark)] leading-tight">
                Good Life Begins With{" "}
                <span className="block">A Good Company</span>
              </h1>

              <p className="text-[var(--text-light)] text-lg leading-relaxed max-w-md">
                Launch your career with us. We offer meaningful work, expert
                mentorship, and a culture that fuels creativity. Develop your
                skills, build your network, and pave your path to success. Your
                future starts here.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                onClick={() => router.push('/jobs')}
                className="bg-[var(--primary)] hover:bg-teal-700 text-[var(--text-white)] px-6 py-3 cursor-pointer">
                  Search Job
                </Button>
                <Link
                  href="/about"
                  className="text-[var(--primary)] hover:text-teal-700 px-6 py-3 cursor-pointer"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-[var(--primary)]">12k+</h3>
              <h4 className="text-xl font-semibold text-[var(--text-dark)]">
                Clients worldwide
              </h4>
              <p className="text-[var(--text-light)] text-sm">
                Partner with a global team. We leverage international expertise
                to provide cutting-edge solutions tailored to your market. Your
                success is our mission, everywhere.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-[var(--primary)]">20k+</h3>
              <h4 className="text-xl font-semibold text-[var(--text-dark)]">
                Active resume
              </h4>
              <p className="text-[var(--text-light)] text-sm">
                Your career story, powerfully told. Build a resume that works as
                hard as you do. Highlight skills, track applications, and get
                hired faster. Your next opportunity is waiting.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-[var(--primary)]">18k+</h3>
              <h4 className="text-xl font-semibold text-[var(--text-dark)]">
                Companies
              </h4>
              <p className="text-[var(--text-light)] text-sm">
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
          <section className="relative w-full max-w-[1500px] bg-black rounded-2xl">
            <div className="absolute top-17 right-[-50] bottom-0">
              <Image
                src="/images/workers.png"
                width={550}
                height={550}
                priority
                alt="Workers background"
                className="w-210 h-115 object-cover blur-sm"
              />
            </div>

            <div className="relative container mx-auto px-15 py-24">
              <div className="max-w-2xl space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-[var(--text-white)] leading-tight">
                  Create A Better{" "}
                  <span className="block">Future For Yourself</span>
                </h2>

                <p className="text-[var(--text-white)] text-lg leading-relaxed max-w-md">
                  Your next career move starts here. Explore thousands of
                  opportunities from top companies. Find a role that challenges
                  you, rewards your skills, and aligns with your ambitions.
                </p>

                <div className="pt-4">
                  <Button 
                  onClick={() => router.push('/jobs')}
                  className="bg-[var(--primary)] hover:bg-teal-700 text-[var(--text-white)] px-6 py-3 cursor-pointer">
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
