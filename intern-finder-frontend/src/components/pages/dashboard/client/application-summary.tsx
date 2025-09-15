import { Card } from "@/components/ui/card";

const applicantData = [
  { type: "Full Time", count: 45, color: "bg-blue-500" },
  { type: "Weekend", count: 32, color: "bg-orange-400" },
  { type: "Part Time", count: 24, color: "bg-primary" },
  { type: "Contract", count: 30, color: "bg-red-400" },
  { type: "Remote", count: 22, color: "bg-blue-400" },
];

export function ApplicantsSummary() {
  return (
    <Card className="bg-white p-6 border rounded-none">
      <h4 className="text-xl text-dark font-bold">Applicants Summary</h4>
      <div className="flex items-end gap-2">
        <div className="text-5xl font-bold text-dark">67</div>
        <div className="text-light">Applicants</div>
      </div>
      <div className="space-y-3">
        {applicantData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 ${item.color}`}></div>
              <span className="text-light text-sm">{item.type}</span>
            </div>
            <span className="text-dark font-medium text-sm">{item.count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
