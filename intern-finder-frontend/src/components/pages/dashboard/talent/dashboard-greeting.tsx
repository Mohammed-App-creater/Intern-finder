"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { formatRange } from "@/lib/utils"

export function DashboardGreeting() {
  const user = useAuthStore().user;
  const name = user?.role == "TALENT" ? user?.fullName : user?.companyName
  return (
    <div className="font-['Clash_Display']">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-dark">Good morning{", "+ name }</h2>
        <Button
          variant="outline"
          className="flex items-center gap-2 sm:gap-5 text-xs sm:text-sm text-light px-2 sm:px-4"
        >
          <span className="md:hidden">{formatRange(new Date(), "week", true)}</span>
          <span className="hidden md:inline">{formatRange(new Date(), "week")}</span>
          <Calendar className="w-4 h-4 text-primary" />
        </Button>
      </div>
      <p className="text-light text-sm">
        Here is what&apos;s happening with your job search applications from{" "}
        <span className="md:hidden">{formatRange(new Date(), "week", true)}</span>
        <span className="hidden md:inline">{formatRange(new Date(), "week")}</span>.
      </p>
    </div>
  );
}
