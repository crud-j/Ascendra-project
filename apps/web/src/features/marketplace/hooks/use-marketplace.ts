import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { marketplaceApi } from "../api";

export function useBounties(params?: {
  page?: number;
  status?: string;
  tag?: string;
}) {
  return useQuery({
    queryKey: ["bounties", params],
    queryFn: () => marketplaceApi.getBounties(params),
  });
}

export function useBounty(bountyId: string) {
  return useQuery({
    queryKey: ["bounty", bountyId],
    queryFn: () => marketplaceApi.getBounty(bountyId),
    enabled: !!bountyId,
  });
}

export function useCompleteBounty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bountyId: string) => marketplaceApi.completeBounty(bountyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bounties"] });
      queryClient.invalidateQueries({ queryKey: ["economy"] });
    },
  });
}
