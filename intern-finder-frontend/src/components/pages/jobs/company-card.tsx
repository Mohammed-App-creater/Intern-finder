import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const companies = [
  {
    name: "Instagram",
    icon: "/images/Instagram_icon.png",
    description:
      "Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat",
    openJobs: 8,
  },
  {
    name: "Tesla",
    icon: "/images/Tesla_icon.png",
    description:
      "At pellentesque amet odio cras imperdiet nisl. Ac magna aliquet massa leo",
    openJobs: 18,
  },
  {
    name: "McDonald's",
    icon: "/images/MCdonald_icon.png",
    description:
      "Odio aliquet tellus tellus maecenas. Faucibus in viverra venenatis phasellus",
    openJobs: 12,
  },
  {
    name: "Apple",
    icon: "/images/Apple_icon.png",
    description:
      "Et odio sem tellus ultrices posuere consequat. Tristique nascetur sapien",
    openJobs: 9,
  },
];

export default function CompanyCard() {
  return (
    <div className="bg-secondary pt-20 pb-30">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">Top Company</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
            Blandit a massa elementum
          </p>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow w-fit h-fit"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                {/* Company Icon */}
                <Image
                  src={company.icon}
                  width={10}
                  height={10}
                  alt="Company Logo"
                  className="flex justify-center w-fit p-4"
                />

                {/* Company Name */}
                <h3 className="text-xl font-semibold text-dark mb-3">
                  {company.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {company.description}
                </p>

                {/* Open Jobs */}
                <p className="text-primary font-medium bg-secondary px-3 py-1 rounded-full">
                  {company.openJobs} open jobs
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
