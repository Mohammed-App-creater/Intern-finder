import { Button } from "@/components/ui/button";
import { ArrowRight, Edit, Plus } from "lucide-react";
import Image from "next/image";

export function TechStack() {
  const technologies = [
    {
      name: "HTML 5",
      logo: "https://cdn-icons-png.flaticon.com/128/1051/1051277.png",
      textColor: "text-light",
      icon: "HTML 5",
    },
    {
      name: "CSS 3",
      logo: "https://cdn-icons-png.flaticon.com/128/5968/5968242.png",
      textColor: "text-light",
      icon: "CSS 3",
    },
    {
      name: "JavaScript",
      logo: "https://cdn-icons-png.flaticon.com/128/5968/5968292.png",
      textColor: "text-light",
      icon: "JavaScript",
    }, // Changed from yellow-500 to yellow-600 for better contrast
    {
      name: "Ruby",
      logo: "https://cdn-icons-png.flaticon.com/128/6132/6132219.png",
      textColor: "text-light",
      icon: "Ruby",
    }, // Changed from purple to red for Ruby
    {
      name: "Python",
      logo: "https://cdn-icons-png.flaticon.com/128/5968/5968350.png",
      textColor: "text-light",
      icon: "Python",
    }, // Made darker for better contrast
    {
      name: "Framer",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgkxcoSejBYKyvkvWZOrlSYjAqHB_71jTwQ--7DNo7A&s",
      textColor: "text-light",
      icon: "Framer",
    }, // Changed from black to gray-900
  ];

  return (
    <div className="p-6 border-b">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark">TechStack</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Plus className="h-4 w-4 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Edit className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 hover:shadow-sm transition-shadow"
            >
              <Image
                src={tech.logo}
                alt="Tech Logo"
                width={500}
                height={500}
                className="w-25 h-25 flex items-center justify-center mb-2"
              />
              <span className="text-sm text-light font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        <Button
          variant="none"
          className="flex gap-2 text-primary"
        >
          View tech stack
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
