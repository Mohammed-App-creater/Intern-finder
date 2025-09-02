import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Search,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SidebarRectangle from "@/components/icons/sidebar_rectangle.png";
import UserProfile from "@/components/common/user-profile";
interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: FileText, label: "My Applications", active: false },
    { icon: Search, label: "Company", active: true },
    { icon: User, label: "My Profile", active: false },
  ];

  const settingsItems = [
    { icon: Settings, label: "Setting", active: false },
    { icon: HelpCircle, label: "Support", active: false },
  ];

  return (
    <div
      className={cn(
        "w-70 bg-secondary border-r border-border h-170 flex flex-col rounded-lg my-10 ml-10 py-2 flex-shrink-0",
        className
      )}
    >
      <nav className="flex-1">
        <ul className="space-y-1 mb-4">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <div className="flex h-full w-full">
                {/* Vertical Line */}
                <div
                  className={cn(
                    "hidden",
                    item.active
                      ? "flex items-center transition-colors bg-[#30968930]"
                      : ""
                  )}
                >
                  <Image
                    src={SidebarRectangle}
                    alt={"Sidebar Rectangle Icon"}
                  />
                </div>
                <a
                  href="#"
                  className={cn(
                    "flex items-center gap-4 px-3 py-2 text-md transition-colors w-full",
                    item.active
                      ? "bg-[#30968930] text-primary font-medium px-4"
                      : "text-dark px-4 hover:bg-secondary hover:text-dark"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 text-dark",
                      item.active ? "text-primary" : ""
                    )}
                  />
                  {item.label}
                </a>
              </div>
            </li>
          ))}
        </ul>
        {/* Horizontal Line */}
        <div className="border-1 border-text-light/20 w-full h-0.5"></div>
        {/* Setting Section */}
        <div className="mt-5">
          <h3 className="px-3 text-xs font-semibold text-dark uppercase tracking-wider mb-2">
            Settings
          </h3>
          <ul className="space-y-1">
            {settingsItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className={cn(
                    "flex items-center gap-4 px-3 py-2 text-md transition-colors w-full",
                    item.active
                      ? "bg-[#30968930] text-primary font-medium px-4"
                      : "text-dark px-4 hover:bg-secondary hover:text-dark"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 text-dark",
                      item.active ? "text-primary" : ""
                    )}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* User Profile Section */}
      <div className="flex justify-center mb-5">
        <UserProfile />
      </div>
    </div>
  );
}
