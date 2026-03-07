import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Eye, Settings, Calendar, Users, MapPin, Building, Edit } from "lucide-react";

export function CompanyHeader() {
  return (
    <div className="flex flex-col md:flex-row gap-6 border-b p-4 md:p-6">
      <div className="relative flex items-center justify-center md:justify-start h-20 w-20 md:h-30 md:w-30 pt-5 mx-auto md:mx-0">
        <Image
          src={"https://cdn-icons-png.flaticon.com/128/5968/5968835.png"}
          alt="Company Logo"
          width={500}
          height={500}
          className="pl-4"
        />
        <Button variant="none" size="icon" className="absolute top-0 left-0 border h-7 w-7 p-2 bg-white">
          <Edit className="h-2 w-2 text-primary" />
        </Button>
      </div>
      <div>
        {/* Header with logo and buttons */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-dark">Nomad</h1>
              <p className="text-light text-sm">https://nomad.com</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <Button variant="none" className="text-primary border-primary">
              <Eye className="w-4 h-4 mr-1" />
              Public View
            </Button>
            <Button variant="none" className="text-primary border-primary">
              <Settings className="w-4 h-4 mr-1" />
              Profile Settings
            </Button>
          </div>
        </div>

        {/* Company stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border p-2">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-light text-sm">Founded</p>
              <p className="text-dark font-medium">July 31, 2011</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border p-2">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-light text-sm">Employees</p>
              <p className="text-dark font-medium">4000+</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border p-2">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-light text-sm">Location</p>
              <p className="text-dark font-medium">20 countries</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border p-2">
              <Building className="w-5 h-5 text-primary" />
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
