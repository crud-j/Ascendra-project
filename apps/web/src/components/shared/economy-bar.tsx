"use client";

/**
 * EconomyBar — shows XP, Reputation, and Skill Coins in the top navigation.
 *
 * Displays all three currencies simultaneously so users always know their
 * standing. The three are visually distinct so learners understand they are
 * different systems with different purposes.
 *
 * XP      = how far along am I?          (always grows, never shrinks)
 * Rep     = how much should others trust? (grows via contribution, shrinks on misconduct)
 * SC      = what value have I created?   (transferable, withdrawable)
 */

import { Zap, Star, Coins } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn, formatCompact, formatSkillCoins } from "@/lib/utils";
import { useEconomySnapshot } from "@/features/economy/hooks/use-economy";
import { REPUTATION_TIERS } from "@/types";

interface EconomyBarProps {
  userId: string | undefined;
  className?: string;
}

export function EconomyBar({ userId, className }: EconomyBarProps) {
  const { data: snapshot, isLoading } = useEconomySnapshot(userId);

  if (isLoading || !snapshot) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-20" />
      </div>
    );
  }

  const tierColor =
    REPUTATION_TIERS[snapshot.reputation_level]?.color ?? "text-slate-500";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* XP */}
      <div className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 dark:bg-blue-950">
        <Zap className="h-3.5 w-3.5 text-blue-500" />
        <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
          {formatCompact(snapshot.total_xp)} XP
        </span>
      </div>

      {/* Reputation */}
      <div className="flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 dark:bg-purple-950">
        <Star className="h-3.5 w-3.5 text-purple-500" />
        <span className={cn("text-xs font-semibold", tierColor)}>
          {formatCompact(snapshot.total_reputation)}
        </span>
        <Badge
          variant="secondary"
          className="hidden h-4 px-1 text-[10px] sm:flex"
        >
          {snapshot.reputation_title}
        </Badge>
      </div>

      {/* Skill Coins */}
      <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 dark:bg-amber-950">
        <Coins className="h-3.5 w-3.5 text-amber-500" />
        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
          {formatSkillCoins(snapshot.skill_coin_balance)}
        </span>
      </div>
    </div>
  );
}
