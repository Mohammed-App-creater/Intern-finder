import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import JobIcon from "@/components/icons/doc_icon.png";
import InterviewIcon from "@/components/icons/interview_icon.png";

export function StatusCards() {
  return (
    <div className="space-y-6">
      {/* Total Jobs Applied */}
      <Card>
        <CardContent className="relative py-3 px-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-dark mb-1">
                Total Jobs Applied
              </p>
              <p className="text-5xl font-bold text-dark">45</p>
            </div>
            <Image
              src={JobIcon}
              alt={"Document Icon"}
              width={100}
              height={100}
              className="absolute top-16 right-15 w-40 h-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Interviewed */}
      <Card>
        <CardContent className="relative py-3 px-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-dark mb-1">Interviewed</p>
              <p className="text-5xl font-bold text-dark">18</p>
            </div>
            <Image
              src={InterviewIcon}
              alt={"Document Icon"}
              width={100}
              height={100}
              className="absolute top-16 right-15 w-40 h-20"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
