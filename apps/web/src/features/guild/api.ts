import apiClient from "@/lib/api-client";
import type { Guild, PaginatedResponse } from "@/types";

export const guildApi = {
  getGuilds: async (params?: { page?: number; search?: string }): Promise<PaginatedResponse<Guild>> => {
    const { data } = await apiClient.get("/guilds", { params });
    return data;
  },

  getGuild: async (guildId: string): Promise<Guild> => {
    const { data } = await apiClient.get(`/guilds/${guildId}`);
    return data;
  },

  joinGuild: async (guildId: string): Promise<void> => {
    await apiClient.post(`/guilds/${guildId}/join`);
  },

  leaveGuild: async (guildId: string): Promise<void> => {
    await apiClient.post(`/guilds/${guildId}/leave`);
  },
};
