"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Grid3X3, List, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  {
    id: 1,
    name: "Celestin Gardinier",
    role: "CEO & Co-Founder",
    avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg",
  },
  {
    id: 2,
    name: "Reynaud Colbert",
    role: "Co-Founder",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  },
  {
    id: 3,
    name: "Arienne Lyon",
    role: "Managing Director",
    avatar: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg",
  },
  {
    id: 4,
    name: "Bernard Alexander",
    role: "Managing Director",
    avatar: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg",
  },
  {
    id: 5,
    name: "Christine Jhonson",
    role: "Managing Director",
    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
  },
  {
    id: 6,
    name: "Aaron Morgan",
    role: "Managing Director",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
  },
];

export function TeamTab() {
  return (
    <div className="grid grid-cols-[450px_1fr]">
      {/* Header */}
      <div className="max-w-xs">
        <h2 className="text-lg font-medium text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm">Add team members of your company</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between w-full">
          <span className="text-dark font-bold text-lg">50 Members</span>
          <div className="flex justify-between gap-10">
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Members
            </Button>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border rounded-lg p-6 text-center"
            >
              <Avatar className="w-16 h-16 mx-auto mb-4">
                <AvatarImage
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  width={40}
                  height={40}
                />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <h3 className="text-dark font-medium mb-1">{member.name}</h3>
              <p className="text-light text-sm mb-4">{member.role}</p>

              <div className="flex justify-center gap-2">
                <Link href={"#"} className="w-8 h-8 p-0">
                  <Instagram className="w-4 h-4 text-light" />
                </Link>
                <Link href={"#"} className="w-8 h-8 p-0">
                  <Linkedin className="w-4 h-4 text-light" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-2">
          <Button className="bg-primary text-white hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
