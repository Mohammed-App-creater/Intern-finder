import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export function CompanyProfile() {
  return (
    <div className="p-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-dark">Company Profile</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Edit className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>
        <p className="text-light leading-relaxed">
          Nomad is a software platform for starting and running internet
          businesses. Millions of businesses rely on Stripe&apos;s software
          tools to accept payments, expand globally, and manage their businesses
          online. Stripe has been at the forefront of expanding internet
          commerce, powering new business models, and supporting the latest
          platforms, from marketplaces to mobile commerce sites. We believe that
          growing the GDP of the internet is a problem rooted in code and
          design, not finance. Stripe is built for developers, makers, and
          creators. We work on solving the hard technical problems necessary to
          build global economic infrastructure—from designing highly reliable
          systems to developing advanced machine learning algorithms to prevent
          fraud.
        </p>
      </div>
    </div>
  );
}
