import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit } from "lucide-react";

const educationsData = {
  educations: [
    {
      id: 1,
      industry: "Harvard University",
      degree: "Postgraduate degree, Applied Psychology",
      year: "2010 - 2012",
      description:
        "As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.",
      avatar:
        "https://t3.ftcdn.net/jpg/14/95/58/38/240_F_1495583892_l2er3HFYN7FIYm2aoi3gfJ9irM92WmNK.jpg",
    },
    {
      id: 2,
      industry: "University of Toronto",
      degree: "Bachelor of Arts, Visual Communication",
      year: "2005 - 2009",
      description: "",
      avatar:
        "https://t4.ftcdn.net/jpg/04/91/76/63/240_F_491766317_JFhuYKA9vH06HheaGItt7cGL7hdwZBap.jpg",
    },
  ],
};

export function Educations() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-dark">
          Educations
        </CardTitle>
        <Button variant="ghost" size="sm" className="border w-8 h-8">
          <Plus className="h-4 w-4 text-primary" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {educationsData.educations.map((experience) => (
          <div
            key={experience.id}
            className="flex gap-4 pb-5 not-last:border-b"
          >
            <Avatar className="h-20 w-20 flex-shrink-0 rounded-none">
              <AvatarImage src={experience.avatar} alt="Industry Logo" />
              <AvatarFallback>Industry Logo</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-dark">
                    {experience.industry}
                  </h3>
                  <p className="text-sm text-light">{experience.degree}</p>
                  <p className="text-sm text-light">{experience.year}</p>
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
          Show 4 more educations
        </Button>
      </CardContent>
    </Card>
  );
}
