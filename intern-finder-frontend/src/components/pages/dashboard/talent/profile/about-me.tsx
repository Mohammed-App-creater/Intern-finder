"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export function AboutMe() {
  const user = useAuthStore().user;
  const { bio } = user?.role == "TALENT" ? user : {};

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-dark">
          About Me
        </CardTitle>
        <Button variant="ghost" size="icon" className="border h-8 w-8">
          <Edit className="h-4 w-4 text-primary" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-light leading-relaxed">
          <p>
            {bio}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
