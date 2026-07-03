"use client";

import { useCallback, useRef } from "react";
import { useWebWorker, workerId } from "./use-worker";
import type {
  EconomyWorkerRequest,
  EconomyWorkerResponse,
} from "@/workers/types";
import type { EconomySnapshot } from "@/types";

/**
 * Exposes economy calculations (snapshot formatting, XP progress, batch
 * number formatting) via a background worker so they never run on the
 * main thread, even when dozens of user rows are rendered simultaneously.
 *
 * Example — format a snapshot:
 *   const { formatSnapshot } = useEconomyWorker();
 *   const formatted = await formatSnapshot(snapshot);
 *   // { xp_formatted, rep_formatted, sc_formatted, tier_color,
 *   //   xp_progress_label, xp_progress_percent }
 */
export function useEconomyWorker() {
  const factoryRef = useRef(
    () =>
      new Worker(
        new URL("../workers/economy.worker.ts", import.meta.url)
      )
  );

  const send = useWebWorker<EconomyWorkerRequest, EconomyWorkerResponse>(
    factoryRef.current
  );

  const formatSnapshot = useCallback(
    async (snapshot: EconomySnapshot) => {
      const response = await send({
        id: workerId(),
        type: "FORMAT_SNAPSHOT",
        payload: {
          total_xp: snapshot.total_xp,
          total_reputation: snapshot.total_reputation,
          skill_coin_balance: snapshot.skill_coin_balance,
          reputation_level: snapshot.reputation_level,
          xp_to_next_level: snapshot.xp_to_next_level,
        },
      });

      if (response.type === "FORMAT_SNAPSHOT_RESULT") {
        return response.payload;
      }
      return null;
    },
    [send]
  );

  const formatCompactBatch = useCallback(
    async (values: number[]): Promise<string[]> => {
      const response = await send({
        id: workerId(),
        type: "FORMAT_COMPACT_BATCH",
        payload: { values },
      });

      if (response.type === "FORMAT_COMPACT_BATCH_RESULT") {
        return response.payload.formatted;
      }
      return [];
    },
    [send]
  );

  return { formatSnapshot, formatCompactBatch };
}
