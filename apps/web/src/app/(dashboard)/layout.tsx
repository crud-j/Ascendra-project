import { Navbar } from "@/components/shared/navbar";
import { FloatingNav } from "@/components/shared/floating-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[calc(100vh-3.5rem)] p-6">
        {children}
      </main>
      <FloatingNav />
    </div>
  );
}
