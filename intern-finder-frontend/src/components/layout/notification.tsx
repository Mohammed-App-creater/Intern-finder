"use client";

import { useState } from "react";
import { Bell, Calendar, Clock, Dot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface NotificationItem {
  id: string;
  type: "interview" | "application" | "general";
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  message: string;
  timestamp: string;
  status?: "new" | "shortlisted" | "read";
  details?: {
    position?: string;
    company?: string;
    date?: string;
    time?: string;
    email?: string;
  };
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "interview",
    user: {
      name: "Jan Mayer",
      avatar: "/professional-man-glasses.png",
      initials: "JM",
    },
    message: "invited you to interview with Nomad",
    timestamp: "12 mins ago",
    status: "new",
  },
  {
    id: "2",
    type: "application",
    user: {
      name: "Jana Alicia",
      avatar: "/professional-woman-smiling.png",
      initials: "JA",
    },
    message: "from Udacity updated your job applications status",
    timestamp: "3 days ago",
    status: "shortlisted",
  },
  {
    id: "3",
    type: "interview",
    user: {
      name: "Ally Wales",
      avatar: "/professional-woman-brown-hair.png",
      initials: "AW",
    },
    message: "from Digital Ocean sent you an interview invitation",
    timestamp: "14 July 2021 • 3:26 PM",
    details: {
      position: "Social Media Manager Role",
      company: "Digital Ocean",
      date: "Mon, 20 July 2021",
      time: "12 PM - 12:30 PM",
      email: "jakegyll@email.com",
    },
  },
];

export function NotificationPopup() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.status === "new").length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        status: notification.status === "new" ? "read" : notification.status,
      }))
    );
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="border-yellow-300 text-yellow-300 text-xs px-4 py-1 rounded-2xl">
            New
          </Badge>
        );
      case "shortlisted":
        return (
          <Badge className="border-primary/50 text-primary/50 text-xs px-4 py-1 rounded-2xl">
            Shortlisted
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer hover:scale-120">
          <Bell className="text-light" />
          {unreadCount > 0 && (
            <Dot className="absolute top-[-90%] left-[-30%] text-red-500 w-12 h-12" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-105 p-0 bg-white border border-gray-200 shadow-lg"
        sideOffset={8}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-dark">Notifications</h3>
            <Button
              variant="none"
              size="sm"
              onClick={markAllAsRead}
              className="text-primary hover:text-primary/80 text-sm"
            >
              Mark all as read
            </Button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage
                    src={notification.user.avatar || "/placeholder.svg"}
                    alt={notification.user.name}
                  />
                  <AvatarFallback className="bg-gray-200 text-dark text-sm">
                    {notification.user.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm text-dark">
                      <span className="font-medium">
                        {notification.user.name}
                      </span>{" "}
                      <span className="text-light">{notification.message}</span>
                    </p>
                  </div>
                  {getStatusBadge(notification.status)}
                  <p className="text-xs text-light mb-2">
                    {notification.timestamp}
                  </p>

                  {notification.details && (
                    <div className="bg-gray-50 p-3 mt-2 border-l-6 border-purple-500">
                      <h4 className="font-medium text-dark text-sm mb-2">
                        Interview - Jake Gyll
                      </h4>
                      <p className="text-light text-sm mb-3">
                        {notification.details.position}
                      </p>

                      <div className="flex flex-col gap-2 space-y-2">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-light" />
                            <div className="flex flex-col gap-1">
                              <span className="text-light">Date</span>
                              <span className="text-dark font-medium">
                                {notification.details.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-light" />
                            <div className="flex flex-col gap-1">
                              <span className="text-light">Time</span>
                              <span className="text-dark font-medium">
                                {notification.details.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-purple-600" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-dark font-medium text-sm">
                              Jake Gyll
                            </p>
                            <p className="text-light text-xs">
                              {notification.details.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
