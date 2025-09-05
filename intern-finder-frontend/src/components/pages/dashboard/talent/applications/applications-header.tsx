import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function ApplicationsHeader() {
  return (
    <div className="mb-8 font-['Clash_Display']">
      <h1 className="text-3xl font-bold text-dark mb-8">My Applications</h1>
      <div className="flex items-center justify-between pr-10">
        <div>
          <h2 className="text-xl font-bold text-dark">Keep it up, Jake</h2>
          <p className="text-sm text-light">
            Here&apos;s job applications status from July 19 - July 25.
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-5 text-sm text-light"
        >
          <span>Jul 19 - Jul 25</span>
          <Calendar className="w-4 h-4 text-primary" />
        </Button>
      </div>
    </div>
  );
}
