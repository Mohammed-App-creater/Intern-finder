import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import Image from "next/image";

export function Gallery() {
  return (
    <div className="p-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark">Working at Nomad</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Plus className="h-4 w-4 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Edit className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 max-h-150">
          <div className="aspect-video w-[65%]">
            <Image
              src="https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg"
              alt="Modern office workspace"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 w-[35%]">
            <div className="aspect-video overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3182835/pexels-photo-3182835.jpeg"
                alt="Team collaboration"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3184425/pexels-photo-3184425.jpeg"
                alt="Creative workspace"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/8922195/pexels-photo-8922195.jpeg"
                alt="Team meeting"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
