import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Sidebar } from "@/components/common/Sidebar";
import { DashboardMobileNav } from "@/components/layout/dashboard-mobile-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <DashboardMobileNav />
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {/* Mobile Sidebar could be added here or handled within Navbar/Sidebar component */}
        <div className="w-full lg:w-[calc(100%-250px)] font-['Epilogue']">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
