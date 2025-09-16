import { Button } from "@/components/ui/button";

export function OfficeLocations() {
  const locations = [
    { country: "United States", flag: "🇺🇸", note: "Head Quarters" },
    { country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { country: "Japan", flag: "🇯🇵" },
    { country: "Australia", flag: "🇦🇺" },
    { country: "China", flag: "🇨🇳" },
  ];

  return (
    <div className="bg-white p-6 border-t border-gray-200">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark">Office Locations</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">+</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">✏️</span>
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
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

        <Button
          variant="outline"
          className="text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
        >
          View countries →
        </Button>
      </div>
    </div>
  );
}
