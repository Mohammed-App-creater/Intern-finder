import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JobListPagination() {
  return (
    <div className="flex items-center justify-between p-6 border-t">
      <div className="flex items-center gap-2 text-sm text-light">
        <span>View</span>
        <select className="border rounded px-2 py-1 text-dark">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span>Applicants per page</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="default"
          size="sm"
          className="h-8 w-8 p-0 bg-primary text-white"
        >
          1
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          2
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
