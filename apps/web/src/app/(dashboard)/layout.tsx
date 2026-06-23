import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        {/* Main content area shifts right to make room for sidebar */}
        <main className="ml-14 flex-1 p-6 transition-all duration-200 lg:ml-56">
          {children}
        </main>
      </div>
    </div>
  );
}
