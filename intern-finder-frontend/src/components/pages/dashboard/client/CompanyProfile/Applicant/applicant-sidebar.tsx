import { Star, Mail, Phone, Instagram, Twitter, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ApplicantSidebar() {
  return (
    <div className="w-80 p-6 space-y-6">
      {/* Profile Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/professional-headshot.png" alt="Jerome Bell" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-dark">Jerome Bell</h2>
              <p className="text-light">Product Designer</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-dark">4.0</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-b py-3">
            <div className="bg-secondary p-2">
              <div className="flex justify-between border-b p-1">
                <p className="text-sm font-medium text-dark">Applied Jobs</p>
                <p className="text-xs text-light">2 days ago</p>
              </div>

              <div className="px-1 py-2">
                <p className="font-medium text-dark">Product Development</p>
                <p className="text-sm text-light">Marketing • Full-Time</p>
              </div>
            </div>

            <div className="bg-secondary p-2 mt-5">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-dark mb-2">Stage</p>
                <span className="text-xs text-light">Interview</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"></div>
                <div className="w-full h-2">
                  <div
                    className="bg-primary h-2 w-[75%]" 
                  ></div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary text-white hover:bg-primary/90">
              Schedule Interview
            </Button>
          </div>

          <h3 className="font-semibold text-dark mb-4 pt-5">Contact</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Mail className="h-4 w-4 text-light" />
              <div>
                <p className="text-sm text-light">Email</p>
                <p className="text-sm text-dark">jeromeBell45@email.com</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="h-4 w-4 text-light" />
              <div>
                <p className="text-sm text-light">Phone</p>
                <p className="text-sm text-dark">+44 1245 572 135</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Instagram className="h-4 w-4 text-light" />
              <div>
                <p className="text-sm text-light">Instagram</p>
                <p className="text-sm text-primary">instagram.com/jeromebell</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Twitter className="h-4 w-4 text-light" />
              <div>
                <p className="text-sm text-light">Twitter</p>
                <p className="text-sm text-primary">twitter.com/jeromebell</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Globe className="h-4 w-4 text-light" />
              <div>
                <p className="text-sm text-light">Website</p>
                <p className="text-sm text-primary">www.jeromebell.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
