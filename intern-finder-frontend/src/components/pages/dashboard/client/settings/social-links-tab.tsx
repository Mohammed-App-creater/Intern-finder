"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SocialLinksTab() {
  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-medium text-dark mb-2">
          Basic Information
        </h2>
        <p className="text-light text-sm mb-6">
          Add elsewhere links to your company profile. You can add only username
          without full https links.
        </p>
      </div>

      {/* Social Links Form */}
      <div className="space-y-6 max-w-md">
        <div>
          <Label htmlFor="instagram" className="text-dark text-sm font-medium">
            Instagram
          </Label>
          <Input
            id="instagram"
            defaultValue="https://www.instagram.com/nomad/"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="twitter" className="text-dark text-sm font-medium">
            Twitter
          </Label>
          <Input
            id="twitter"
            defaultValue="https://twitter.com/nomad/"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="facebook" className="text-dark text-sm font-medium">
            Facebook
          </Label>
          <Input
            id="facebook"
            defaultValue="https://web.facebook.com/nomad/"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="linkedin" className="text-dark text-sm font-medium">
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            placeholder="Enter your LinkedIn address"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="youtube" className="text-dark text-sm font-medium">
            Youtube
          </Label>
          <Input
            id="youtube"
            placeholder="Enter your youtube address"
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-white hover:bg-primary/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
}