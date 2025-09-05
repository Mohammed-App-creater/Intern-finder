import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

const skills = [
  "Communication",
  "Analytics",
  "Facebook Ads",
  "Content Planning",
  "Community Manager",
];

export default function Skills() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-xl font-semibold text-dark">Skills</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="border w-8 h-8">
            <Plus className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="border h-8 w-8">
            <Edit className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-primary border border-green-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
