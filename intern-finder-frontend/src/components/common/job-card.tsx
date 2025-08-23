import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image"
import Logo from "../../../public/images/Logo_1.png"


export default function JobCard() {
  return (
    <div className="flex flex-col rounded-lg p-6 shadow-md">
      <div className="flex justify-between pb-2">
        <span className="text-sm text-[var(--primary)] font-medium bg-[var(--secondary)] p-1 rounded-[4px] w-fit h-fit">
          10 min ago
        </span>
        <button className="cursor-pointer">
          <Bookmark className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-start gap-4 flex-1">
        <Image
        src={Logo}
        alt=""
        width={40}
        height={40}
         />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-1">
            Forward Security Director
          </h3>
          <p className="text-[var(--text-dark)] font-light mb-4">Reach, Schrage and Schmitt Co</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-light)]">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4 text-[var(--primary)]" />
            <span>Hotels & Tourism</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[var(--primary)]" />
            <span>Full time</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-[var(--primary)]" />
            <span>$40000-$45000</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[var(--primary)]" />
            <span>New York, USA</span>
          </div>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-teal-600  text-[var(--text-white)]">
          Job Details
        </Button>
      </div>
    </div>
  );
}
