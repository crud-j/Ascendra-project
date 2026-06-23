/**
 * TanStack Query client configuration.
 *
 * Design decisions:
 * - staleTime 60s for most data — reduces unnecessary refetches on tab focus
 * - retry: 1 — don't hammer a struggling service; economy ops fail fast
 * - No global error handler here; each feature catches errors in its own hooks
 */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,       // 60 seconds
      gcTime: 5 * 60 * 1000,      // 5 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
