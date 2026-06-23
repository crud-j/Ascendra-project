import { useQuery } from "@tanstack/react-query";
import { economyApi } from "../api";

export function useEconomySnapshot(userId: string | undefined) {
  return useQuery({
    queryKey: ["economy", "snapshot", userId],
    queryFn: () => economyApi.getSnapshot(userId!),
    enabled: !!userId,
    staleTime: 30 * 1000, // 30 seconds — balances update frequently
  });
}
