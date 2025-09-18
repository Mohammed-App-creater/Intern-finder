import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ApplicantHeader() {
  return (
    <div className="flex items-center justify-between py-3 mb-5">
      <div className="flex items-center gap-4 font-['Clash_Display']">
        <Button variant="ghost" size="icon" className="text-dark">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-dark">Applicant Details</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="none"
            className="text-primary border"
          >
            More Action
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Send Message</DropdownMenuItem>
          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
          <DropdownMenuItem>Download Resume</DropdownMenuItem>
          <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
