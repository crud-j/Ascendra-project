"use client";

import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

/**
 * Reactive main content wrapper.
 * Listens to Zustand sidebarOpen and shifts its left margin in sync
 * with the sidebar's width transition (duration-300 ease-in-out).
 */
export function MainContent({ children }: { children: React.ReactNode }) {
  const open = useUIStore((s) => s.sidebarOpen);

  return (
    <main
      className={cn(
        "flex-1 p-6 transition-[margin] duration-300 ease-in-out min-h-[calc(100vh-3.5rem)]",
        open ? "ml-56" : "ml-14"
      )}
    >
      {children}
    </main>
  );
}
