import { Card, CardContent } from "@/components/ui/card";
import {
  FaCode,
  FaRobot,
  FaShieldAlt,
  FaHeartbeat,
  FaBullhorn,
  FaGraduationCap,
  FaVideo,
  FaTasks,
} from "react-icons/fa";

const categories = [
  {
    icon: FaCode,
    title: "Web Development",
    jobCount: "2,847 jobs",
  },
  {
    icon: FaRobot,
    title: "AI & Machine Learning",
    jobCount: "987 jobs",
  },
  {
    icon: FaShieldAlt,
    title: "Cybersecurity",
    jobCount: "1,156 jobs",
  },
  {
    icon: FaHeartbeat,
    title: "Digital Healthcare",
    jobCount: "1,634 jobs",
  },
  {
    icon: FaBullhorn,
    title: "Digital Marketing",
    jobCount: "2,298 jobs",
  },
  {
    icon: FaGraduationCap,
    title: "Online Education",
    jobCount: "1,445 jobs",
  },
  {
    icon: FaVideo,
    title: "Content Creation",
    jobCount: "1,823 jobs",
  },
  {
    icon: FaTasks,
    title: "Project Management",
    jobCount: "1,567 jobs",
  },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-secondary py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-dark mb-3 sm:mb-4">
            Browse by Category
          </h1>
          <p className="text-text-dark font-light text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover exciting opportunities in today&apos;s most in-demand tech
            fields. Find your perfect role in the digital economy.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={index}
                className="bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer border-0 shadow-sm"
              >
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mx-auto" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text-dark mb-2 sm:mb-3">
                    {category.title}
                  </h3>
                  <p className="text-primary font-light bg-secondary p-1 sm:p-2 rounded-[10px] w-fit h-fit mx-auto text-sm sm:text-base">
                    {category.jobCount}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
