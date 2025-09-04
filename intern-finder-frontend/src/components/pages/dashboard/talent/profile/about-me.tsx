import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export function AboutMe() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-dark">
          About Me
        </CardTitle>
        <Button variant="ghost" size="icon" className="border h-8 w-8">
          <Edit className="h-4 w-4 text-primary" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-light leading-relaxed">
          <p>
            I&apos;m a product designer + filmmaker currently working remotely
            at Twitter from beautiful Manchester, United Kingdom. I love
            designing digital products that have a positive impact on the world.
          </p>
          <p>
            For 10 years, I&apos;ve specialised in interface, experience &
            interaction design as well as working in user research and product
            strategy for product agencies, big tech companies & start-ups.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
