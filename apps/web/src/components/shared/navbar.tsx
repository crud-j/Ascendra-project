"use client";

import Link from "next/link";
import { Bell, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EconomyBar } from "./economy-bar";
import { useCurrentUser, useLogout } from "@/features/auth/hooks/use-auth";

export function Navbar() {
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  const initials = user?.display_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "?";

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-3 border-b bg-background px-4 shadow-sm">
      {/* Logo */}
      <Link href="/" className="mr-4 text-lg font-bold tracking-tight">
        Ascendra
      </Link>

      {/* Economy bar — only shown when logged in */}
      {user && (
        <div className="hidden md:flex">
          <EconomyBar userId={user.id} />
        </div>
      )}

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        {user ? (
          <>
            {/* Notification bell */}
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className="relative flex h-9 w-9 items-center justify-center rounded-full p-0 hover:bg-accent"
                aria-label="User menu"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.avatar_url ?? undefined}
                    alt={user.display_name}
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center gap-2 w-full">
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => logout.mutate()}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link
            href="/login"
            className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
