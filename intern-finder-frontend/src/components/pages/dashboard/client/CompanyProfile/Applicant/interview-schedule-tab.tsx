import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MoreHorizontal } from "lucide-react";

export function InterviewScheduleTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Interview List</h2>
        <Button className="bg-primary text-white hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Schedule Interview
        </Button>
      </div>

      {/* Interview List */}
      <div className="space-y-6">
        {/* Tomorrow */}
        <div>
          <h3 className="text-light text-sm mb-4">Tomorrow • 10 July, 2021</h3>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback>KM</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-dark">Kathryn Murphy</h4>
                  <p className="text-light text-sm">Written Test</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-dark">10:00 AM - 11:30 AM</p>
                <p className="text-light text-sm">Silver Crysta Room, Nomad</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="text-primary border-primary bg-transparent"
                >
                  Add Feedback
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 11 July, 2021 */}
        <div>
          <h3 className="text-light text-sm mb-4">11 July, 2021</h3>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-dark">Jenny Wilson</h4>
                  <p className="text-light text-sm">Written Test 2</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-dark">10:00 AM - 11:00 AM</p>
                <p className="text-light text-sm">Silver Crysta Room, Nomad</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="text-primary border-primary bg-transparent"
                >
                  Add Feedback
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 12 July, 2021 */}
        <div>
          <h3 className="text-light text-sm mb-4">12 July, 2021</h3>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback>TE</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-dark">Thad Eddings</h4>
                  <p className="text-light text-sm">Skill Test</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-dark">10:00 AM - 11:00 AM</p>
                <p className="text-light text-sm">Silver Crysta Room, Nomad</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="text-primary border-primary bg-transparent"
                >
                  Add Feedback
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 13 July, 2021 */}
        <div>
          <h3 className="text-light text-sm mb-4">13 July, 2021</h3>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback>TE</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-dark">Thad Eddings</h4>
                  <p className="text-light text-sm">Final Test</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-dark">10:00 AM - 11:00 AM</p>
                <p className="text-light text-sm">Silver Crysta Room, Nomad</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="text-primary border-primary bg-transparent"
                >
                  Add Feedback
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
