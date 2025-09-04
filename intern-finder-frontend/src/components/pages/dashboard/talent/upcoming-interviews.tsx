import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function UpcomingInterviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dark mb-5">
          Upcoming Interviews
        </CardTitle>
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg text-dark">
            <span className="font-bold">Today,</span> 26 November
          </p>
          <div className="flex items-end gap-1">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="text-md text-light w-25">10:00 AM</div>
            <div className="border-1 border-text-light/20 w-full h-0.5"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-md text-light w-25">10:30 AM</div>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg w-full">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s" alt="Profile Picture" />
                <AvatarFallback className="bg-blue-500 text-white">
                  SB
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-dark">Sophiya Bartmann</p>
                <p className="text-sm text-light">HR Manager at Divvy</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-md text-light w-25">11:00 AM</div>
            <div className="border-1 border-text-light/20 w-full h-0.5"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
