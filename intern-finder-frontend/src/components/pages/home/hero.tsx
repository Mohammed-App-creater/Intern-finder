"use client"
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
          <main className="container mx-auto px-4 py-16 mt-30">
            <div className="flex flex-col items-center text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Find Your Dream Job Today!
              </h1>
              <p className="text-xl text-white mb-12">
                Connecting Talent with Opportunity: Your Gateway to Career
                Success
              </p>

              {/* Search Form */}
              <div className="max-w-fit bg-white rounded-lg flex flex-col md:flex-row items-center gap-5 mt-5 pl-2">
                <Input
                  placeholder="Job Title or Company"
                  className="w-50 border-0 placeholder:text-lg text-dark placeholder:text-light text-lg focus-visible:border-0 focus-visible:ring-0"
                />
                <Select>
                  <SelectTrigger className="w-full md:w-45 border-0 text-dark text-lg">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-47 border-0 text-dark text-lg">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-primary hover:bg-teal-600 text-white text-lg h-15 rounded-none rounded-r-lg cursor-pointer">
                  <Search className="w-4 h-4 mr-2" />
                  Search Job
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 my-30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {analyticsData?.jobCount || 0}
                  </div>
                  <div className="font-light text-white">
                    Jobs
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {analyticsData?.talentCount || 0}
                  </div>
                  <div className="font-light text-white pl-1">
                    Candidates
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {analyticsData?.companyCount || 0}
                  </div>
                  <div className="font-light text-white pl-1">
                    Companies
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Company Logos Footer */}
      <footer className="flex items-center bg-black h-25">
          <div className="flex px-25 justify-between w-full text-white">
            <Image src={Spotify} alt="Spotify" width={150} height={150} />
            <Image src={Slack} alt="Spotify" width={150} height={150} />
            <Image src={Adobe} alt="Spotify" width={150} height={150} />
            <Image src={Asana} alt="Spotify" width={150} height={150} />
            <Image src={Linear} alt="Spotify" width={150} height={150} />
          </div>
      </footer>
    </>
  );
}
