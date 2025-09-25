"use client";
import { OverviewTab } from "@/components/pages/dashboard/client/settings/overview-tab";
import { SocialLinksTab } from "@/components/pages/dashboard/client/settings/social-links-tab";
import { TeamTab } from "@/components/pages/dashboard/client/settings/team-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-6 mt-2">
      <h1 className="text-2xl font-semibold text-dark mb-8 font-['Clash_Display']">Settings</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger
            value="overview"
            className="text-light data-[state=active]:text-dark data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="social-links"
            className="text-light data-[state=active]:text-dark data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Social Links
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="text-light data-[state=active]:text-dark data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="social-links">
          <SocialLinksTab />
        </TabsContent>

        <TabsContent value="team">
          <TeamTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
