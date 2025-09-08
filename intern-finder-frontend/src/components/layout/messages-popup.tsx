"use client";

import { useState } from "react";
import { Dot, MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MessageItem {
  id: string;
  sender: {
    name: string;
    avatar: string;
    initials: string;
  };
  message: string;
  preview: string;
  timestamp: string;
  status: "unread" | "read";
}

const mockMessages: MessageItem[] = [
  {
    id: "1",
    sender: {
      name: "Sarah Johnson",
      avatar: "/professional-woman-smiling.png",
      initials: "SJ",
    },
    message: "Hey! Are you available for a quick call today?",
    preview: "I wanted to discuss the project timeline and see if we can...",
    timestamp: "5 mins ago",
    status: "unread",
  },
  {
    id: "2",
    sender: {
      name: "Mike Chen",
      avatar: "/professional-man-glasses.png",
      initials: "MC",
    },
    message: "Thanks for the interview feedback",
    preview: "I really appreciate the detailed feedback you provided...",
    timestamp: "2 hours ago",
    status: "unread",
  },
  {
    id: "3",
    sender: {
      name: "Emma Wilson",
      avatar: "/professional-woman-brown-hair.png",
      initials: "EW",
    },
    message: "Meeting rescheduled to tomorrow",
    preview: "Hi there! I need to reschedule our meeting from today to...",
    timestamp: "1 day ago",
    status: "read",
  },
  {
    id: "4",
    sender: {
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DR",
    },
    message: "Project proposal ready for review",
    preview: "The project proposal is now complete and ready for your...",
    timestamp: "2 days ago",
    status: "unread",
  },
];

export function MessagesPopup() {
  const [messages, setMessages] = useState<MessageItem[]>(mockMessages);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const markAllAsRead = () => {
    setMessages((prev) =>
      prev.map((message) => ({
        ...message,
        status: "read",
      }))
    );
  };

  const markAsRead = (messageId: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, status: "read" } : message
      )
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer hover:scale-120">
          <MessageSquare className="text-light" />
          {unreadCount > 0 && (
            <Dot className="absolute top-[-90%] left-[-10%] text-red-500 w-12 h-12" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 p-0 bg-white border border-gray-200 shadow-lg"
        sideOffset={8}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-dark">Messages</h3>
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
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer ${
                message.status === "unread" ? "bg-blue-50/30" : ""
              }`}
              onClick={() => markAsRead(message.id)}
            >
              <div className="flex gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage
                      src={message.sender.avatar || "/placeholder.svg"}
                      alt={message.sender.name}
                    />
                    <AvatarFallback className="bg-gray-200 text-dark text-sm">
                      {message.sender.initials}
                    </AvatarFallback>
                  </Avatar>
                  {message.status === "unread" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium ${
                            message.status === "unread"
                              ? "text-dark"
                              : "text-light"
                          }`}
                        >
                          {message.sender.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-light">
                            {message.timestamp}
                          </p>
                          {message.status === "unread" && (
                            <Badge className="border-yellow-500 text-yellow-500 text-xs px-4 py-1 rounded-2xl">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p
                        className={`text-sm mb-1 ${
                          message.status === "unread"
                            ? "text-dark font-medium"
                            : "text-light"
                        }`}
                      >
                        {message.message}
                      </p>

                      <p className="text-xs text-light line-clamp-2">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4 text-light" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-gray-100">
          <Button
            variant="none"
            className="w-full text-primary hover:text-primary/80 text-sm"
          >
            View all messages
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
