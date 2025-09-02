import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/pages/dashboard/status-badge"
import { MoreHorizontal } from "lucide-react"

const applications = [
  {
    id: 1,
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    position: "Social Media Assistant",
    dateApplied: "24 July 2021",
    status: "In Review" as const,
    logo: "N",
    logoColor: "bg-green-500",
  },
  {
    id: 2,
    company: "Udacity",
    location: "New York, USA",
    type: "Full-Time",
    position: "Social Media Assistant",
    dateApplied: "23 July 2021",
    status: "Interviewed" as const,
    logo: "U",
    logoColor: "bg-blue-500",
  },
  {
    id: 3,
    company: "Packer",
    location: "Madrid, Spain",
    type: "Full-Time",
    position: "Social Media Assistant",
    dateApplied: "22 July 2021",
    status: "Declined" as const,
    logo: "P",
    logoColor: "bg-red-500",
  },
]

export function RecentApplications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dark">Recent Applications History</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className={`${app.logoColor} text-white font-semibold`}>{app.logo}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-dark">{app.position}</h3>
                  <p className="text-sm text-light">
                    {app.company} • {app.location} • {app.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-light">Date Applied</p>
                  <p className="text-sm font-medium text-dark">{app.dateApplied}</p>
                </div>
                <StatusBadge status={app.status} />
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="link" className="text-primary">
            View all applications history →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
