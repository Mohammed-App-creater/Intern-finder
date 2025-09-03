import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/pages/dashboard/circular-progress";
import { ArrowRight } from "lucide-react";

export function JobStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dark">
          Jobs Applied Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex items-center gap-10">
          <CircularProgress percentage={60} size={150} />
          <div className="flex flex-col gap-5 p-5">
            <div className="flex items-center gap-5">
              <div className="w-5 h-5 bg-primary rounded-sm"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-dark">60%</span>
                <span className="text-xl text-light">Unsuitable</span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-dark">40%</span>
                <span className="text-xl text-light">Interviewed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-6 text-center">
          <Button variant="link" className="text-primary text-lg">
            View all Applications
          </Button>
          <ArrowRight className="text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}
