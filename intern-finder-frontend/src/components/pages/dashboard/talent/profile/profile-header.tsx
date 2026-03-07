"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Edit, Flag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";

export function ProfileHeader() {
  const user = useAuthStore().user;
  const { fullName, profileImageUrl, locations, fieldOfStudy } = user?.role == "TALENT" ? user : {};

  return (
    <div className="relative rounded-sm border-1 bg-white">
      <Image
        src={"/images/Header_Photo.png"}
        alt={"Header Photo"}
        width={20}
        height={10}
        className="max-h-25 w-full rounded-t-sm "
      />
      <Button variant="none" size="sm" className="absolute right-[3%] top-[8%] ">
        <Edit className="h-4 w-4 text-white" />
      </Button>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-5 pt-12 md:pt-5">
        <Avatar className="relative md:absolute md:top-13 md:left-[15%] h-24 w-24 md:h-35 md:w-35 border-5 border-white -mt-16 md:mt-0">
          <AvatarImage
            src={profileImageUrl}
            alt="Profile Picture"
          />
          <AvatarFallback className="text-lg font-semibold">JG</AvatarFallback>
        </Avatar>

        <div className="md:relative md:left-[35%] w-full md:w-[60%] text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-2 md:gap-0 pr-0 md:pr-5 max-w-2xl mx-auto md:mx-0">
            <h1 className="text-xl md:text-2xl font-bold text-dark mb-1">{fullName}</h1>
            <Button
              variant="outline"
              className="text-primary text-md font-bold"
            >
              Edit Profile
            </Button>
          </div>
          <p className="text-light mb-2">{fieldOfStudy}</p>
          <div className="flex items-center justify-center md:justify-start gap-1 text-light mb-3">
            <MapPin className="h-4 w-4 text-light" />
            <span className="text-sm">{locations}</span>
          </div>
          <Badge className="flex items-center gap-3 bg-secondary text-primary/80 w-fit h-10 mx-auto md:mx-0">
            <Flag className="text-primary/80 w-16 h-16" />
            <div>OPEN FOR OPPORTUNITIES</div>
          </Badge>
        </div>
      </div>
    </div>
  );
}
