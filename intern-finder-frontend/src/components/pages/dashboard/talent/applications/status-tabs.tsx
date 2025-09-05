import { Button } from "@/components/ui/button";

const statusData = [
  { label: "All", count: 45, active: true },
  { label: "In Review", count: 34, active: false },
  { label: "Interviewing", count: 18, active: false },
  { label: "Assessment", count: 5, active: false },
  { label: "Offered", count: 2, active: false },
  { label: "Hired", count: 1, active: false },
];

export function StatusTabs() {
  return (
    <div className="mb-6">
      <div className="flex gap-1 border-b border-gray-200">
        {statusData.map((status) => (
          <Button
            key={status.label}
            variant={status.active ? "default" : "ghost"}
            className={`rounded-none border-b-2 px-4 py-2 ${
              status.active
                ? "border-primary text-primary bg-transparent hover:bg-transparent"
                : "border-transparent text-light hover:text-dark"
            }`}
          >
            {status.label} ({status.count})
          </Button>
        ))}
      </div>
    </div>
  );
}
