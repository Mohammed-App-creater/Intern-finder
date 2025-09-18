import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export function HiringProgressTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Current Stage</h2>
        <Button
          variant="outline"
          className="text-primary border-primary bg-transparent"
        >
          Give Rating
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
            In-Review
          </div>
        </div>
        <div className="w-8 h-0.5 bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
            Shortlisted
          </div>
        </div>
        <div className="w-8 h-0.5 bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
            Interview
          </div>
        </div>
        <div className="w-8 h-0.5 bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-gray-100 text-light rounded-lg text-sm font-medium">
            Hired / Declined
          </div>
        </div>
      </div>

      {/* Stage Info */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-dark mb-4">Stage Info</h3>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-light text-sm mb-1">Interview Date</p>
            <p className="text-dark font-medium">10 - 13 July 2021</p>
          </div>
          <div>
            <p className="text-light text-sm mb-1">Interview Status</p>
            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
              On Progress
            </Badge>
          </div>
          <div>
            <p className="text-light text-sm mb-1">Interview Location</p>
            <p className="text-dark font-medium">
              Silver Crysta Room, Nomad Office
            </p>
            <p className="text-light text-sm">3517 W. Gray St. Utica,</p>
            <p className="text-light text-sm">Pennsylvania 57867</p>
          </div>
          <div>
            <p className="text-light text-sm mb-1">Assigned to</p>
            <div className="flex -space-x-2">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/professional-headshot.png" />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/professional-headshot.png" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="/professional-headshot.png" />
                <AvatarFallback>TE</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <Button className="bg-gray-200 text-light hover:bg-gray-300">
          Move To Next Step
        </Button>
      </div>

      {/* Notes Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-dark">Notes</h3>
          <Button variant="ghost" className="text-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Notes
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 p-4 bg-white border rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/professional-headshot.png" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-dark">Maria Kelly</span>
                <span className="text-light text-sm">
                  10 July, 2021 • 11:30 AM
                </span>
              </div>
              <p className="text-dark text-sm mb-2">
                Please, do an interview stage immediately. The design division
                needs more new employee now
              </p>
              <button className="text-primary text-sm font-medium">
                2 Replies
              </button>
            </div>
          </div>

          <div className="flex gap-3 p-4 bg-white border rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/professional-headshot.png" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-dark">Maria Kelly</span>
                <span className="text-light text-sm">
                  10 July, 2021 • 10:30 AM
                </span>
              </div>
              <p className="text-dark text-sm">
                Please, do an interview stage immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
