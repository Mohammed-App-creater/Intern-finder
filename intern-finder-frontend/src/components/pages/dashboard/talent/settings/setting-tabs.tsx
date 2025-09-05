"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyProfileTab from "./my-profile"
import LoginDetailsTab from "./login-details"
import NotificationsTab from "./notifications"

export default function SettingTabs() {
  return (
    <div className="">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="profile"
            className="cursor-pointer text-light hover:text-primary/50 data-[state=active]:text-primary data-[state=active]:border-b-3 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-4 px-6"
          >
            My Profile
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="cursor-pointer text-light hover:text-primary/50 data-[state=active]:text-primary data-[state=active]:border-b-3 data-[state=active]:border-primary rounded-none py-4 px-6"
          >
            Login Details
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="cursor-pointer text-light hover:text-primary/50 data-[state=active]:text-primary data-[state=active]:border-b-3 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none py-4 px-6"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <div className="p-6">
          <TabsContent value="profile" className="mt-0">
            <MyProfileTab />
          </TabsContent>

          <TabsContent value="login" className="mt-0">
            <LoginDetailsTab />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <NotificationsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
