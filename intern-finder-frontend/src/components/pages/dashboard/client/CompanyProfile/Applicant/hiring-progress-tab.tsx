import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Plus } from "lucide-react";
import ReviewPopup from "./review-popup";
import { useState } from "react";

export function HiringProgressTab() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Current Stage</h2>
        <ReviewPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          userName="Jerome bell"
          userImage="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg"
        />
        <Button
          variant="none"
          className="text-primary border"
          onClick={() => setIsPopupOpen(true)}
        >
          Give Rating
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        <div className="relative flex">
          <div className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium h-15 min-w-50 flex items-center justify-center">
            In-Review
          </div>
          <div className="h-18 w-4 absolute -right-2 -top-1 bg-white rotate-15 z-10"></div>
        </div>
        <div className="relative flex">
          <div className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium h-15 min-w-50 flex items-center justify-center">
            Shortlisted
          </div>
          <div className="h-18 w-4 absolute -right-2 -top-1 bg-white rotate-15 z-10"></div>
        </div>
        <div className="relative flex">
          <div className="px-4 py-2 bg-primary text-white text-sm font-medium h-15 min-w-50 flex items-center justify-center">
            Interview
          </div>
          <div className="h-18 w-4 absolute -right-2 -top-1 bg-white rotate-15 z-10"></div>
        </div>
        <div className="relative flex">
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-light text-sm font-medium h-15 min-w-50 flex items-center justify-center">
            Hired / Declined
          </div>
        </div>
      </div>

      {/* Stage Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-dark mb-4">Stage Info</h3>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-light text-sm mb-1">Interview Date</p>
            <p className="text-dark font-medium">10 - 13 July 2021</p>
          </div>
          <div>
            <p className="text-light text-sm mb-1">Interview Status</p>
            <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-400 border-none px-3 py-1">
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
                <AvatarImage src="https://images.pexels.com/photos/3269779/pexels-photo-3269779.jpeg" />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="https://images.pexels.com/photos/33919661/pexels-photo-33919661.jpeg" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src="https://images.pexels.com/photos/33923623/pexels-photo-33923623.jpeg" />
                <AvatarFallback>TE</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <Button
          variant="none"
          className="border bg-gray-100 dark:bg-gray-800 text-light rounded-none"
        >
          Move To Next Step
        </Button>
      </div>

      {/* Notes Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-dark">Notes</h3>
          <Button variant="none" className="text-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Notes
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 p-4 bg-white border rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.pexels.com/photos/33923623/pexels-photo-33923623.jpeg" />
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
              <AvatarImage src="https://images.pexels.com/photos/33923623/pexels-photo-33923623.jpeg" />
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
