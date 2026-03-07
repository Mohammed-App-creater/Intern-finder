"use client";
import Adobe from "@/components/icons/adobe_logo_white.png";
import Asana from "@/components/icons/asana_logo_white.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Hero from "../../../../public/images/Hero.png";
import Linear from "@/components/icons/linear_logo_white.png";
import Navbar from "@/components/common/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Briefcase, Users, Building2 } from "lucide-react";
import Spotify from "@/components/icons/spotify_icon_white.png";
import Slack from "@/components/icons/slack_logo_white.png";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function HeroSection() {
  const { data: analyticsData } = useAnalytics();
  return (
    <>
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={Hero}
            alt="Background"
            fill
            priority
            className="object-cover"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-black/50"></div>{" "}
          {/* Overlay for better text visibility */}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* NavBar Section */}
          <Navbar />

          {/* Hero Section */}
          <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 mt-20 sm:mt-25 md:mt-30">
            <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                Find Your Dream Job Today!
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-10 md:mb-12 max-w-2xl px-4">
                Connecting Talent with Opportunity: Your Gateway to Career
                Success
              </p>

              {/* Search Form */}
              <div className="w-full max-w-4xl bg-white rounded-lg flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-5 p-3 md:p-0">
                <div className="w-full sm:flex-1">
                  <Input
                    placeholder="Job Title or Company"
                    className="w-full border-0 placeholder:text-base sm:placeholder:text-lg text-dark placeholder:text-light text-base sm:text-lg focus-visible:border-0 focus-visible:ring-0 h-12 sm:h-14"
                  />
                </div>

                <div className="w-full sm:w-auto sm:flex-1">
                  <Select>
                    <SelectTrigger className="w-full border-0 text-dark text-base sm:text-lg h-12 sm:h-14">
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="san-francisco">
                        San Francisco
                      </SelectItem>
                      <SelectItem value="london">London</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-auto sm:flex-1">
                  <Select>
                    <SelectTrigger className="w-full border-0 text-dark text-base sm:text-lg h-12 sm:h-14">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full sm:w-auto bg-primary hover:bg-teal-600 text-white text-base sm:text-lg h-12 sm:h-14 rounded-lg sm:rounded-none sm:rounded-r-lg cursor-pointer mt-2 sm:mt-0">
                  <Search className="w-4 h-4 mr-2" />
                  Search Job
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-12 my-16 sm:my-20 md:my-30">
              <div className="flex items-center gap-3 sm:gap-4 min-w-35">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {analyticsData?.jobCount || 0}
                  </div>
                  <div className="font-light text-white text-sm sm:text-base">
                    Jobs
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 min-w-35">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {analyticsData?.talentCount || 0}
                  </div>
                  <div className="font-light text-white text-sm sm:text-base pl-1">
                    Candidates
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 min-w-35">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {analyticsData?.companyCount || 0}
                  </div>
                  <div className="font-light text-white text-sm sm:text-base pl-1">
                    Companies
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Company Logos Footer */}
      <footer className="flex items-center bg-black h-16 sm:h-20 md:h-25">
        <div className="flex px-4 sm:px-8 md:px-25 justify-between w-full text-white overflow-x-auto">
          <div className="flex lg:justify-between space-x-6 md:space-x-8 min-w-max px-4 lg:px-12 w-full">
            <Image
              src={Spotify}
              alt="Spotify"
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain"
            />
            <Image
              src={Slack}
              alt="Slack"
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain"
            />
            <Image
              src={Adobe}
              alt="Adobe"
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain"
            />
            <Image
              src={Asana}
              alt="Asana"
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain"
            />
            <Image
              src={Linear}
              alt="Linear"
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
