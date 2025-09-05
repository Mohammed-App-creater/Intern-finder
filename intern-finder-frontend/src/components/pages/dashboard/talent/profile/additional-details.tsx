import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone, Languages } from "lucide-react";

export function AdditionalDetails() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-dark">
          Additional Details
        </CardTitle>
        <Button variant="ghost" size="icon" className="border h-8 w-8">
          <Edit className="h-4 w-4 text-primary" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Mail className="h-4 w-4 text-light" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light">Email</span>
            <span className="text-sm text-dark">jakegyll@email.com</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Phone className="h-4 w-4 text-light" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light">Phone</span>
            <span className="text-sm text-dark">+17 48 29 6728</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Languages className="h-4 w-4 text-light" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light">Language</span>
            <span className="text-sm text-dark">English, Manderin</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
