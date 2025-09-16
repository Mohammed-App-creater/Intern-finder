import { Button } from "@/components/ui/button";
import { TeamMemberCard } from "./team-member-card";
import { Plus, Edit } from "lucide-react";
import { ArrowRight } from "lucide-react";

const teamMembers = [
  {
    name: "Celestin Gardinier",
    role: "CEO & Co-Founder",
    image: "https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg",
  },
  {
    name: "Reynaud Colbert",
    role: "Co-Founder",
    image:
      "https://images.pexels.com/photos/31517042/pexels-photo-31517042.jpeg",
  },
  {
    name: "Arienne Lyon",
    role: "Managing Director",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
  },
];

export function TeamSection() {
  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-dark text-2xl font-bold">Team</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="border h-8 w-8">
            <Plus className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="border h-8 w-8">
            <Edit className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>

      <Button variant="none" className="flex gap-2 text-primary font-bold">
        View all core teams
        <ArrowRight />
      </Button>
    </section>
  );
}
