import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function DashboardGreeting() {
  return (
    <div className="font-['Clash_Display']">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-dark">Good morning, Jake</h2>
        <Button
          variant="outline"
          className="flex items-center gap-5 text-sm text-light"
        >
          <span>Jul 19 - Jul 25</span>
          <Calendar className="w-4 h-4 text-primary" />
        </Button>
      </div>
      <p className="text-light text-sm">
        Here is what&apos;s happening with your job search applications from
        July 19 - July 25.
      </p>
    </div>
  );
}
