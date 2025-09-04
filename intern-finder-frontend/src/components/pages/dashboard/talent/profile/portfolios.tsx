import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

const portfolios = [
  {
    title: "Clinically - clinic & health care website",
    image: "/medical-clinic-website-design-blue-theme.jpg",
  },
  {
    title: "Growthly - SaaS Analytics & Sales Website",
    image: "/saas-analytics-dashboard-purple-theme.jpg",
  },
  {
    title: "Planna - Project Management App",
    image: "/project-management-app-interface-blue-theme.jpg",
  },
  {
    title: "Funiro - furniture",
    image: "/furniture-ecommerce-website-design.jpg",
  },
];

export default function PortfoliosSection() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-xl font-semibold text-dark">Portfolios</h2>
        <Button variant="ghost" size="sm" className="border w-8 h-8">
          <Plus className="h-4 w-4 text-primary" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {portfolios.map((portfolio, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <Image
                    src={portfolio.image || "/placeholder.svg"}
                    alt={portfolio.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-dark text-sm leading-tight mb-1">
                    {portfolio.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
