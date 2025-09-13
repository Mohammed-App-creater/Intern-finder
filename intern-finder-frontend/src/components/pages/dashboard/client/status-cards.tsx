import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const statsData = [
  {
    number: "76",
    title: "New candidates to",
    subtitle: "review",
    bgColor: "bg-blue-800",
  },
  {
    number: "4",
    title: "Jobs you Posted",
    subtitle: "",
    bgColor: "bg-primary",
  },
  {
    number: "24",
    title: "Messages received",
    subtitle: "",
    bgColor: "bg-blue-500",
  },
];

export function StatusCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className={`${stat.bgColor} text-white p-6 border-0 rounded-none`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-5">
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-lg font-bold opacity-90">
                  {stat.title}
                  {stat.subtitle && <div>{stat.subtitle}</div>}
                </div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
        </Card>
      ))}
    </div>
  );
}
