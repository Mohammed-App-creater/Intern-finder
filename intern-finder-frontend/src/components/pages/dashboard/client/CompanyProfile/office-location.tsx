import { Button } from "@/components/ui/button";
import { ArrowRight, Edit, Plus } from "lucide-react";

export function OfficeLocations() {
  const locations = [
    { country: "United States", flag: "🇺🇸", note: "Head Quarters" },
    { country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { country: "Japan", flag: "🇯🇵" },
    { country: "Australia", flag: "🇦🇺" },
    { country: "China", flag: "🇨🇳" },
  ];

  return (
    <div className="p-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark">Office Locations</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Plus className="h-4 w-4 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Edit className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg transition-colors"
            >
              <span className="text-2xl">{location.flag}</span>
              <span className="text-dark font-medium">{location.country}</span>
              {location.note && (
                <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">
                  {location.note}
                </span>
              )}
            </div>
          ))}
        </div>

        <Button variant="none" className="flex gap-2 text-primary font-bold">
          View countries
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
