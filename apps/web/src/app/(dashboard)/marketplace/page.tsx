"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatSkillCoins } from "@/lib/utils";
import { useBounties } from "@/features/marketplace/hooks/use-marketplace";
import { useDataWorker } from "@/hooks/use-data-worker";
import type { Bounty } from "@/types";
import type { SortDirection } from "@/workers/types";
import { Coins, Search, ArrowUpDown, Clock } from "lucide-react";

type SortField = "skill_coin_reward" | "created_at" | "deadline";
type StatusFilter = "" | "open" | "in_progress" | "completed" | "cancelled";

const STATUS_LABELS: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  open: "bg-green-50 text-green-700 border border-green-100",
  in_progress: "bg-blue-50 text-blue-700 border border-blue-100",
  completed: "bg-slate-50 text-slate-600 border border-slate-100",
  cancelled: "bg-red-50 text-red-700 border border-red-100",
};

const marketplaceStats = [
  { display: "340+", label: "Active bounties" },
  { display: "12K SC", label: "Total rewards" },
  { display: "2.4K", label: "Contributors" },
];

export default function MarketplacePage() {
  const { data: bountyPage, isLoading } = useBounties({ page: 1 });
  const { sortAndSearch, filter } = useDataWorker();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const [processed, setProcessed] = useState<Bounty[]>([]);
  const [total, setTotal] = useState(0);
  const [processing, setProcessing] = useState(false);

  const runWorker = useCallback(
    async (items: Bounty[]) => {
      if (!items.length) {
        setProcessed([]);
        setTotal(0);
        return;
      }

      setProcessing(true);
      try {
        const filtered = statusFilter
          ? await filter(
              items as unknown as Record<string, unknown>[],
              { status: statusFilter }
            )
          : (items as unknown as Record<string, unknown>[]);

        const result = await sortAndSearch(
          filtered,
          query,
          ["title", "description", "tags", "posted_by_username"],
          sortField,
          sortDir
        );

        setProcessed(result.items as unknown as Bounty[]);
        setTotal(result.total);
      } finally {
        setProcessing(false);
      }
    },
    [filter, sortAndSearch, query, statusFilter, sortField, sortDir]
  );

  useEffect(() => {
    runWorker(bountyPage?.items ?? []);
  }, [bountyPage?.items, runWorker]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — Hero Header
      ════════════════════════════════════════════════════════════════════ */}
      <div className="pb-10 pt-2">
        {/* Gold section label */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-[#C19562]" />
          <span
            className="text-[10px] font-bold tracking-[0.24em] text-[#C19562] uppercase"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Skill Economy
          </span>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1
              className="text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-5xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Marketplace
            </h1>
            <p
              className="mt-3 max-w-md text-[15px] leading-[1.75] text-gray-500"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Browse open bounties, apply your skills, and earn Skill Coins.
              Search and sort happen instantly — powered by a background worker.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            {marketplaceStats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div className="text-center">
                  <p
                    className="text-2xl font-bold tracking-tight text-gray-900"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {stat.display}
                  </p>
                  <p
                    className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {stat.label}
                  </p>
                </div>
                {i < marketplaceStats.length - 1 && (
                  <div className="h-8 w-px bg-gray-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — Controls
          Sticky frosted-glass card with curved Gaussian blur + smooth fades
      ════════════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-20 -mx-6 px-6">
        {/* Top fade — smooths the blur entry as content scrolls underneath */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-6 h-6"
          style={{
            background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)",
          }}
        />

        {/* Frosted glass controls card */}
        <div
          className="rounded-2xl border border-gray-100/80 bg-white/80 px-5 py-4 backdrop-blur-xl transition-shadow duration-300"
          style={{
            boxShadow:
              "0 4px 24px -6px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.03)",
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-48 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                className="border-gray-200 bg-white pl-9 text-gray-900 placeholder:text-gray-400 focus-visible:border-[#C19562] focus-visible:ring-[#C19562]/20"
                placeholder="Search title, tags, or poster…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Status filter chips */}
            <div className="flex flex-wrap gap-2">
              {(
                ["", "open", "in_progress", "completed", "cancelled"] as StatusFilter[]
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-200",
                    statusFilter === s
                      ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                      : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                  )}
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {s === "" ? "All" : STATUS_LABELS[s]}
                </button>
              ))}
            </div>

            {/* Sort buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleSort("skill_coin_reward")}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[11px] font-semibold transition-all duration-200",
                  sortField === "skill_coin_reward"
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <Coins className="h-3.5 w-3.5" />
                Reward
                {sortField === "skill_coin_reward" && (
                  <ArrowUpDown className="h-3 w-3 opacity-60" />
                )}
              </button>

              <button
                onClick={() => toggleSort("created_at")}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[11px] font-semibold transition-all duration-200",
                  sortField === "created_at"
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <Clock className="h-3.5 w-3.5" />
                Newest
                {sortField === "created_at" && (
                  <ArrowUpDown className="h-3 w-3 opacity-60" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom fade — softens where blur card dissolves into the list below */}
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-6 h-6"
          style={{
            background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — Results + Bounty List
      ════════════════════════════════════════════════════════════════════ */}
      <div className="mt-10 flex flex-col gap-4">
        {!isLoading && (
          <p
            className="text-[12px] font-medium text-gray-400"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {processing
              ? "Processing…"
              : `${total} bounty${total !== 1 ? "ies" : "y"} found`}
          </p>
        )}

        {isLoading ? (
          <div className="grid gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : processed.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
              <Search className="h-6 w-6 text-gray-300" />
            </div>
            <p
              className="text-sm font-medium text-gray-500"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {query || statusFilter
                ? "No bounties match your search."
                : "No bounties yet — connect the Marketplace Service to populate this page."}
            </p>
            {(query || statusFilter) && (
              <p
                className="text-[12px] text-gray-400"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Try adjusting your filters or search term.
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {processed.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BountyCard({ bounty }: { bounty: Bounty }) {
  const deadlineDate = bounty.deadline ? new Date(bounty.deadline) : null;
  const isExpiringSoon =
    deadlineDate !== null &&
    deadlineDate.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3
            className="truncate text-[15px] font-bold leading-tight tracking-tight text-gray-900"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {bounty.title}
          </h3>
          <p
            className="mt-0.5 text-[12px] text-gray-400"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            by {bounty.posted_by_username}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1">
            <Coins className="h-3.5 w-3.5 text-amber-500" />
            <span
              className="text-[11px] font-bold text-amber-700"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {formatSkillCoins(bounty.skill_coin_reward)}
            </span>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
              STATUS_COLORS[bounty.status]
            )}
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {STATUS_LABELS[bounty.status]}
          </span>
        </div>
      </div>

      <p
        className="mt-3 line-clamp-2 text-[13px] leading-[1.65] text-gray-500"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {bounty.description}
      </p>

      {bounty.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {bounty.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium text-gray-500"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {deadlineDate && (
        <p
          className={cn(
            "mt-3 flex items-center gap-1.5 text-[11px] font-medium",
            isExpiringSoon ? "text-red-500" : "text-gray-400"
          )}
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          <Clock className="h-3 w-3" />
          Deadline: {deadlineDate.toLocaleDateString()}
          {isExpiringSoon && (
            <span className="rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-[9px] font-bold text-red-600">
              Expiring soon
            </span>
          )}
        </p>
      )}
    </div>
  );
}
