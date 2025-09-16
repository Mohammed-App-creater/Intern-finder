import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Linkedin, Mail, Plus, Edit } from "lucide-react";

export function ContactSection() {
  return (
    <div className="p-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark">Contact</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Plus className="h-4 w-4 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="border h-8 w-8">
              <Edit className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 p-3 border border-primary rounded-lg hover:shadow-sm transition-shadow">
            <Twitter className="w-5 h-5 text-primary" />
            <span className="text-primary">twitter.com/Nomad</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-primary rounded-lg hover:shadow-sm transition-shadow">
            <Facebook className="w-5 h-5 text-primary" />
            <span className="text-primary">facebook.com/NomadHQ</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-primary rounded-lg hover:shadow-sm transition-shadow">
            <Linkedin className="w-5 h-5 text-primary" />
            <span className="text-primary">linkedin.com/company/nomad</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-primary rounded-lg hover:shadow-sm transition-shadow">
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-primary">nomad@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
