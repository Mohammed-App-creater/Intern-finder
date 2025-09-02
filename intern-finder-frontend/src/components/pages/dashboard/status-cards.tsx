import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users } from "lucide-react"

export function StatusCards() {
  return (
    <div className="space-y-6">
      {/* Total Jobs Applied */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-light mb-1">Total Jobs Applied</p>
              <p className="text-3xl font-bold text-dark">45</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interviewed */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-light mb-1">Interviewed</p>
              <p className="text-3xl font-bold text-dark">18</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
