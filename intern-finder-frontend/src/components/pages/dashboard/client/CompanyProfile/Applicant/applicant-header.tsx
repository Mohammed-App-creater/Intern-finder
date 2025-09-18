'use client';

import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function ApplicantHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between py-3 mb-5">
      <div className="flex items-center gap-2 font-['Clash_Display']">
        <Button variant="none" className="text-dark" onClick={ () => router.push('/client/dashboard/applicants')}>
          <ArrowLeft className="h-8 w-8" />
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
            <ChevronDown className="h-4 w-4" />
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
