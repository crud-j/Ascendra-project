"use client";

import { useCallback, useRef } from "react";
import { useWebWorker, workerId } from "./use-worker";
import type {
  DataWorkerRequest,
  DataWorkerResponse,
  SortDirection,
} from "@/workers/types";

/**
 * Exposes sort, filter, and search over arbitrary item arrays via a background
 * worker. Drop this into any page that receives a large list from React Query
 * and needs client-side processing without freezing scroll or input.
 *
 * Example — search courses after they load:
 *   const { search } = useDataWorker();
 *   const { items, total } = await search(courses, query, ['title', 'description', 'tags']);
 *
 * Example — sort bounties by reward descending:
 *   const { sort } = useDataWorker();
 *   const sorted = await sort(bounties, 'skill_coin_reward', 'desc');
 *
 * Example — combined sort + search in one pass (more efficient than chaining):
 *   const { sortAndSearch } = useDataWorker();
 *   const { items } = await sortAndSearch(mentors, query, ['display_name', 'specializations'],
 *                                         'rating', 'desc');
 */
export function useDataWorker() {
  const factoryRef = useRef(
    () =>
      new Worker(new URL("../workers/data.worker.ts", import.meta.url))
  );

  const send = useWebWorker<DataWorkerRequest, DataWorkerResponse>(
    factoryRef.current
  );

  const sort = useCallback(
    async <T extends Record<string, unknown>>(
      items: T[],
      field: string,
      direction: SortDirection = "asc"
    ): Promise<T[]> => {
      const response = await send({
        id: workerId(),
        type: "SORT",
        payload: { items: items as Record<string, unknown>[], field, direction },
      });
      if (response.type === "SORT_RESULT") {
        return response.payload.items as T[];
      }
      return items;
    },
    [send]
  );

  const search = useCallback(
    async <T extends Record<string, unknown>>(
      items: T[],
      query: string,
      fields: string[]
    ): Promise<{ items: T[]; total: number }> => {
      const response = await send({
        id: workerId(),
        type: "SEARCH",
        payload: { items: items as Record<string, unknown>[], query, fields },
      });
      if (response.type === "SEARCH_RESULT") {
        return {
          items: response.payload.items as T[],
          total: response.payload.total,
        };
      }
      return { items, total: items.length };
    },
    [send]
  );

  const filter = useCallback(
    async <T extends Record<string, unknown>>(
      items: T[],
      filters: Record<string, unknown>
    ): Promise<T[]> => {
      const response = await send({
        id: workerId(),
        type: "FILTER",
        payload: { items: items as Record<string, unknown>[], filters },
      });
      if (response.type === "FILTER_RESULT") {
        return response.payload.items as T[];
      }
      return items;
    },
    [send]
  );

  const sortAndSearch = useCallback(
    async <T extends Record<string, unknown>>(
      items: T[],
      query: string,
      searchFields: string[],
      sortField: string,
      sortDirection: SortDirection = "asc"
    ): Promise<{ items: T[]; total: number }> => {
      const response = await send({
        id: workerId(),
        type: "SORT_AND_SEARCH",
        payload: {
          items: items as Record<string, unknown>[],
          query,
          searchFields,
          sortField,
          sortDirection,
        },
      });
      if (response.type === "SORT_AND_SEARCH_RESULT") {
        return {
          items: response.payload.items as T[],
          total: response.payload.total,
        };
      }
      return { items, total: items.length };
    },
    [send]
  );

  return { sort, search, filter, sortAndSearch };
}
