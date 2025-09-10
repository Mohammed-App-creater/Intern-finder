import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Edit, Flag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileHeader() {
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
      <div className="flex items-center gap-6 p-5">
        <Avatar className="absolute top-13 left-[15%] h-35 w-35 border-5 border-white">
          <AvatarImage
            src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg"
            alt="Profile Picture"
          />
          <AvatarFallback className="text-lg font-semibold">JG</AvatarFallback>
        </Avatar>

        <div className="relative left-[35%] w-[60%]">
          <div className="flex justify-between pr-5 max-w-2xl">
            <h1 className="text-2xl font-bold text-dark mb-1">Jake Gyll</h1>
            <Button
              variant="outline"
              className="text-primary text-md font-bold"
            >
              Edit Profile
            </Button>
          </div>
          <p className="text-light mb-2">Product Designer at Pinterest</p>
          <div className="flex items-center gap-1 text-light mb-3">
            <MapPin className="h-4 w-4 text-light" />
            <span className="text-sm">Manchester, UK</span>
          </div>
          <Badge className="flex items-center gap-3 bg-secondary text-primary/80 w-fit h-10">
            <Flag className="text-primary/80 w-16 h-16" />
            <div>OPEN FOR OPPORTUNITIES</div>
          </Badge>
        </div>
      </div>
    </div>
  );
}
