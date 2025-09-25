"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Grid3X3, List } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Celestin Gardinier",
    role: "CEO & Co-Founder",
    avatar: "/male-ceo-headshot.png",
  },
  {
    id: 2,
    name: "Reynaud Colbert",
    role: "Co-Founder",
    avatar: "/professional-headshot-male-cofounder.jpg",
  },
  {
    id: 3,
    name: "Arienne Lyon",
    role: "Managing Director",
    avatar: "/professional-headshot-female-director.jpg",
  },
  {
    id: 4,
    name: "Bernard Alexander",
    role: "Managing Director",
    avatar: "/professional-headshot-male-manager.jpg",
  },
  {
    id: 5,
    name: "Christine Jhonson",
    role: "Managing Director",
    avatar: "/professional-headshot-female-manager.jpg",
  },
  {
    id: 6,
    name: "Aaron Morgan",
    role: "Managing Director",
    avatar: "/male-director-headshot.png",
  },
];

export function TeamTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-dark mb-2">
            Basic Information
          </h2>
          <p className="text-light text-sm">Add team members of your company</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-dark font-medium">50 Members</span>
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
            className="bg-white border border-gray-200 rounded-lg p-6 text-center"
          >
            <Avatar className="w-16 h-16 mx-auto mb-4">
              <AvatarImage
                src={member.avatar || "/placeholder.svg"}
                alt={member.name}
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
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-white hover:bg-primary/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
}