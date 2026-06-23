import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { guildApi } from "../api";

export function useGuilds(params?: { page?: number; search?: string }) {
  return useQuery({
    queryKey: ["guilds", params],
    queryFn: () => guildApi.getGuilds(params),
  });
}

export function useGuild(guildId: string) {
  return useQuery({
    queryKey: ["guild", guildId],
    queryFn: () => guildApi.getGuild(guildId),
    enabled: !!guildId,
  });
}

export function useJoinGuild() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (guildId: string) => guildApi.joinGuild(guildId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guilds"] }),
  });
}
