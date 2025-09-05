import { AboutMe } from "@/components/pages/dashboard/talent/profile/about-me";
import { AdditionalDetails } from "@/components/pages/dashboard/talent/profile/additional-details";
import { Educations } from "@/components/pages/dashboard/talent/profile/education";
import { Experiences } from "@/components/pages/dashboard/talent/profile/experience";
import { ProfileHeader } from "@/components/pages/dashboard/talent/profile/profile-header";
import { SocialLinks } from "@/components/pages/dashboard/talent/profile/social-links";
import Skills from "@/components/pages/dashboard/talent/profile/skills";

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-8 mt-2">
      <h1 className="text-3xl font-bold text-dark font-['Clash_Display'] mb-10">
        My Profile
      </h1>
      <div className="space-y-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <ProfileHeader />
            <AboutMe />
            <Experiences />
            <Educations />
            <Skills />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AdditionalDetails />
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
