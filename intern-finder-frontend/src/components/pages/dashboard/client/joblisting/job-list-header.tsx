import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JobListHeader() {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      <h2 className="text-lg font-medium text-dark">Job List</h2>
      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
        <Filter className="w-4 h-4" />
        Filters
      </Button>
    </div>
  )
}