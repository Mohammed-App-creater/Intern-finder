"use client";

import { useState } from "react";
import {
  Search,
  SendHorizontal,
  MoreHorizontal,
  Star,
  Pin,
  Smile,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

interface Contact {
  id: string;
  name: string;
  title: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isOnline?: boolean;
}

interface Message {
  id: string;
  sender: "user" | "contact";
  avatar: string;
  content: string;
  time: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Jan Mayer",
    title: "Recruiter at Nomad",
    avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg",
    lastMessage: "We want to invite you for a qui...",
    time: "12 mins ago",
    isOnline: true,
  },
  {
    id: "2",
    name: "Joe Bartmann",
    title: "Developer",
    avatar:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "3",
    name: "Ally Wales",
    title: "Designer",
    avatar:
      "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "4",
    name: "James Gardner",
    title: "Manager",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "5",
    name: "Allison Geist",
    title: "HR Specialist",
    avatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "6",
    name: "Ruben Culhane",
    title: "Developer",
    avatar:
      "https://images.pexels.com/photos/33740369/pexels-photo-33740369.png",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "7",
    name: "Lydia Diaz",
    title: "Product Manager",
    avatar:
      "https://images.pexels.com/photos/3444087/pexels-photo-3444087.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "8",
    name: "James Dokidas",
    title: "Engineer",
    avatar:
      "https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "9",
    name: "Angelina Swann",
    title: "Designer",
    avatar:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "10",
    name: "Ally Wales",
    title: "Designer",
    avatar:
      "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
  {
    id: "11",
    name: "James Gardner",
    title: "Manager",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
  },
];

const messages: Message[] = [
  {
    id: "1",
    sender: "contact",
    avatar: "",
    content:
      "Hey Jake, I wanted to reach out because we saw your work contributions and were impressed by your work.",
    time: "12 mins ago",
  },
  {
    id: "2",
    sender: "contact",
    avatar: "",
    content: "We want to invite you for a quick interview",
    time: "12 mins ago",
  },
  {
    id: "3",
    sender: "user",
    avatar:
      "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg",
    content:
      "Hi Jan, sure I would love to. Thanks for taking the time to see my work!",
    time: "12 mins ago",
  },
  {
    id: "4",
    sender: "contact",
    avatar: "",
    content: "See you tomorrow morning!",
    time: "12 mins ago",
  },
  {
    id: "5",
    sender: "user",
    avatar:
      "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg",
    content: "Okay, Sir",
    time: "12 mins ago",
  },
];

export function MessagingInterface() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold text-dark mb-8 font-['Clash_Display']">
        Messages
      </h1>
      <div className="flex">
        {/* Left Sidebar - Messages List */}
        <div className="w-80 border-r border-t border-b border-border bg-card overflow-y-scroll h-3/4">
          <div className="flex items-center px-12 py-6 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light w-4 h-4" />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-secondary/50 border-border text-dark placeholder:text-light"
              />
            </div>
          </div>

          <div className="overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`flex items-center gap-3 p-4 hover:bg-secondary/50 cursor-pointer border-b border-border/50 ${
                  selectedContact.id === contact.id ? "bg-secondary" : ""
                }`}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-card"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-dark truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-light">{contact.time}</span>
                  </div>
                  <p className="text-sm text-light truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Main Area - Conversation */}
        <div className="flex-1 flex flex-col h-3/4">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-t border-border bg-card">
            <div className="flex items-center gap-3">
              <Avatar className="w-15 h-15">
                <AvatarImage
                  src={selectedContact.avatar || "/placeholder.svg"}
                  alt={selectedContact.name}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {selectedContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-dark">
                  {selectedContact.name}
                </h2>
                <p className="text-sm text-light">{selectedContact.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="none" className="text-light hover:text-dark">
                <Pin className="w-10 h-10" />
              </Button>
              <Button variant="none" className="text-light hover:text-dark">
                <Star className="w-10 h-10" />
              </Button>
              <Button variant="none" className="text-light hover:text-dark">
                <MoreHorizontal className="w-10 h-10" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-scroll">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 rounded-full px-4 py-2">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={selectedContact.avatar || "/placeholder.svg"}
                    alt={selectedContact.name}
                  />
                  <AvatarFallback className="bg-primary text-primary text-xs">
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-bold text-dark text-lg text-center">
                    {selectedContact.name}
                  </h1>
                  <p className="text-md text-light">{selectedContact.title}</p>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-light">
              This is the very beginning of your direct message with{" "}
              <span className="font-medium text-dark">
                {selectedContact.name}
              </span>
            </p>

            <div className="flex items-center gap-2 text-sm text-light">
              <div className="h-px bg-border flex-1"></div>
              <span className="px-2">Today</span>
              <div className="h-px bg-border flex-1"></div>
            </div>

            {/* /https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg" */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-xs ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.sender === "contact" && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={selectedContact.avatar || "/placeholder.svg"}
                        alt={selectedContact.name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {selectedContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={message.avatar || "/placeholder.svg"}
                        alt={selectedContact.name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {selectedContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col gap-2">
                    <div
                      className={`text-sm text-dark ${
                        message.sender === "user" ? "text-right" : ""
                      }`}
                    >
                      <span>
                        {message.sender === "user"
                          ? "You"
                          : selectedContact.name}
                      </span>
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-5 border-t border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Reply message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="pr-35 py-2 bg-secondary/50 border-border text-dark placeholder:text-light focus-visible:ring-0"
                />
                <Button
                  variant="none"
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 h-full w-15"
                >
                  <Smile className="text-light" />
                </Button>
                <Button className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-20 bg-primary hover:bg-primary/90 rounded-l-none">
                  <SendHorizontal />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
