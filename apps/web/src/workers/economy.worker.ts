/**
 * Economy Web Worker — runs in a background thread so number formatting,
 * XP progress calculations, and reputation tier lookups never block the UI.
 *
 * Mirrors the REPUTATION_TIERS and XP_THRESHOLDS from the main thread
 * (no DOM access, no imports from @/ aliases — workers are standalone bundles).
 */
import type { EconomyWorkerRequest, EconomyWorkerResponse } from "./types";

const REPUTATION_TIERS: Record<
  number,
  { title: string; min_reputation: number; color: string }
> = {
  1: { title: "Learner", min_reputation: 0, color: "text-slate-500" },
  2: { title: "Contributor", min_reputation: 100, color: "text-blue-500" },
  3: {
    title: "Trusted Contributor",
    min_reputation: 500,
    color: "text-green-500",
  },
  4: { title: "Mentor", min_reputation: 1000, color: "text-purple-500" },
  5: { title: "Expert", min_reputation: 5000, color: "text-orange-500" },
  6: { title: "Master", min_reputation: 10000, color: "text-yellow-500" },
};

// Total XP required to START each level (index = level number, 0 = unused)
const XP_LEVEL_START = [0, 0, 100, 300, 700, 1500, 3500, 8000, 20000, 50000];

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function computeXpProgress(
  total_xp: number,
  xp_to_next_level: number | null
): { percent: number; label: string } {
  if (xp_to_next_level === null) {
    return { percent: 100, label: "Max Level" };
  }

  // Find the XP threshold at the start of the current level
  let levelStartXp = 0;
  for (let i = XP_LEVEL_START.length - 1; i >= 0; i--) {
    if (total_xp >= XP_LEVEL_START[i]) {
      levelStartXp = XP_LEVEL_START[i];
      break;
    }
  }

  const levelRange = total_xp + xp_to_next_level - levelStartXp;
  const earned = total_xp - levelStartXp;
  const percent =
    levelRange > 0 ? Math.round((earned / levelRange) * 100) : 0;

  return {
    percent: Math.min(100, Math.max(0, percent)),
    label: `${formatCompact(xp_to_next_level)} XP to next level`,
  };
}

self.addEventListener("message", (e: MessageEvent<EconomyWorkerRequest>) => {
  const req = e.data;

  if (req.type === "FORMAT_SNAPSHOT") {
    const {
      total_xp,
      total_reputation,
      skill_coin_balance,
      reputation_level,
      xp_to_next_level,
    } = req.payload;

    const tier = REPUTATION_TIERS[reputation_level] ?? REPUTATION_TIERS[1];
    const { percent, label } = computeXpProgress(total_xp, xp_to_next_level);

    const response: EconomyWorkerResponse = {
      id: req.id,
      type: "FORMAT_SNAPSHOT_RESULT",
      payload: {
        xp_formatted: formatCompact(total_xp),
        rep_formatted: formatCompact(total_reputation),
        sc_formatted: `${formatCompact(skill_coin_balance)} SC`,
        tier_color: tier.color,
        xp_progress_label: label,
        xp_progress_percent: percent,
      },
    };

    self.postMessage(response);
    return;
  }

  if (req.type === "FORMAT_COMPACT_BATCH") {
    const response: EconomyWorkerResponse = {
      id: req.id,
      type: "FORMAT_COMPACT_BATCH_RESULT",
      payload: { formatted: req.payload.values.map(formatCompact) },
    };
    self.postMessage(response);
  }
});
