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
    <div className="min-h-screen px-2">
      <CompanyHeader />
      <div className="flex gap-3">
        <div className="max-w-5xl">
          <CompanyProfile />
          <ContactSection />
          <Gallery />
          <TeamSection />
          <OpenPositionsSection />
        </div>
        <div>
          <TechStack />
          <OfficeLocations />
        </div>
      </div>
    </div>
  );
}
