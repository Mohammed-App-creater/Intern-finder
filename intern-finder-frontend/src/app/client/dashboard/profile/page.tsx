import { CompanyHeader } from "@/components/pages/dashboard/client/CompanyProfile/company-header";
import { CompanyProfile } from "@/components/pages/dashboard/client/CompanyProfile/company-profile";
import { ContactSection } from "@/components/pages/dashboard/client/CompanyProfile/contact-section";
import { Gallery } from "@/components/pages/dashboard/client/CompanyProfile/gallery";
import { OfficeLocations } from "@/components/pages/dashboard/client/CompanyProfile/office-location";
import { TechStack } from "@/components/pages/dashboard/client/CompanyProfile/tech-stack";

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen">
      <CompanyHeader />
      <CompanyProfile />
      <TechStack />
      <ContactSection />
      <OfficeLocations />
      <Gallery />
    </div>
  );
}
