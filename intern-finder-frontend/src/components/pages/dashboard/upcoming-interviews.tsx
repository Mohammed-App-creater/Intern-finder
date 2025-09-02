import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function UpcomingInterviews() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-dark">Upcoming Interviews</CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-light">Today, 26 November</p>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          <div className="text-sm text-light">10:00 AM</div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-blue-500 text-white">JB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-dark">Joe Bartmann</p>
              <p className="text-sm text-light">HR Manager at Divvy</p>
            </div>
          </div>
          <div className="text-sm text-light">11:00 AM</div>
        </div>
      </CardContent>
    </Card>
  )
}
