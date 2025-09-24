import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, Edit3 } from "lucide-react";

export function InterviewScheduleTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Interview List</h2>
        <Button variant="none" className="text-primary font-semibold">
          <Plus className="w-4 h-4 mr-1" />
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
                  <AvatarImage
                    width={40}
                    height={40}
                    src="https://images.pexels.com/photos/33919080/pexels-photo-33919080.jpeg"
                  />
                  <AvatarFallback>KM</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-dark">Kathryn Murphy</h4>
                  <p className="text-light text-sm">Written Test</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-dark">10:00 AM - 11:30 AM</p>
                <p className="text-light text-sm">Silver Crysta Room, Nomad</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="none"
                  className="text-primary border bg-transparent"
                >
                  <Edit3 className="mr-2" />
                  Add Feedback
                </Button>
                <Button variant="none" size="sm">
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
                  <AvatarImage
                    width={40}
                    height={40}
                    src="https://images.pexels.com/photos/33527117/pexels-photo-33527117.jpeg"
                  />
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-dark">Jenny Wilson</h4>
                  <p className="text-light text-sm">Written Test 2</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-dark">10:00 AM - 11:00 AM</p>
                <p className="text-light text-sm">Silver Crysta Room, Nomad</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="none"
                  className="text-primary border bg-transparent"
                >
                  <Edit3 className="mr-2" />
                  Add Feedback
                </Button>
                <Button variant="none" size="sm">
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
                  <AvatarImage
                    width={40}
                    height={40}
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                  />
                  <AvatarFallback>TE</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-dark">Thad Eddings</h4>
                  <p className="text-light text-sm">Skill Test</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-dark">10:00 AM - 11:00 AM</p>
                <p className="text-light text-sm">Silver Crysta Room, Nomad</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="none"
                  className="text-primary border bg-transparent"
                >
                  <Edit3 className="mr-2" />
                  Add Feedback
                </Button>
                <Button variant="none" size="sm">
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
                  <AvatarImage
                    width={40}
                    height={40}
                    src="https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg"
                  />
                  <AvatarFallback>TE</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-dark">Ruth khan</h4>
                  <p className="text-light text-sm">Final Test</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-dark">10:00 AM - 11:00 AM</p>
                <p className="text-light text-sm">Silver Crysta Room, Nomad</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="none"
                  className="text-primary border bg-transparent"
                >
                  <Edit3 className="mr-2" />
                  Add Feedback
                </Button>
                <Button variant="none" size="sm">
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
