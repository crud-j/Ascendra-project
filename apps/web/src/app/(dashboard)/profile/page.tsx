"use client";

import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { useEconomySnapshot } from "@/features/economy/hooks/use-economy";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCompact, formatSkillCoins } from "@/lib/utils";
import { REPUTATION_TIERS } from "@/types";
import { Zap, Star, Coins } from "lucide-react";

export default function ProfilePage() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: economy, isLoading: economyLoading } = useEconomySnapshot(user?.id);

  if (userLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-muted-foreground">Please sign in to view your profile.</p>;
  }

  const initials = user.display_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const tierInfo = economy ? REPUTATION_TIERS[economy.reputation_level] : null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

      <div className="flex items-center gap-4 rounded-lg border p-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar_url ?? undefined} alt={user.display_name} />
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{user.display_name}</h2>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          {tierInfo && (
            <Badge variant="secondary" className="mt-1">
              {tierInfo.title}
            </Badge>
          )}
        </div>
      </div>

      {economyLoading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      ) : economy ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-blue-500" />
              Total XP
            </div>
            <p className="text-2xl font-bold">{formatCompact(economy.total_xp)}</p>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-purple-500" />
              Reputation
            </div>
            <p className="text-2xl font-bold">{formatCompact(economy.total_reputation)}</p>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Coins className="h-4 w-4 text-amber-500" />
              Skill Coins
            </div>
            <p className="text-2xl font-bold">
              {formatSkillCoins(economy.skill_coin_balance)}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
