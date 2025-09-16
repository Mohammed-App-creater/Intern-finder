import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

export function TeamMemberCard({ name, role, image }: TeamMemberProps) {
  return (
    <div className="bg-white border rounded-lg p-6 text-center">
      <div className="mb-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full mx-auto object-cover"
        />
      </div>
      <h3 className="text-dark font-semibold text-lg mb-1">{name}</h3>
      <p className="text-light text-sm mb-4">{role}</p>
      <div className="flex justify-center gap-3">
        <Instagram className="w-5 h-5 text-light hover:text-primary cursor-pointer" />
        <Linkedin className="w-5 h-5 text-light hover:text-primary cursor-pointer" />
      </div>
    </div>
  );
}
