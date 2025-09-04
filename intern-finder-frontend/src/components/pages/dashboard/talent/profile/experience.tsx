import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit } from "lucide-react";

const experiencesData = {
  experiences: [
    {
      id: 1,
      company: "Pinterest",
      title: "Product Designer",
      employmentType: "Full-time",
      duration: "Jun 2019 - Present (1y 1m)",
      location: "Manchester, UK",
      description:
        "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
      avatar: "https://cdn-icons-png.flaticon.com/128/5968/5968795.png",
    },
    {
      id: 2,
      company: "Discord",
      title: "Growth Marketing Designer",
      employmentType: "Full-time",
      duration: "Jun 2017 - May 2019 (2y)",
      location: "Manchester, UK",
      description:
        "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives.",
      avatar: "https://cdn-icons-png.flaticon.com/128/5968/5968756.png",
    },
  ],
};

export function Experiences() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-dark">
          Experiences
        </CardTitle>
        <Button variant="ghost" size="sm" className="border w-8 h-8">
          <Plus className="h-4 w-4 text-primary" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiencesData.experiences.map((experience) => (
          <div
            key={experience.id}
            className="flex gap-4 pb-5 not-last:border-b"
          >
            <Avatar className="h-20 w-20 flex-shrink-0 rounded-none">
              <AvatarImage src={experience.avatar} alt="Company Logo" />
              <AvatarFallback>Company Logo</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-dark">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-light">
                    <span className="text-dark">{experience.company}</span> •{" "}
                    {experience.employmentType} • {experience.duration}
                  </p>
                  <p className="text-sm text-light">{experience.location}</p>
                </div>
                <Button variant="ghost" size="icon" className="border h-8 w-8">
                  <Edit className="h-4 w-4 text-primary" />
                </Button>
              </div>

              <p className="text-sm text-dark font-light leading-relaxed">
                {experience.description}
              </p>
            </div>
          </div>
        ))}

        <Button
          variant="none"
          className="w-full text-primary hover:text-primary/80"
        >
          Show 4 more experiences
        </Button>
      </CardContent>
    </Card>
  );
}
