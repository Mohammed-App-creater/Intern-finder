import { CompanyHeader } from "@/components/pages/dashboard/client/CompanyProfile/company-header";
import { CompanyProfile } from "@/components/pages/dashboard/client/CompanyProfile/company-profile";
import { ContactSection } from "@/components/pages/dashboard/client/CompanyProfile/contact-section";
import { Gallery } from "@/components/pages/dashboard/client/CompanyProfile/gallery";
import { OfficeLocations } from "@/components/pages/dashboard/client/CompanyProfile/office-location";
import { TechStack } from "@/components/pages/dashboard/client/CompanyProfile/tech-stack";
import { TeamSection } from "@/components/pages/dashboard/client/CompanyProfile/team-section";
import { OpenPositionsSection } from "@/components/pages/dashboard/client/CompanyProfile/open-positions-section";

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen px-4 md:px-6 mt-5">
      <CompanyHeader />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 max-w-full lg:max-w-5xl">
          <CompanyProfile />
          <ContactSection />
          <Gallery />
          <TeamSection />
          <OpenPositionsSection />
        </div>
        <div className="w-full lg:w-auto space-y-6">
          <TechStack />
          <OfficeLocations />
        </div>
      </div>
    </div>
  );
}
