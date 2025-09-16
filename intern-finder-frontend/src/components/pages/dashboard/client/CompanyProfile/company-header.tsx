import { Button } from "@/components/ui/button";
import {
  Globe,
  Settings,
  Calendar,
  Users,
  MapPin,
  Building,
} from "lucide-react";

export function CompanyHeader() {
  return (
    <div className="flex gap-3 border-b p-6">
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
          <div className="w-6 h-6 bg-primary rounded-sm"></div>
        </div>
      </div>
      <div>
        {/* Header with logo and buttons */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-dark">Slack</h1>
              <p className="text-light text-sm">https://nomad.com</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
            >
              <Globe className="w-4 h-4 mr-2" />
              Public View
            </Button>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
            >
              <Settings className="w-4 h-4 mr-2" />
              Profile Settings
            </Button>
          </div>
        </div>

        {/* Company stats */}
        <div className="grid grid-cols-4 gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-light" />
            </div>
            <div>
              <p className="text-light text-sm">Founded</p>
              <p className="text-dark font-medium">July 31, 2011</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-light" />
            </div>
            <div>
              <p className="text-light text-sm">Employees</p>
              <p className="text-dark font-medium">4000+</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-light" />
            </div>
            <div>
              <p className="text-light text-sm">Location</p>
              <p className="text-dark font-medium">20 countries</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-light" />
            </div>
            <div>
              <p className="text-light text-sm">Industry</p>
              <p className="text-dark font-medium">Social & Non-Profit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
