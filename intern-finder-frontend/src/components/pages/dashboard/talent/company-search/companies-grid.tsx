import { CompanyCard } from "./company-card";

export function CompaniesGrid() {
  const companies = [
    {
      logo: "/images/Logo_1.png",
      name: "Stripe",
      description:
        "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools.",
      jobCount: 7,
      tags: ["Business", "Payment gateway"],
      logoColor: "bg-primary",
    },
    {
      logo: "/images/Logo_2.png",
      name: "Truebill",
      description:
        "Take control of your money. Truebill develops a mobile app that helps consumers take control of their financial.",
      jobCount: 7,
      tags: ["Business"],
      logoColor: "bg-blue-500",
    },
    {
      logo: "/images/Logo_3.png",
      name: "Square",
      description:
        "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses.",
      jobCount: 7,
      tags: ["Business", "Blockchain"],
      logoColor: "bg-gray-900",
    },
    {
      logo: "/images/Logo_4.png",
      name: "Coinbase",
      description:
        "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies.",
      jobCount: 7,
      tags: ["Business", "Blockchain"],
      logoColor: "bg-blue-600",
    },
    {
      logo: "/images/Logo_5.png",
      name: "Robinhood",
      description:
        "Robinhood is breaking barriers, removing fees, and providing greater access to financial information.",
      jobCount: 7,
      tags: ["Business"],
      logoColor: "bg-gray-800",
    },
    {
      logo: "/images/Apple_icon.png",
      name: "Apple",
      description:
        "Based in San Francisco, Apple is the world's largest global Tech exchange in dollar volume and liquidity.",
      jobCount: 7,
      tags: ["Business", "Blockchain"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.name} {...company} />
      ))}
    </div>
  );
}
