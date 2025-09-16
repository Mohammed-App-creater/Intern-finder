import { Button } from "@/components/ui/button";

export function TechStack() {
  const technologies = [
    {
      name: "HTML 5",
      color: "bg-orange-600",
      textColor: "text-white",
      icon: "HTML 5",
    },
    {
      name: "CSS 3",
      color: "bg-blue-600",
      textColor: "text-white",
      icon: "CSS 3",
    },
    {
      name: "JavaScript",
      color: "bg-yellow-600",
      textColor: "text-white",
      icon: "JavaScript",
    }, // Changed from yellow-500 to yellow-600 for better contrast
    {
      name: "Ruby",
      color: "bg-red-600",
      textColor: "text-white",
      icon: "Ruby",
    }, // Changed from purple to red for Ruby
    {
      name: "Magento",
      color: "bg-orange-700",
      textColor: "text-white",
      icon: "Magento",
    }, // Made darker for better contrast
    {
      name: "Framer",
      color: "bg-gray-900",
      textColor: "text-white",
      icon: "Framer",
    }, // Changed from black to gray-900
  ];

  return (
    <div className="bg-white p-6 border-t border-gray-200">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark">TechStack</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">+</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">✏️</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 mb-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div
                className={`w-12 h-12 ${tech.color} rounded-lg flex items-center justify-center mb-2`}
              >
                <span className={`${tech.textColor} text-xs font-bold`}>
                  {tech.icon.slice(0, 2)}
                </span>
              </div>
              <span className="text-sm text-dark font-medium">{tech.name}</span>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
        >
          View tech stack →
        </Button>
      </div>
    </div>
  );
}
