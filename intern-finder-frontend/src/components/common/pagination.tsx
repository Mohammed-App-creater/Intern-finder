import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button variant="ghost" size="sm" className="text-light">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button variant="default" size="sm" className="bg-primary text-white">
        1
      </Button>

      {[2, 3, 4, 5].map((page) => (
        <Button key={page} variant="ghost" size="sm" className="text-light">
          {page}
        </Button>
      ))}

      <span className="text-light px-2">...</span>

      <Button variant="ghost" size="sm" className="text-light">
        33
      </Button>

      <Button variant="ghost" size="sm" className="text-light">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
