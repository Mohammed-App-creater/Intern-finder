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
          className="flex items-center gap-5 text-sm text-light"
        >
          <span>{formatRange(new Date(), "week")}</span>
          <Calendar className="w-4 h-4 text-primary" />
        </Button>
      </div>
      <p className="text-light text-sm">
        Here is what&apos;s happening with your job search applications from {formatRange(new Date(), "week")}.
      </p>
    </div>
  );
}
