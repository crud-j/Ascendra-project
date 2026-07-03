"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  MessageSquare,
  Users,
  GraduationCap,
  ShoppingBag,
  LayoutDashboard,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/contribute", label: "Contribute", icon: MessageSquare },
  { href: "/guilds", label: "Guilds", icon: Users },
  { href: "/mentor", label: "Mentor", icon: GraduationCap },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function Sidebar() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-40 flex h-[calc(100vh-3.5rem)] flex-col border-r bg-background",
        "transition-[width] duration-300 ease-in-out overflow-hidden",
        sidebarOpen ? "w-56" : "w-14"
      )}
    >
      <nav className="flex-1 overflow-y-auto p-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                !sidebarOpen && "justify-center px-0"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className={cn(
                "whitespace-nowrap transition-[opacity,max-width] duration-300 ease-in-out overflow-hidden",
                sidebarOpen ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
