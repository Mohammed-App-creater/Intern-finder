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
    <div className="bg-secondary pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-30 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4">
            Top Company
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
            Blandit a massa elementum
          </p>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {companies.map((company, index) => (
            <Card
              key={index}
              className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow w-full h-fit"
            >
              <CardContent className="flex flex-col items-center p-4 sm:p-5 md:p-6 text-center">
                {/* Company Icon */}
                <div className="mb-3 sm:mb-4">
                  <Image
                    src={company.icon}
                    width={60}
                    height={60}
                    alt={`${company.name} Logo`}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                  />
                </div>

                {/* Company Name */}
                <h3 className="text-lg sm:text-xl font-semibold text-dark mb-2 sm:mb-3">
                  {company.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                  {company.description}
                </p>

                {/* Open Jobs */}
                <p className="text-primary font-medium bg-secondary px-3 py-1 rounded-full text-sm">
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
