import Image from "next/image";
import Navbar from "@/components/common/navbar";
import { HowItWorks } from "@/components/pages/about/how-it-works";
import FAQ from "@/components/pages/about/FAQ";
import { Award, CircleStar, Star, Medal } from "lucide-react";
import VideoPreview from "@/components/pages/about/video-preview";
import Footer from "@/components/common/footer";

export default function About() {
  return (
    <section>
      {/* Hero */}
      <div className="bg-black h-60 mb-5">
        <Navbar />
        <div className="flex justify-center items-center font-extrabold text-white text-5xl mt-10">
          <h1>About Us</h1>
        </div>
      </div>
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
              <div>
                <h2 className="text-7xl font-bold text-dark mb-4">
                  Our Mission & Vision
                </h2>
              </div>
              <div>
                <p className="text-dark text-lg leading-relaxed mb-4">
                  We are dedicated to connecting talented students with
                  innovative companies through our comprehensive internship
                  platform. Our mission is to bridge the gap between academic
                  learning and professional experience, making career
                  opportunities accessible to everyone.
                </p>
                <p className="text-dark text-lg leading-relaxed">
                  Founded by career professionals and tech enthusiasts, we
                  understand the challenges students face in finding meaningful
                  internships. Our platform streamlines the entire process from
                  discovery to application, helping launch successful careers.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Image
                src="images/About_Us.png"
                alt="Students collaborating in a modern workspace"
                width={250}
                height={250}
                className="w-full h-full max-h-150 object-cover rounded-2xl drop-shadow-gray-950 blur-[2px]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* How it Works */}
      <HowItWorks />
      {/* Video Preview Section */}
      <VideoPreview />
      {/* FAQ Section */}
      <FAQ />
      {/* Working With The Best Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Images Grid */}
            <div className="flex gap-4 h-full w-full min-h-150">
              <div className="h-full w-full space-y-4">
                <Image
                  src={
                    "https://knowledge.wharton.upenn.edu/wp-content/uploads/2022/11/11.16.22-dollars-change-employee-owned-companies-GettyImages-1132823844-900x612.jpg"
                  }
                  alt={"Workers Image"}
                  width={250}
                  height={500}
                  className="h-full w-full rounded-lg"
                />
              </div>
              <div className="h-full w-full flex flex-col space-y-4">
                <Image
                  src={
                    "https://knowledge.wharton.upenn.edu/wp-content/uploads/2022/11/11.16.22-dollars-change-employee-owned-companies-GettyImages-1132823844-900x612.jpg"
                  }
                  alt={"Workers Image"}
                  width={250}
                  height={500}
                  className="rounded-lg h-[65%]"
                />
                <Image
                  src={
                    "https://knowledge.wharton.upenn.edu/wp-content/uploads/2022/11/11.16.22-dollars-change-employee-owned-companies-GettyImages-1132823844-900x612.jpg"
                  }
                  alt={"Workers Image"}
                  width={250}
                  height={500}
                  className="rounded-lg h-[35%]"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-5xl font-bold text-dark mb-6">
                We&apos;re Only Working
                <br />
                With The Best
              </h2>
              <p className="text-dark text-lg mb-10">
                Choose your ideal career at one of our top-tier partner
                companies that offer exceptional opportunities for professional
                growth and development.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-5">
                  <CircleStar className="w-10 h-10 text-primary font-light stroke-1" />
                  <span className="text-dark font-bold text-xl">
                    Quality Job
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <Medal className="w-10 h-10 text-primary stroke-1" />
                  <span className="text-dark font-bold text-xl">
                    Resume Builder
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <Star className="w-10 h-10 text-primary stroke-1" />
                  <span className="text-dark font-bold text-xl">
                    Top Companies
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <Award className="w-10 h-10 text-primary stroke-1" />
                  <span className="text-dark font-bold text-xl">
                    Top Talents
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
}
