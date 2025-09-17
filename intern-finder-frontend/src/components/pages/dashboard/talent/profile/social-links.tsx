"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Instagram, Globe, Linkedin } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth"

export function SocialLinks() {
  const user = useAuthStore().user;
  const { instagramUrl, linkedinUrl, personalWebsite, fullName } = user?.role == "TALENT" ? user : {};

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
            <Link href={instagramUrl ?? ""} className="text-sm text-primary">
              instagram.com/{fullName?.toLowerCase().replace(" ", "")}
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          <Linkedin className="h-4 w-4 text-light" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light">LinkedIn</span>
            <Link href={linkedinUrl ?? ""} className="text-sm text-primary">
              linkedin.com/in/{fullName?.toLowerCase().replace(" ", "")}
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          <Globe className="h-4 w-4 text-light" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light">Website</span>
            <Link href={personalWebsite ?? ""} className="text-sm text-primary">
              {personalWebsite ?? ""}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
