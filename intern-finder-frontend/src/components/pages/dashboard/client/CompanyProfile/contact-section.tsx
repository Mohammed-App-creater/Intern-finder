import { Twitter, Facebook, Linkedin, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <div className="bg-white p-6 border-t border-gray-200">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark">Contact</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">+</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">✏️</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <Twitter className="w-5 h-5 text-blue-400" />
            <span className="text-dark">twitter.com/Nomad</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <Facebook className="w-5 h-5 text-blue-600" />
            <span className="text-dark">facebook.com/NomadHQ</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <Linkedin className="w-5 h-5 text-blue-700" />
            <span className="text-dark">linkedin.com/company/nomad</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <Mail className="w-5 h-5 text-gray-600" />
            <span className="text-dark">nomad@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
