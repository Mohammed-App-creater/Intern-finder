import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Sidebar } from "@/components/common/Sidebar";

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
      <div className="flex">
        <Sidebar />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
