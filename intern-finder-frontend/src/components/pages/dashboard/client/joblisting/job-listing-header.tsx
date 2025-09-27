import { Calendar } from "lucide-react";

export function JobListingHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex items-center justify-between mb-2 font-['Clash_Display']">
        <h1 className="text-3xl font-semibold text-dark">Job Listing</h1>
        <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
          <span className="text-sm text-light">Jul 19 - Jul 25</span>
          <Calendar className="w-4 h-4 text-light" />
        </div>
      </div>
      <p className="text-light">
        Here is your jobs listing status from July 19 - July 25.
      </p>
    </div>
  );
}
