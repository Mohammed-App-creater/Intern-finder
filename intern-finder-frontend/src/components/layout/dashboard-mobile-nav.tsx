"use client";

import { Sidebar } from "@/components/common/Sidebar";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function DashboardMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when path changes (navigation)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger: Visible on mobile only */}
      <div className="lg:hidden p-4 pb-0">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="w-5 h-5 text-dark" />
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer */}
          <div 
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
             <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-lg font-bold text-dark">Menu</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5 text-dark" />
                </Button>
             </div>
             {/* Render Sidebar inside with overrides */}
             <div className="h-full">
                <Sidebar className="w-full h-auto m-0 border-none shadow-none rounded-none bg-transparent my-0 ml-0" />
             </div>
          </div>
        </div>
      )}
    </>
  );
}
