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
      <section className="pb-50 pt-25 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Images Grid */}
            <div className="flex gap-4 h-full w-full min-h-150">
              <div className="h-full w-full space-y-4">
                <Image
                  src={
                    "https://images.pexels.com/photos/2078774/pexels-photo-2078774.jpeg"
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
                    "https://images.pexels.com/photos/5231332/pexels-photo-5231332.jpeg"
                  }
                  alt={"Workers Image"}
                  width={250}
                  height={500}
                  className="rounded-lg h-[65%]"
                />
                <Image
                  src={
                    "data:image/jpeg;base64,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"
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
