import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Instagram, Globe, Linkedin } from "lucide-react";
import Link from "next/link";

export function SocialLinks() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-dark">
          Social Links
        </CardTitle>
        <Button variant="ghost" size="icon" className="border h-8 w-8">
          <Edit className="h-4 w-4 text-primary" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Instagram className="h-4 w-4 text-light" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light">Instagram</span>
            <Link href="#" className="text-sm text-primary">
              instagram.com/jakegyll
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          <Linkedin className="h-4 w-4 text-light" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light">LinkedIn</span>
            <Link href="#" className="text-sm text-primary">
              linkedin.com/in/jakegyll
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          <Globe className="h-4 w-4 text-light" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light">Website</span>
            <Link href="#" className="text-sm text-primary">
              www.jakegyll.com
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
