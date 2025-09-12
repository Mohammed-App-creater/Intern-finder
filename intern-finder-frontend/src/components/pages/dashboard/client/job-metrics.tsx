import { Card } from "@/components/ui/card"

export function JobMetrics() {
  return (
    <div className="flex flex-col gap-6">
      {/* Job Views */}
      <Card className="bg-white p-6 rounded-none border">
        <div className="flex items-center gap-10 justify-between">
          <h4 className="text-dark font-medium text-lg">Job Views</h4>
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm font-medium">👁</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-dark">2,342</div>
        <div className="text-light text-md">
          This Week <span className="text-primary">6.4% ↗</span>
        </div>
      </Card>

      {/* Job Applied */}
      <Card className="bg-white p-6 rounded-none border">
        <div className="flex items-center  gap-10 justify-between">
          <h4 className="text-dark font-medium text-lg">Job Applied</h4>
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary text-sm font-medium">📄</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-dark">654</div>
        <div className="text-light text-md">
          This Week <span className="text-red-500">0.5% ↘</span>
        </div>
      </Card>
    </div>
  )
}